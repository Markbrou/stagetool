import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BedrijfPage } from './bedrijf';

@NgModule({
  declarations: [
    BedrijfPage,
  ],
  imports: [
    IonicPageModule.forChild(BedrijfPage),
  ],
})
export class BedrijfPageModule {}
