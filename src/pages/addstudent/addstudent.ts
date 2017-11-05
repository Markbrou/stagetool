import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Student {

}

@IonicPage()
@Component({
  selector: 'page-addstudent',
  templateUrl: 'addstudent.html',
})
export class AddstudentPage {

  studentCollectionRef: AngularFirestoreCollection<Student>;
  student$: Observable<Student[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public afs: AngularFirestore) {
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
    nummer: '',
    naam: '',
    klas: '',
    leerjaar: '',
    woonplaats: '',
    telefoon: '',
    opleiding: '',
    docent: '',
    leerbedrijf: '',
    bedrijf_adres: '',
    bedrijf_postcode: '',
    bedrijf_plaats: '',
    praktijkopleider: '',
    begindatum: '',
    bedrijf_nummer: '',
  }

  createStudent() {
      this.studentCollectionRef.add({
        bedrijf_adres: this.student.bedrijf_adres,
        bedrijf_nummer: this.student.bedrijf_nummer,
        bedrijf_plaats: this.student.bedrijf_plaats,
        bedrijf_postcode: this.student.bedrijf_postcode,
        begindatum: this.student.begindatum,
        docent: this.student.docent,
        klas: this.student.klas,
        leerbedrijf: this.student.leerbedrijf,
        leerjaar: this.student.leerjaar,
        leerlingnaam: this.student.naam,
        leerlingnummer: this.student.nummer,
        opleiding: this.student.opleiding,
        praktijkopleider: this.student.praktijkopleider,
        telefoon: this.student.telefoon,
        woonplaats: this.student.woonplaats,
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddstudentPage');
  }

}
