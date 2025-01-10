import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticulosService } from '../../services/articulos.service';
import { LecturaService } from '../../services/lectura.service';
import { Articulo } from '../../interfaces/articulo.model';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  articulos: Articulo[] = [];

  categoriaSeleccionada: string = 'business'; // Valor predeterminado
  private duplicadoSub: Subscription = new Subscription(); 

  constructor(
    private articulosService: ArticulosService,
    public lecturaService: LecturaService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Carga todos los artículos desde la API
    this.cargarArticulos();

    // Suscripción al servicio de artículos duplicados
    this.duplicadoSub = this.lecturaService.getArticuloDuplicado().subscribe(() => {
      this.mostrarAlertaDuplicado(); // Llama a la función de alerta en caso de que haya algún artículo duplicado
    });
  }

  ngOnDestroy() {
    // Nos aseguramos de limpiar la suscripción cuando el componente se destruya
    if (this.duplicadoSub) {
      this.duplicadoSub.unsubscribe();
    }
  }

  // Método para cargar los artículos desde la API
  cargarArticulos() {
    this.articulosService.getArticulosPorCategoria(this.categoriaSeleccionada).subscribe(
      (data) => {
        console.log('Datos recibidos de la API:', data);
        // Aquí, accedemos correctamente a la propiedad 'articles'
        if (data && Array.isArray(data.articles)) {
          this.articulos = data.articles;
        } else {
          console.error('La respuesta de la API no contiene un array de artículos');
        }
      },
      (error) => {
        console.error('Error al cargar los artículos desde la API:', error);
      }
    );
  }

  // Actualizar el estado de selección de los artículos
  actualizarArticulo(articulo: Articulo) {
    const articulosEnTab2 = this.lecturaService.getArticulosSeleccionadosValue();
    
    if (articulo.selected) {
      // Verificar si ya existe el artículo en la lista de lectura
      if (!articulosEnTab2.some(a => a.url === articulo.url)) {
        console.log('Añadiendo artículo a la lista de lectura:', articulo);
        this.lecturaService.agregarArticulo(articulo); // Añadir artículo al servicio de lectura
      }
    } else {
      // Si el artículo se desmarca, eliminarlo de la lista
      console.log('Eliminando artículo de la lista de lectura:', articulo);
      this.lecturaService.borrarArticulo(articulo); // Eliminar artículo del servicio de lectura
    }
  }

  // Mostrar alerta cuando se intenta añadir un artículo duplicado
  async mostrarAlertaDuplicado() {
    const alert = await this.alertController.create({
      header: 'Artículo Duplicado',
      message: 'Este artículo ya ha sido añadido a tu lista de lectura.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Método para mostrar alerta de confirmación antes de eliminar un artículo
  async mostrarAlertaConfirmacion(articulo: Articulo) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas borrar este artículo de la lista?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Operación cancelada');
          },
        },
        {
          text: 'Borrar',
          handler: () => {
            this.borrarDeLista(articulo); // Si el usuario confirma, se borra el artículo
          },
        },
      ],
    });

    await alert.present();
  }

  // Método para borrar un artículo de la lista
  borrarDeLista(articulo: Articulo) {
    this.lecturaService.borrarArticulo(articulo); // Llamamos al servicio para borrar
    // También eliminamos el artículo de la lista de 'articulos' de tab1
    this.articulos = this.articulos.filter(a => a.url !== articulo.url);
  }
}
