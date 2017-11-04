import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';

export interface Student {
  name: string;
}


@IonicPage()
@Component({
  selector: 'page-gegevens',
  templateUrl: 'gegevens.html',
})
export class GegevensPage {

  public details = this.navParams.get('val');

  studentCollectionRef: AngularFirestoreCollection<Student>;
  student$: Observable<Student[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public afs: AngularFirestore, public navParams: NavParams) {
    this.studentCollectionRef = this.afs.collection<Student>('students');
    this.student$ = this.studentCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Student;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  public student = {
    nummer: this.details.leerlingnummer,
    naam: this.details.leerlingnaam,
    klas: this.details.klas,
    leerjaar: this.details.leerjaar,
    woonplaats: this.details.woonplaats,
    telefoon: this.details.telefoon,
    opleiding: this.details.opleiding,
    docent: this.details.docent,

  }

  updateStudent() {
    this.studentCollectionRef.doc(this.details.id).update({
        leerlingnummer: this.student.nummer,
        leerlingnaam: this.student.naam,
        klas: this.student.klas,
        leerjaar: this.details.leerjaar,
        woonplaats: this.details.woonplaats,
        telefoon: this.details.telefoon,
        opleiding: this.details.opleiding,
        docent: this.details.docent
    });
    this.navCtrl.goToRoot(HomePage);
  }




}
