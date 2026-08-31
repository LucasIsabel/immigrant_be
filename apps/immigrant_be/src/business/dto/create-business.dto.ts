import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BusinessType } from '../../../../../generated/prisma';
import { IsIanaTimeZone } from '../../common/decorators/is-iana-timezone.decorator';
import { WeeklyScheduleDto } from './opening-hours.dto';
import { GeneralTypeDataDto } from './type-data/general-type-data.dto';
import { LegalTypeDataDto } from './type-data/legal-type-data.dto';
import { RestaurantTypeDataDto } from './type-data/restaurant-type-data.dto';
import { TourGuideTypeDataDto } from './type-data/tour-guide-type-data.dto';

/**
 * `@ApiExtraModels` + `oneOf` existem só para o CONTRATO: sem eles os DTOs de
 * `type-data/` não eram referenciados por nada e o OpenAPI expunha `typeData`
 * como `object` genérico — o Kubb do FE gerava `object` e o desencontro de
 * formas entre FE e BE ficava indetectável (foi assim que o 400 do tour-guide
 * de abril aconteceu). A validação de RUNTIME continua sendo o Zod de
 * `business/type-data.schemas.ts`, escolhido pelo `businessType`; anotar
 * `@ValidateNested` aqui mudaria a semântica sob `forbidNonWhitelisted`.
 */
@ApiExtraModels(
  RestaurantTypeDataDto,
  TourGuideTypeDataDto,
  LegalTypeDataDto,
  GeneralTypeDataDto,
)
export class CreateBusinessDto {
  @ApiProperty({ enum: BusinessType, example: BusinessType.RESTAURANT })
  @IsEnum(BusinessType)
  businessType: BusinessType;

  @ApiProperty({ example: 'Restaurante do João', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'Lisboa', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  city: string;

  @ApiPropertyOptional({
    example: 'Um restaurante aconchegante no centro da cidade.',
    maxLength: 2000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional({ example: 'Rua das Flores, 123', maxLength: 200 })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  address?: string;

  @ApiPropertyOptional({ example: 'Portugal', maxLength: 100 })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  country?: string;

  @ApiPropertyOptional({
    example: 'Lisbon',
    description: 'State, region, or district when applicable',
    maxLength: 120,
  })
  @IsString()
  @IsOptional()
  @MaxLength(120)
  state?: string;

  @ApiPropertyOptional({ example: 38.7169 })
  @IsNumber()
  @IsOptional()
  lat?: number;

  @ApiPropertyOptional({ example: -9.1399 })
  @IsNumber()
  @IsOptional()
  lng?: number;

  @ApiPropertyOptional({ example: '+351 912 345 678', maxLength: 20 })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({ example: 'contato@restaurante.pt' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'https://restaurante.pt' })
  @IsUrl()
  @IsOptional()
  @MaxLength(200)
  website?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['https://cdn.example.com/photo1.jpg'],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  @ArrayMaxSize(10)
  @IsOptional()
  photos?: string[];

  @ApiPropertyOptional({
    description:
      'Dados específicos do tipo de negócio. A forma segue o businessType: ' +
      'RESTAURANT → RestaurantTypeDataDto, TOUR_GUIDE → TourGuideTypeDataDto, ' +
      'LEGAL → LegalTypeDataDto, GENERAL → GeneralTypeDataDto.',
    oneOf: [
      { $ref: getSchemaPath(RestaurantTypeDataDto) },
      { $ref: getSchemaPath(TourGuideTypeDataDto) },
      { $ref: getSchemaPath(LegalTypeDataDto) },
      { $ref: getSchemaPath(GeneralTypeDataDto) },
    ],
  })
  @IsObject()
  @IsOptional()
  typeData?: object;

  @ApiPropertyOptional({
    type: WeeklyScheduleDto,
    description:
      'Semana de funcionamento: por dia, uma lista de intervalos ou a marca ' +
      'de fechado. Dia ausente é "não informado", que não é o mesmo que ' +
      'fechado. As regras de ordem, sobreposição e meia-noite são validadas ' +
      'no service.',
  })
  @ValidateNested()
  @Type(() => WeeklyScheduleDto)
  @IsOptional()
  openingHours?: WeeklyScheduleDto;

  @ApiPropertyOptional({
    example: 'Europe/Lisbon',
    description:
      'Fuso IANA do negócio. Sem ele o "aberto agora" não é afirmado em ' +
      'lugar nenhum — o relógio do visitante responderia pelo lugar errado.',
  })
  @IsIanaTimeZone()
  @IsOptional()
  timezone?: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
