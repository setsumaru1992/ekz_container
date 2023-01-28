import { Injectable } from '@nestjs/common';
import { ThemesQuery } from '../models/theme/query/ThemesQuery';
import { Theme } from '../models/theme/entity/Theme';

@Injectable()
export class ThemesFinder {
  async call(): Promise<Theme[]> {
    return await ThemesQuery.call()
  }
}