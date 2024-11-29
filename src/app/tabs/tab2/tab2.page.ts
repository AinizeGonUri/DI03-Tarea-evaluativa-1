import { Component, OnInit } from '@angular/core';
import { LecturaService } from '../../services/lectura.service';
import { Articulo } from '../../interfaces/articulo.model';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  articulosSeleccionados: Articulo[] = [];

  constructor(
    private lecturaService: LecturaService
  ) {}

  ngOnInit() {
    // Nos suscribimos al observable de artículos seleccionados
    this.lecturaService.getArticulosSeleccionados().subscribe((articulos: Articulo[]) => {
      console.log(articulos);
      this.articulosSeleccionados = articulos;
    });
  }

  borrarArticulo(articulo: Articulo) {
    this.lecturaService.borrarArticulo(articulo);
  }
}

