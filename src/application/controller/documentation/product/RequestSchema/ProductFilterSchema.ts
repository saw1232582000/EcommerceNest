import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseFilterSchema } from '../../common/BaseFilterSchema';

export class ProdcutFilterSchama extends BaseFilterSchema {
@ApiPropertyOptional()
  name?: string;
}
