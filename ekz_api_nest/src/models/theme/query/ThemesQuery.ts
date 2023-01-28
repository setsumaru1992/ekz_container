import type { Theme } from '../entity/Theme';
import { themeRepository } from '../ThemeRepository';

export class ThemesQuery {
  static async call(): Promise<Theme[]> {
    return await themeRepository.allThemes()
  }
}