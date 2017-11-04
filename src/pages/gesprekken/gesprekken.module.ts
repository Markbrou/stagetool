import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GesprekkenPage } from './gesprekken';

@NgModule({
  declarations: [
    GesprekkenPage,
  ],
  imports: [
    IonicPageModule.forChild(GesprekkenPage),
  ],
})
export class GesprekkenPageModule {}
