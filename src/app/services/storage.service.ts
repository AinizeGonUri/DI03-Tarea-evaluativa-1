import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor() {}

  // Guardar noticia seleccionada
  async saveSelectedArticle(article: any): Promise<void> {
    await Preferences.set({
      key: 'selectedArticle',
      value: JSON.stringify(article)
    });
  }

  // Obtener noticia seleccionada
  async getSelectedArticle(): Promise<any> {
    const { value } = await Preferences.get({ key: 'selectedArticle' });
    return value ? JSON.parse(value) : null;
  }

  // Eliminar noticia seleccionada
  async removeSelectedArticle(): Promise<void> {
    await Preferences.remove({ key: 'selectedArticle' });
  }
}
