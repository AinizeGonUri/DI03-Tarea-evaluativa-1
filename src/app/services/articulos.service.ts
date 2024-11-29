//Este servicio se encarga de gestionar la obtención y manipulación de los artículos. Su principal responsabilidad es interactuar con la API o con archivos locales (como un archivo JSON) para obtener los artículos que se mostrarán en la aplicación. Además, también puede manejar el almacenamiento de los artículos seleccionados, actualizándolos según sea necesario.

// Funcionalidad clave:

// Obtener artículos: Usualmente, este servicio hace peticiones HTTP para traer artículos desde una fuente externa o archivo JSON.
// Gestionar artículos seleccionados: Este servicio puede almacenar y actualizar el estado de los artículos seleccionados (por ejemplo, añadir o quitar artículos de una lista) mediante un BehaviorSubject.
// Proveer artículos a otros componentes: Como es un servicio global, otros componentes pueden suscribirse a los datos que gestiona (por ejemplo, los artículos obtenidos de una API o los seleccionados).

// articulos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs'; 
import { Articulo } from '../interfaces/articulo.model';

@Injectable({
  providedIn: 'root',
})
export class ArticulosService {

  // Aquí ponemos la ruta correcta al archivo JSON
  private apiUrl = 'assets/datos/articulos.json';
  private articulosSeleccionadosSubject = new BehaviorSubject<Articulo[]>([]);  // Inicializa el array vacío
  articulosSeleccionados$ = this.articulosSeleccionadosSubject.asObservable(); // Observable para que otros componentes se suscriban


  constructor(
    private http: HttpClient
  ) { }

  actualizarSeleccionados(articulo: Articulo) {
    const articulos = this.articulosSeleccionadosSubject.getValue();
    // Si el artículo está marcado como seleccionado, lo agregamos
    if (articulo.selected) {
      // Verificamos si ya está en la lista antes de agregarlo
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
    return this.http.get<any>(this.apiUrl); // Cambia la ruta si es necesario
  }

  
}
