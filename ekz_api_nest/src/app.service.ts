import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const prisma = new PrismaClient()
    const themes = await prisma.themes.findMany()
    console.log(themes)
    return 'Hello World!';
    // return themes
  }
}
