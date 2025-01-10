// Archivo encargado de la gestión de la tab2. 

import { Component, OnInit } from '@angular/core';
import { LecturaService } from '../../services/lectura.service';
import { Articulo } from '../../interfaces/articulo.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  articulosSeleccionados: Articulo[] = [];
  selectedArticle: any = null;

  constructor(
    private lecturaService: LecturaService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    // A traves del servicio lecturaService, cargamos los artículos que estén seleccionados al cargar la página
    this.lecturaService.getArticulosSeleccionados().subscribe((articulos: Articulo[]) => {
      this.articulosSeleccionados = articulos;
    });

    this.loadSelectedArticle();
  }

  // Método para borrar los artículos que el usuario quiera borrar
  borrarArticulo(articulo: Articulo) {
    this.lecturaService.borrarArticulo(articulo);
  }

  // Cargar noticia seleccionada desde el almacenamiento
  async loadSelectedArticle() {
    this.selectedArticle = await this.storageService.getSelectedArticle();
  }
}

