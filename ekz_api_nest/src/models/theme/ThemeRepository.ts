import { PrismaClient } from '@prisma/client';
import { Theme } from './entity/Theme';

class ThemeRepository {
  client: PrismaClient

  constructor() {
    this.client = new PrismaClient()
  }

  async allThemes(): Promise<Theme[]> {
    const themes = await this.client.themes.findMany()
    return themes.map((theme) => {
      return new Theme(theme)
    })
  }
}

export const themeRepository = new ThemeRepository()