// Propósito:
// Este servicio tiene como objetivo gestionar la lista de artículos que el usuario quiere leer. En otras palabras, es el servicio que maneja los artículos que el usuario ha seleccionado o marcado. Su principal rol es almacenar, agregar, eliminar o verificar artículos seleccionados para su posterior visualización en una página específica (como una lista de artículos guardados).

// Funcionalidad clave:

// Gestionar los artículos a leer: Este servicio tiene las funciones de agregar y eliminar artículos de la lista de artículos que el usuario desea leer.
// Almacenar los artículos seleccionados para su visualización en otras pantallas (como tab2).
// Alertas o validaciones: Puede incluir lógica de validación o alertas (por ejemplo, si el artículo ya está en la lista, mostrar un mensaje de error).

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Articulo } from '../interfaces/articulo.model';
import { Subject } from 'rxjs'; // Importamos Subject

@Injectable({
  providedIn: 'root',
})
export class LecturaService {
  private articulosSeleccionados: Articulo[] = [];
  private articulosSeleccionadosSubject = new BehaviorSubject<Articulo[]>(this.articulosSeleccionados);
  private articuloDuplicadoSubject = new Subject<void>(); // Nuevo Subject para emitir alerta

  constructor() {}

  // Método para agregar un artículo
  agregarArticulo(articulo: Articulo) {
    // Verificamos si el artículo ya está en la lista
    if (this.articulosSeleccionados.some(a => a.title === articulo.title)) {
      // Si el artículo ya está en la lista, emitimos el evento para mostrar la alerta
      this.articuloDuplicadoSubject.next();
      return; // No agregamos el artículo duplicado
    }

    // Si no está duplicado, lo agregamos
    this.articulosSeleccionados.push(articulo);
    this.articulosSeleccionadosSubject.next([...this.articulosSeleccionados]);
  }

  // Método para obtener los artículos seleccionados como Observable
  getArticulosSeleccionados() {
    return this.articulosSeleccionadosSubject.asObservable(); // Devuelve un Observable
  }

  // Método para borrar un artículo
  borrarArticulo(articulo: Articulo) {
    this.articulosSeleccionados = this.articulosSeleccionados.filter(a => a !== articulo);
    this.articulosSeleccionadosSubject.next([...this.articulosSeleccionados]);
  }

  getArticuloDuplicado() {
    return this.articuloDuplicadoSubject.asObservable();
  }

    // Método para obtener directamente los artículos seleccionados (sin suscripción)
    getArticulosSeleccionadosValue() {
      return this.articulosSeleccionados;
    }
}

