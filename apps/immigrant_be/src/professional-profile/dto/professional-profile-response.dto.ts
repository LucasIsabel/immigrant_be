import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileUserDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional({ nullable: true })
  image: string | null;
}

export class ProfessionalProfileResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiPropertyOptional({ nullable: true })
  jobTitle: string | null;

  @ApiPropertyOptional({ nullable: true })
  company: string | null;

  @ApiPropertyOptional({ nullable: true })
  linkedinUrl: string | null;

  @ApiPropertyOptional({ nullable: true })
  githubUrl: string | null;

  @ApiPropertyOptional({ nullable: true })
  websiteUrl: string | null;

  @ApiPropertyOptional({ nullable: true })
  bio: string | null;

  @ApiProperty({ type: [String] })
  skills: string[];

  @ApiPropertyOptional({ nullable: true })
  yearsOfExperience: number | null;

  @ApiPropertyOptional({ nullable: true })
  location: string | null;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional({ type: ProfileUserDto })
  user?: ProfileUserDto;
}
