import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GegevensPage } from './gegevens';

@NgModule({
  declarations: [
    GegevensPage,
  ],
  imports: [
    IonicPageModule.forChild(GegevensPage),
  ],
})
export class GegevensPageModule {}
