import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import * as https from 'https';
import { extname } from 'path';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly publicUrl: string;

  constructor(private readonly configService: ConfigService) {
    const accountId = this.configService.getOrThrow<string>(
      'CLOUDFLARE_R2_ACCOUNT_ID',
    );
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

    this.s3 = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
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
    this.logger.debug('Uploading file', {
      buffer,
      originalName,
      mimeType,
      folder,
    });

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
