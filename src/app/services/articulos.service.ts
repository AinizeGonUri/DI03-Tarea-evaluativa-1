// Este archivo se encarga de obtener todos los artículos que tenemos en el archivo JSON. También se encarga de ir actualizando los artículos que se quieren enviar a la tab2, donde se van a leer. 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs'; 
import { Articulo } from '../interfaces/articulo.model';

@Injectable({
  providedIn: 'root',
})

export class ArticulosService {

  private apiUrl = 'assets/datos/articulos.json';
  private articulosSeleccionadosSubject = new BehaviorSubject<Articulo[]>([]);  // Se inicia con un array vacío
  articulosSeleccionados$ = this.articulosSeleccionadosSubject.asObservable(); // Observable para que otros componentes se suscriban


  constructor(
    private http: HttpClient
  ) { }

  // Con éste método conseguimos que detecte cuando se ha seleaccionado un artículo. Antes de agregarlo (para esto se usa otro método), detecta si ese artículo ya está en el tab2 previamente. 
  actualizarSeleccionados(articulo: Articulo) {
    const articulos = this.articulosSeleccionadosSubject.getValue();

    if (articulo.selected) {
      if (!articulos.some(a => a.title === articulo.title)) {
        this.articulosSeleccionadosSubject.next([...articulos, articulo]);
      }
    } else {
      // Si el artículo no está seleccionado, lo eliminamos
      this.articulosSeleccionadosSubject.next(articulos.filter(a => a.title !== articulo.title));
    }
  }

  // Método para obtener los artículos seleccionados
  obtenerSeleccionados(): Articulo[] {
    return this.articulosSeleccionadosSubject.getValue();
  }

  // Método para obtener los artículos
  getArticulos(): Observable<any> {
    return this.http.get<any>(this.apiUrl); 
  }
}
