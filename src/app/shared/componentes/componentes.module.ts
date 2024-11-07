import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTabComponent } from './header-tab/header-tab.component';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';



@NgModule({
  declarations: [
    HeaderTabComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ExploreContainerComponent
  ]
})
export class ComponentesModule { }
