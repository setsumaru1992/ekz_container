import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Theme {
  @Field(type => Int)
  id: number

  @Field({nullable: false})
  name?: string

  @Field({nullable: true})
  description?: string
}