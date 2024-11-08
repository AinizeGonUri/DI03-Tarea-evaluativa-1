import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab5PageRoutingModule } from './tab5-routing.module';

import { Tab5Page } from './tab5.page';
import { ExploreContainerComponentModule } from '../../shared/explore-container/explore-container.module';

import { ComponentesModule } from 'src/app/shared/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    Tab5PageRoutingModule,
    ComponentesModule
  ],
  declarations: [Tab5Page]
})
export class Tab5PageModule {}
