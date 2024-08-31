import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseFilterSchema } from '../../common/BaseFilterSchema';

export class OrderFilterSchama extends BaseFilterSchema {
@ApiPropertyOptional()
  date?: string;
}