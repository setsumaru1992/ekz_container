import { Theme } from './type/Theme';
import { PrismaClient } from '@prisma/client';

class ThemeRepository {
  client: PrismaClient

  constructor() {
    this.client = new PrismaClient()
  }

  async allThemes(): Promise<Theme[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: 'hogename',
            description: 'hogedescription'
          }
        ])
      }, 100)
    })
    // return [
    //   {
    //     id: 1,
    //     name: 'hogename',
    //     description: 'hogedescription'
    //   }
    // ]
    // return await this.client.themes.findMany()
  }
}

export const themeRepository = new ThemeRepository()