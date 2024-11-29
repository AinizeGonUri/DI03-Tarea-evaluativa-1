// archivo que define los artículos
export interface Articulo {
  source: { id: string | null, name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  selected: boolean;
}
  