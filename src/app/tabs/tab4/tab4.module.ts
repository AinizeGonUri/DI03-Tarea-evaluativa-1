import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
// import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ComponentesModule } from 'src/app/shared/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // ExploreContainerComponentModule,
    Tab4PageRoutingModule,
    ComponentesModule
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule {}
