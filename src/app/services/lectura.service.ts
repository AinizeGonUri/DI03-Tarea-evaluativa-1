// Con este servicio se quieren gestionar los artículos que ya han pasado a la tab2. Su función es que se agreguen o eliminen según la necesidad del usuario. 

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Articulo } from '../interfaces/articulo.model';
import { Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root',
})

export class LecturaService {
  private articulosSeleccionados: Articulo[] = [];
  private articulosSeleccionadosSubject = new BehaviorSubject<Articulo[]>(this.articulosSeleccionados);
  private articuloDuplicadoSubject = new Subject<void>(); 

  constructor() {}

  // Método para agregar un artículo. Si el artículo ya está en la lista, saltará un modal para avisarnos de que se está duplicando. 
  agregarArticulo(articulo: Articulo) {
    if (this.articulosSeleccionados.some(a => a.title === articulo.title)) {
      this.articuloDuplicadoSubject.next();
      return; 
    }
    // Si no está duplicado, se añade
    this.articulosSeleccionados.push(articulo);
    this.articulosSeleccionadosSubject.next([...this.articulosSeleccionados]);
  }

  // Método para obtener los artículos seleccionados como observable
  getArticulosSeleccionados() {
    return this.articulosSeleccionadosSubject.asObservable();
  }

  // Método para obtener los artículos duplicados como observable
  getArticuloDuplicado() {
    return this.articuloDuplicadoSubject.asObservable();
  }

  // Método para obtener directamente los artículos seleccionados (sin suscripción)
  getArticulosSeleccionadosValue() {
    return this.articulosSeleccionados;
  }

  // Método para borrar un artículo
  borrarArticulo(articulo: Articulo) {
    const articulos = this.articulosSeleccionadosSubject.value;
    const index = articulos.findIndex(a => a.source.id === articulo.source.id);
    if (index !== -1) {
      articulos.splice(index, 1);  // Eliminar el artículo de la lista
      this.articulosSeleccionadosSubject.next([...articulos]);  // Actualizar el observable
    }
  }
}

