// Archivo que se encarga de la lógica que hay detras del tab1.

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticulosService } from '../../services/articulos.service';
import { LecturaService } from '../../services/lectura.service';
import { Articulo } from '../../interfaces/articulo.model';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  articulos: Articulo[] = [];
  private duplicadoSub: Subscription = new Subscription(); // Inicializamos con una instancia vacía

  constructor(
    private articulosService: ArticulosService,
    public lecturaService: LecturaService,
    private alertController: AlertController,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // carga todos los archivos en cuanto abrimos la aplicación
    this.cargarArticulos();

    this.duplicadoSub = this.lecturaService.getArticuloDuplicado().subscribe(() => {
      this.mostrarAlertaDuplicado(); // Llama a la función de alerta en caso de que haya algún artículo duplicado
    });

    // Carga los artículos desde el archivo JSON
    this.http.get<any>('../../assets/datos/articulos.json').subscribe(data => {
      this.articulos = data.articles.map((articulo: any) => ({
        ...articulo,
        elected: articulo.selected || false,  // Asegura que 'selected' esté inicializado
      }));
    });
  }

  ngOnDestroy() {
    // Nos aseguramos de limpiar la suscripción cuando el componente se destruya
    if (this.duplicadoSub) {
      this.duplicadoSub.unsubscribe();
    }
  }

  //Método para asegurarnos de que no haya ningún problema, en caso d ehaberlo, nos aparecera el error en la consola
  cargarArticulos() {
    this.articulosService.getArticulos().subscribe(
      (data) => {
        this.articulos = data.articles;
      },
      (error) => {
        console.error('Error al cargar los artículos:', error);
      }
    );
  }

  // Actualizar el estado de selección de los artículos
  actualizarArticulo(articulo: Articulo) {
    if (articulo.selected) {
      // Si el artículo está siendo marcado (checkbox activado), lo agregamos a tab2
      this.lecturaService.agregarArticulo(articulo);
    } else {
      // Si el artículo está siendo desmarcado, simplemente desmarcamos el checkbox pero no lo eliminamos de tab2
      // No hacemos nada aquí, porque queremos que el artículo permanezca en tab2
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
    this.articulos = this.articulos.filter(a => a.source.id !== articulo.source.id);
  }
}
