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
  selector: 'page-bedrijf',
  templateUrl: 'bedrijf.html',
})


export class BedrijfPage {

  public details = this.navParams.get('val');

  studentCollectionRef: AngularFirestoreCollection<Student>;
  student$: Observable<Student[]>;

  constructor(public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public afs: AngularFirestore) {
      this.studentCollectionRef = this.afs.collection<Student>('students');
      this.student$ = this.studentCollectionRef.snapshotChanges().map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Student;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  public bedrijf = {
    leerbedrijf: this.details.leerbedrijf,
    praktijkopleider: this.details.praktijkopleider,
    begindatum: this.details.begindatum,
    telefoon: this.details.bedrijf_nummer
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BedrijfPage');
  }

  updateBedrijf() {
      this.studentCollectionRef.doc(this.details.id).update({
          leerbedrijf: this.bedrijf.leerbedrijf,
          praktijkopleider: this.bedrijf.praktijkopleider,
          begindatum: this.bedrijf.begindatum,
          bedrijf_nummer: this.bedrijf.telefoon
      });
      this.navCtrl.goToRoot(HomePage);
  }

}
