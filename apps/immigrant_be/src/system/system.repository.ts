import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { Prisma, Suggestions } from 'generated/prisma';
import { SuggestionItem, SuggestionsResponseDto } from './dto/suggestions.dto';

@Injectable()
export class SystemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSuggestions(
    suggestions: Prisma.InputJsonValue,
    embeddings: number[] | null,
    language: string,
  ): Promise<{ suggestion_id: string }> {
    try {
      if (embeddings && embeddings.length > 0) {
        const embeddingsString = `[${embeddings.join(',')}]`;

        const result = await this.prisma.$queryRawUnsafe<
          Array<{
            id: string;
            embeddings: string;
            created_at: Date;
            updated_at: Date;
          }>
        >(
          `INSERT INTO suggestions (id, embeddings, created_at, updated_at)
           VALUES (
             gen_random_uuid(),
             $1::vector,
             NOW(),
             NOW()
           )
           RETURNING 
             id,
             embeddings::text as embeddings,
             created_at,
             updated_at`,
          embeddingsString,
        );

        const suggestionsForLanguage = await this.createSuggestionLanguages(
          result[0].id,
          language,
          JSON.stringify(suggestions),
        );

        return {
          suggestion_id: suggestionsForLanguage?.suggestion_id || '',
        };
      }

      throw new Error('No embeddings provided');
    } catch {
      throw new Error('Error creating suggestions');
    }
  }

  async getRawSuggestionsWithEmbeddings(
    embeddings: number[] | null,
    similarityThreshold: number = 0.99,
    limit: number = 1,
  ): Promise<Suggestions[] | null> {
    try {
      if (!embeddings || embeddings.length === 0) {
        console.log('No embeddings provided');
        return null;
      }

      if (embeddings.length !== 768) {
        console.error(
          `Invalid embedding dimension: expected 768, got ${embeddings.length}`,
        );
        return null;
      }

      const embeddingsString = `[${embeddings.join(',')}]`;

      console.log(
        `Searching for suggestions with similarity threshold: ${similarityThreshold}`,
      );

      const query = `SELECT 
        id,
        embeddings::text as embeddings,
        1 - (embeddings <=> $1::vector) as similarity,
        created_at,
        updated_at
      FROM suggestions 
      WHERE embeddings IS NOT NULL 
        AND 1 - (embeddings <=> $1::vector) >= $2
      ORDER BY embeddings <=> $1::vector
      LIMIT $3`;

      const result = await this.prisma.$queryRawUnsafe<
        Array<{
          id: string;
          suggestions_answer: unknown;
          embeddings: string;
          similarity: number;
          created_at: Date;
          updated_at: Date;
        }>
      >(query, embeddingsString, similarityThreshold, limit);

      if (!result || result.length === 0) {
        console.log(
          `No suggestions found with similarity >= ${similarityThreshold}`,
        );
        return null;
      }

      console.log(
        `Query returned ${result.length} results. Similarities:`,
        result.map((r) => ({
          id: r.id.substring(0, 8) + '...',
          similarity: parseFloat(r.similarity.toFixed(4)),
        })),
      );

      const filteredResult = result.filter(
        (row) => row.similarity >= similarityThreshold && row.similarity > 0,
      );

      if (filteredResult.length === 0) {
        console.log(
          `After filtering, no results with similarity >= ${similarityThreshold}`,
        );
        return null;
      }

      console.log(
        `Returning ${filteredResult.length} filtered suggestions with similarity >= ${similarityThreshold}`,
      );

      return filteredResult.map((row) => ({
        id: row.id,
        suggestions_answer: row.suggestions_answer,
        embeddings: null,
        created_at: row.created_at,
        updated_at: row.updated_at,
      })) as Suggestions[];
    } catch (error) {
      console.error('Error getting raw suggestions with embeddings:', error);
      return null;
    }
  }

  async createSuggestionLanguages(
    suggestion_id: string,
    language: string,
    content: string,
  ): Promise<{ suggestions_answer: unknown; suggestion_id: string } | null> {
    try {
      const languageResult = await this.prisma.suggestion_languages.create({
        data: { suggestion_id, language, content: JSON.parse(content) },
      });

      if (!languageResult || !languageResult.id) {
        throw new Error('Failed to create suggestion language');
      }

      const updated = await this.prisma.suggestions.update({
        where: { id: suggestion_id },
        data: {
          suggestion_languages: {
            connect: { id: languageResult.id },
          },
        },
        include: { suggestion_languages: true },
      });

      if (!updated) {
        throw new Error('Failed to update suggestion');
      }

      const answerWithCorrectLanguage = updated.suggestion_languages?.find(
        (l) => l.language === language,
      );

      if (!answerWithCorrectLanguage) {
        throw new Error('Failed to create suggestion language');
      }

      return {
        suggestions_answer: answerWithCorrectLanguage.content,
        suggestion_id: updated.id,
      };
    } catch (error) {
      console.error('Error creating suggestion languages:', error);
      return null;
    }
  }

  async getSuggestionAccordingToLanguage(
    suggestionId: string,
    language: string,
  ): Promise<SuggestionsResponseDto | null> {
    try {
      const foundSuggestion = await this.prisma.suggestion_languages.findUnique(
        {
          where: {
            suggestion_id_language: {
              suggestion_id: suggestionId,
              language,
            },
          },
        },
      );

      if (!foundSuggestion) {
        return null;
      }

      return {
        suggestion_id: foundSuggestion?.suggestion_id,
        suggestions: foundSuggestion?.content as unknown as SuggestionItem[],
      };
    } catch {
      throw new Error('Error getting suggestion according to language');
    }
  }
}
