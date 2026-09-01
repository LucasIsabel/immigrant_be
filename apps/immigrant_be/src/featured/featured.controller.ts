import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { FeatureResponseDto } from './dto/feature-response.dto';
import { FeaturableEntity, SetFeatureDto } from './dto/set-feature.dto';
import { FeaturedService } from './featured.service';

@ApiTags('Featured')
@Controller('admin/featured')
export class FeaturedController {
  constructor(private readonly service: FeaturedService) {}

  @Patch(':entity/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Marcar ou desmarcar um item como destaque',
    description:
      'CURATED é escolha editorial; PAID é espaço vendido e exige data de fim. Sem featureKind, o destaque sai.',
  })
  @ApiParam({ name: 'entity', enum: FeaturableEntity })
  @ApiOkResponse({ type: FeatureResponseDto })
  set(
    @Param('entity') entity: FeaturableEntity,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: SetFeatureDto,
  ): Promise<FeatureResponseDto> {
    return this.service.set(entity, id, dto);
  }
}
