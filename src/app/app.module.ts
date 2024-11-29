import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de que esté aquí también
import { Tab1PageModule } from './tabs/tab1/tab1.module'; // Importa el módulo Tab1PageModule
import { Tab2PageModule } from './tabs/tab2/tab2.module'; // Importa el módulo Tab1PageModule
import { Tab3PageModule } from './tabs/tab3/tab3.module'; // Importa el módulo Tab1PageModule
import { Tab4PageModule } from './tabs/tab4/tab4.module'; // Importa el módulo Tab1PageModule
import { Tab5PageModule } from './tabs/tab5/tab5.module'; // Importa el módulo Tab1PageModule

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,  // Asegúrate de que esto esté aquí
    Tab1PageModule,     // Asegúrate de que el módulo Tab1Page esté importado
    Tab2PageModule,
    Tab3PageModule,
    Tab4PageModule,
    Tab5PageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
