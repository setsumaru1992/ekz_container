import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ThemeQuery } from './queries/theme.query';
import { ThemesFinder } from '../finders/ThemesFinder';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/graphql/generated/schema.gql'),
      sortSchema: true,
    })
  ],
  providers: [
    ThemeQuery,
    ThemesFinder
  ],
})
export class GraphqlModule {}
