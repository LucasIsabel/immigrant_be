import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import * as https from 'https';
import { extname } from 'path';

export interface StorageFileItem {
  key: string;
  size: number;
  lastModified: Date;
  url: string;
}

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly publicUrl: string;

  constructor(private readonly configService: ConfigService) {
    const accessKeyId = this.configService.getOrThrow<string>(
      'CLOUDFLARE_R2_ACCESS_KEY_ID',
    );
    const secretAccessKey = this.configService.getOrThrow<string>(
      'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
    );

    this.bucket = this.configService.getOrThrow<string>(
      'CLOUDFLARE_R2_BUCKET_NAME',
    );
    this.publicUrl = this.configService.getOrThrow<string>(
      'CLOUDFLARE_R2_PUBLIC_URL',
    );
    const endpoint = this.configService.getOrThrow<string>(
      'CLOUDFLARE_ENDPOINT',
    );

    this.s3 = new S3Client({
      region: 'auto',
      endpoint: endpoint,
      credentials: { accessKeyId, secretAccessKey },
      forcePathStyle: false,
      requestHandler: new NodeHttpHandler({
        httpsAgent: new https.Agent({
          minVersion: 'TLSv1.2',
        }),
      }),
    });
  }

  async uploadFile(
    buffer: Buffer,
    originalName: string,
    mimeType: string,
    folder: string,
  ): Promise<{ url: string; key: string }> {
    const ext = extname(originalName) || this.mimeToExt(mimeType);
    const filename = `${randomUUID()}${ext}`;
    const key = `${folder}/${filename}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      }),
    );

    const url = `${this.publicUrl}/${key}`;
    this.logger.log(`Uploaded file: ${key}`);
    return { url, key };
  }

  async listFiles(folder?: string): Promise<StorageFileItem[]> {
    this.logger.debug('Listing files', this.s3.config);

    const prefix = folder ? `${folder}/` : undefined;
    const response = await this.s3.send(
      new ListObjectsV2Command({ Bucket: this.bucket, Prefix: prefix }),
    );
    return (response.Contents ?? [])
      .filter((obj) => obj.Key && !obj.Key.endsWith('/'))
      .map((obj) => ({
        key: obj.Key!,
        size: obj.Size ?? 0,
        lastModified: obj.LastModified ?? new Date(),
        url: `${this.publicUrl}/${obj.Key}`,
      }));
  }

  async listFolders(): Promise<string[]> {
    const response = await this.s3.send(
      new ListObjectsV2Command({ Bucket: this.bucket, Delimiter: '/' }),
    );
    return (response.CommonPrefixes ?? [])
      .map((p) => p.Prefix?.replace(/\/$/, '') ?? '')
      .filter(Boolean);
  }

  async deleteFile(key: string): Promise<void> {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
    this.logger.log(`Deleted file: ${key}`);
  }

  private mimeToExt(mimeType: string): string {
    const map: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
      'image/gif': '.gif',
      'application/pdf': '.pdf',
    };
    return map[mimeType] ?? '';
  }
}
