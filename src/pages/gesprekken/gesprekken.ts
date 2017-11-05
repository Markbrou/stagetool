import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import jsPDF from 'jspdf';

declare let jsPDF;

export interface Gesprek {
  student: string;
  nummer: number;
  soort: string;
  datum: string;
  beschrijving: string;
}

@IonicPage()
@Component({
  selector: 'page-gesprekken',
  templateUrl: 'gesprekken.html',
})
export class GesprekkenPage {

  public details = this.navParams.get('val');

  gesprekCollectionRef: AngularFirestoreCollection<Gesprek>;
  gesprek$: Observable<Gesprek[]>;
  gesprekken: AngularFirestoreCollection<Gesprek>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public afs: AngularFirestore) {
    this.gesprekCollectionRef = this.afs.collection<Gesprek>('gesprek');
    this.gesprek$ = this.gesprekCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Gesprek;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });

  }

  gesprek = { student: this.details.leerlingnummer, nummer: 1, soort: "Mondeling", datum: "DD/MM/YYYY", beschrijving: ""}

  logForm() {
    this.gesprekCollectionRef.add({ student: this.gesprek.student, nummer: this.gesprek.nummer, soort: this.gesprek.soort, datum: this.gesprek.datum, beschrijving: this.gesprek.beschrijving });
  }

  ionViewDidLoad() {
    console.log(this.details);
  }

  export() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Exporteren als',
        buttons: [
          {
            text: 'PDF',
            handler: () => {
              this.exportPDF(this.details);
            }
            },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
  }

  exportPDF(details) {



      var doc = new jsPDF();
      var text = 'Student: \n' + details.leerlingnaam + '(' + details.leerlingnummer + ')' + '\n\n' +
                 'Opleiding: \n' + details.opleiding + '\n\n' +
                 'Begindatum: \n' + details.begindatum + '\n\n' +
                 'Leerbedrijf: \n' + details.leerbedrijf + '\n\n' +
                 'Praktijkopleider: \n' + details.praktijkopleider + '\n\n' +
                 'Gesprekken: \n';

      doc.text(text, 1, 1)
      doc.save('export.pdf')
  }

}
