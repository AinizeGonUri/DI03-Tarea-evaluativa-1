import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../../shared/explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import { ComponentesModule } from 'src/app/shared/componentes/componentes.module';
import { ArticuloCardComponent } from '../../components/articulo-card/articulo-card.component';  // Importamos el componente aquí

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    ComponentesModule
  ],
  declarations: [Tab2Page, ArticuloCardComponent]
})
export class Tab2PageModule {}
