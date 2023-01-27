import { Query, Resolver } from '@nestjs/graphql'
import { Theme } from '../types/theme'

@Resolver(of => Theme)
export class ThemeQuery {
  constructor(
    // private readonly appService: AppService
  ) {
  }

  @Query(returns => Theme, { name: 'themes' })
  themes(): Theme {
    return {
      id: 1,
      name: 'hogename',
      description: 'hogedescription'
    }
  }
}