import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import {
  NotificationStatus,
  Prisma,
  Suggestions,
  VisaTypeRecommendations,
} from 'generated/prisma';
import {
  SuggestionItem,
  SuggestionsDto,
  SuggestionsResponseDto,
} from './dto/suggestions.dto';
import { EventResponseDto } from './dto/event.dto';
import { UserDetailsQueryDto } from '../users/dto/user-details-query.dto';
import { VisaRecommendationType } from './gemini.service';

@Injectable()
export class SystemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSuggestions(
    suggestions: Prisma.InputJsonValue,
    embeddings: number[] | null,
    parameters: SuggestionsDto,
    language: string,
  ): Promise<{ suggestion_id: string }> {
    try {
      if (embeddings && embeddings.length > 0) {
        const embeddingsString = `[${embeddings.join(',')}]`;

        const result = await this.prisma.$queryRawUnsafe<
          Array<{
            id: string;
            embeddings: string;
            parameters: unknown;
            created_at: Date;
            updated_at: Date;
          }>
        >(
          `INSERT INTO suggestions (id, embeddings, created_at, updated_at, parameters)
           VALUES (
             gen_random_uuid(),
             $1::vector,
             NOW(),
             NOW(),
             $2::jsonb
           )
           RETURNING 
             id,
             embeddings::text as embeddings,
             created_at,
             updated_at,
             parameters`,
          embeddingsString,
          parameters,
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
    } catch (error) {
      console.error('Error creating suggestions:', error);

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
          parameters: unknown;
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
        parameters: row.parameters,
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

  async getEvents(userId: string): Promise<EventResponseDto | null> {
    const result = await this.prisma.events.findFirst({
      where: {
        user_id: userId,
        status: NotificationStatus.pending,
      },
    });

    if (!result) {
      return null;
    }

    return result as EventResponseDto;
  }

  async createVisaTypeRecommendation(
    country_id: string,
    gemini_response: VisaRecommendationType,
    embeddings: number[] | null,
    parameters: UserDetailsQueryDto,
    language: string,
  ): Promise<{ visa_type_recommendation_id: string }> {
    try {
      if (!embeddings || embeddings.length === 0) {
        throw new Error('No embeddings provided');
      }

      if (embeddings.length !== 768) {
        throw new Error(
          `Invalid embedding dimension: expected 768, got ${embeddings.length}`,
        );
      }

      const embeddingsString = `[${embeddings.join(',')}]`;

      const result = await this.prisma.$queryRawUnsafe<
        Array<{
          id: string;
          embeddings: string;
          created_at: Date;
          updated_at: Date;
        }>
      >(
        `INSERT INTO visa_type_recommendations (
          id,
          country_id,
          gemini_response,
          embeddings,
          parameters,
          language,
          created_at,
          updated_at
        )
        VALUES (
          gen_random_uuid(),
          $1::uuid,
          $2::jsonb,
          $3::vector,
          $4::jsonb,
          $5::text,
          NOW(),
          NOW()
        )
        RETURNING 
          id,
          embeddings::text as embeddings,
          created_at,
          updated_at`,
        country_id,
        gemini_response,
        embeddingsString,
        parameters,
        language,
      );

      return {
        visa_type_recommendation_id: result[0].id,
      };
    } catch (error) {
      console.error('Error creating visa type recommendation:', error);
      throw new Error('Error creating visa type recommendation');
    }
  }

  async getRawVisaTypeRecommendationsWithEmbeddings(
    embeddings: number[] | null,
    similarityThreshold: number = 0.99,
    limit: number = 1,
  ): Promise<VisaTypeRecommendations[] | null> {
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
        `Searching for visa type recommendations with similarity threshold: ${similarityThreshold}`,
      );

      const query = `SELECT 
        id,
        country_id,
        gemini_response,
        embeddings::text as embeddings,
        parameters,
        language,
        user_details,
        1 - (embeddings <=> $1::vector) as similarity,
        created_at,
        updated_at
      FROM visa_type_recommendations 
      WHERE embeddings IS NOT NULL 
        AND 1 - (embeddings <=> $1::vector) >= $2
      ORDER BY embeddings <=> $1::vector
      LIMIT $3`;

      const result = await this.prisma.$queryRawUnsafe<
        Array<{
          id: string;
          country_id: string;
          gemini_response: unknown;
          embeddings: string;
          parameters: unknown;
          language: string;
          similarity: number;
          created_at: Date;
          updated_at: Date;
        }>
      >(query, embeddingsString, similarityThreshold, limit);

      if (!result || result.length === 0) {
        console.log(
          `No visa type recommendations found with similarity >= ${similarityThreshold}`,
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
        `Returning ${filteredResult.length} filtered visa type recommendations with similarity >= ${similarityThreshold}`,
      );

      return filteredResult.map((row) => ({
        id: row.id,
        country_id: row.country_id,
        gemini_response: row.gemini_response,
        embeddings: null,
        parameters: row?.parameters,
        language: row.language,
        created_at: row.created_at,
        updated_at: row.updated_at,
      })) as VisaTypeRecommendations[];
    } catch (error) {
      console.error(
        'Error getting raw visa type recommendations with embeddings:',
        error,
      );
      return null;
    }
  }

  async getRawSuggestionsWithParameters(
    parameters: SuggestionsDto,
  ): Promise<Suggestions | null> {
    try {
      return await this.prisma.suggestions.findFirst({
        where: {
          parameters: {
            equals: parameters as unknown as Prisma.InputJsonValue,
          },
        },
      });
    } catch (error) {
      console.error('Error getting raw suggestions with parameters:', error);
      return null;
    }
  }

  async getBestVisaTypeRecommendation(
    country_id: string,
    parameters: UserDetailsQueryDto,
    language: string,
  ): Promise<VisaTypeRecommendations | null> {
    return await this.prisma.visaTypeRecommendations.findFirst({
      where: {
        country_id,
        parameters: {
          equals: parameters as unknown as Prisma.InputJsonValue,
        },
        language,
      },
    });
  }
}
