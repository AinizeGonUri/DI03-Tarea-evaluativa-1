// componentes/articulo-card/articulo-card.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Articulo } from '../../interfaces/articulo.model';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-articulo-card',
  templateUrl: './articulo-card.component.html',
  styleUrls: ['./articulo-card.component.scss']
})
export class ArticuloCardComponent {
    @Input() articulo!: Articulo;  // Usamos el operador "!" para decirle a TypeScript que 'articulo' será siempre no undefinded
    @Output() borrar = new Subject<Articulo>();
  
    constructor( private alertController: AlertController) {}

    async mostrarAlertaConfirmacion(articulo: Articulo) {
        const alert = await this.alertController.create({
          header: 'Confirmación de Eliminación',
          message: `¿Estás seguro de que quieres eliminar el artículo "${articulo.title}" de tu lista?`,
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
              text: 'Eliminar',
              handler: () => {
                this.borrar.next(articulo); // Si se confirma, se elimina
              },
            },
          ],
        });
    
        await alert.present();
    }

    

    
  }
