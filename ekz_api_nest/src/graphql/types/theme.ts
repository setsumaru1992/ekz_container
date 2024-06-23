import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Theme {
  // Prisma経由のBigintをGraphQLのIntに変換できないため、暫定的にコメントアウト
  // @Field(type => Int)
  // id: number | bigint

  @Field({nullable: false})
  name: string

  @Field({nullable: true})
  description?: string
}