import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsObject, IsOptional, Max, Min, ValidateNested } from 'class-validator';

enum ObjectSortingFieldEnum {
  name = 'name',
  description = 'description',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

enum SortingDirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

class Pagination {
  @IsInt()
  @Max(100)
  @Min(0)
  @IsOptional()
  @ApiPropertyOptional({ name: 'pagination[limit]', default: 10, maximum: 100, minimum: 0 })
  limit?: number

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiPropertyOptional({ name: 'pagination[offset]', default: 0, minimum: 0 })
  offset?: number
}

export class ObjectPropsFilter {
  @ApiPropertyOptional({ default: 'Name of object', name: 'filters[props][name]' })
  @IsOptional()
  name?: string

  @ApiPropertyOptional({ default: 'Description of object', name: 'filters[props][description]' })
  @IsOptional()
  description?: string

  @ApiPropertyOptional({ default: 'alternative name', name: 'filters[props][altName]' })
  @IsOptional()
  altName?: string

  @ApiPropertyOptional({ default: '2024-10-01', name: 'filters[props][createdAt]' })
  @IsOptional()
  @IsDateString({ strict: true })
  createdAt?: string

  @ApiPropertyOptional({ default: '2024-10-01', name: 'filters[props][updatedAt]' })
  @IsOptional()
  @IsDateString({ strict: true })
  updatedAt?: string
}

export class ObjectFilters {
  @ValidateNested()
  @ApiPropertyOptional({ type: ObjectPropsFilter })
  @IsOptional()
  props?: ObjectPropsFilter
}

export class ObjectSorting {
  @IsEnum(ObjectSortingFieldEnum)
  @ApiPropertyOptional({ enum: ObjectSortingFieldEnum, name: 'sorting[field]' })
  field!: keyof typeof ObjectSortingFieldEnum

  @IsEnum(SortingDirectionEnum)
  @ApiPropertyOptional({ enum: SortingDirectionEnum, name: 'sorting[direction]' })
  direction!: keyof typeof SortingDirectionEnum
}

export class ObjectListInput {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @ApiPropertyOptional({
    type: ObjectFilters,
  })
  filters?: ObjectFilters

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @ApiPropertyOptional({
    type: ObjectSorting,
    enumName: 'test'
  })
  sorting?: ObjectSorting

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @ApiPropertyOptional({
    type: Pagination,
  })
  pagination?: Pagination
}
