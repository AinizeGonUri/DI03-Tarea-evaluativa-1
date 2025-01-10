import { Articulo } from './articulo.model';
// archivo que define los artículos que coge de la API
export interface ApiResponse {
  articles: Articulo[];
}
  