import List, { 
  ListType, 
  ThemeType 
} from './components/List';
import { THEMES_QUERY } from './models/queries';

export type ThemesListAreaType = ListType;
export type ThemeType = ThemeType;

export { 
  List as ThemeListArea,
  THEMES_QUERY,
}