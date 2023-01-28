import { Theme } from './type/Theme';
import { PrismaClient } from '@prisma/client';

class ThemeRepository {
  client: PrismaClient

  constructor() {
    this.client = new PrismaClient()
  }

  async allThemes(): Promise<Theme[]> {
    return await this.client.themes.findMany()
  }
}

export const themeRepository = new ThemeRepository()