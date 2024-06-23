import { Query, Resolver } from '@nestjs/graphql'
import { Theme } from '../types/theme'
import { ThemesFinder } from '../../finders/ThemesFinder';

@Resolver(of => Theme)
export class ThemeQuery {
  constructor(
    private readonly themesFinder: ThemesFinder
  ) {}

  @Query(returns => [Theme], { name: 'themes' })
  async themes(): Promise<Theme[]> {
    const themes = await this.themesFinder.call()
    return themes.map((theme) => {
      return theme.value as Theme
    })
  }
}