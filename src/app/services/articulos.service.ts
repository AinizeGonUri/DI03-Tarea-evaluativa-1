// Este archivo se encarga de obtener todos los artículos que tenemos en el archivo JSON. También se encarga de ir actualizando los artículos que se quieren enviar a la tab2, donde se van a leer. 

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs'; 
import { Articulo } from '../interfaces/articulo.model';
import { ApiResponse } from '../interfaces/apiResponse.model';

@Injectable({
  providedIn: 'root',
})

export class ArticulosService {

  private apiKey = '433e74f3a5f9472eb664d88231ffc323'; 
  private apiUrlBase = 'https://newsapi.org/v2/top-headlines';

  private articulosSeleccionadosSubject = new BehaviorSubject<Articulo[]>([]); 
  articulosSeleccionados$ = this.articulosSeleccionadosSubject.asObservable(); 
  
  constructor(
    private http: HttpClient
  ) { }

  // Método para obtener artículos de cualquier categoría
  getArticulosPorCategoria(categoria: string): Observable<ApiResponse> {
    const url = `${this.apiUrlBase}?category=${categoria}&apiKey=${this.apiKey}`;
    return this.http.get<ApiResponse>(url);
  }

  // Con éste método conseguimos que detecte cuando se ha seleaccionado un artículo. Antes de agregarlo (para esto se usa otro método), detecta si ese artículo ya está en el tab2 previamente. 
  actualizarSeleccionados(articulo: Articulo) {
    const articulos = this.articulosSeleccionadosSubject.getValue();

    if (articulo.selected) {
      if (!articulos.some(a => a.url === articulo.url)) {
        this.articulosSeleccionadosSubject.next([...articulos, articulo]);
      }
    } else {
      this.articulosSeleccionadosSubject.next(articulos.filter(a => a.url !== articulo.url));
    }
  }

  // Método para obtener los artículos seleccionados
  obtenerSeleccionados(): Articulo[] {
    return this.articulosSeleccionadosSubject.getValue();
  }
}
