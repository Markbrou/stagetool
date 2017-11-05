import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { StudentsPage } from '../pages/students/students';
import { AddstudentPage } from '../pages/addstudent/addstudent';
import { GegevensPage } from '../pages/gegevens/gegevens';
import { GesprekkenPage } from '../pages/gesprekken/gesprekken';
import { BedrijfPage } from '../pages/bedrijf/bedrijf';
import { BeoordelingPage } from '../pages/beoordeling/beoordeling';
import { TabsPage } from '../pages/tabs/tabs';

import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyAECwxAs3yHi6oI6R8KblH5pM2HrzccUII",
  authDomain: "stagetool-c9984.firebaseapp.com",
  databaseURL: "https://stagetool-c9984.firebaseio.com",
  projectId: "stagetool-c9984",
  storageBucket: "stagetool-c9984.appspot.com",
  messagingSenderId: "565482876879"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StudentsPage,
    AddstudentPage,
    GegevensPage,
    GesprekkenPage,
    BedrijfPage,
    BeoordelingPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StudentsPage,
    AddstudentPage,
    GegevensPage,
    GesprekkenPage,
    BedrijfPage,
    BeoordelingPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
