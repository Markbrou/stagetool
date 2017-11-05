import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';

import { Http } from '@angular/http';
import * as papa from 'papaparse';

export interface Student {
  naam: string;
  nummer: number;
  klas: string;
  leerjaar: string;
  woonplaats: string;
  telefoon: number;
  opleiding: string;
  docent: string;
}


@IonicPage()
@Component({
  selector: 'page-gegevens',
  templateUrl: 'gegevens.html',
})
export class GegevensPage {

  csvData: any[] = [];
  headerRow: any[] = [];

  public details = this.navParams.get('val');

  studentCollectionRef: AngularFirestoreCollection<Student>;
  student$: Observable<Student[]>;

  constructor(private http: Http, public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public afs: AngularFirestore, public navParams: NavParams) {
    this.studentCollectionRef = this.afs.collection<Student>('students');
    this.student$ = this.studentCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Student;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });

    this.readCsvData();
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
        leerjaar: this.student.leerjaar,
        woonplaats: this.student.woonplaats,
        telefoon: this.student.telefoon,
        opleiding: this.student.opleiding,
        docent: this.student.docent
    });
    this.navCtrl.goToRoot(HomePage);
  }

  export() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Exporteren als',
        buttons: [
          {
            text: 'CSV',
            handler: () => {
              this.downloadCSV(this.details);
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

  private readCsvData() {
    this.http.get('assets/dummyData.csv')
      .subscribe(
      data => this.extractData(data),
      err => this.handleError(err)
      );
  }

  private extractData(res) {
      let csvData = res['_body'] || '';
      let parsedData = papa.parse(csvData).data;

      console.log(parsedData);
      this.headerRow = parsedData[0];
      parsedData.splice(0,1);
      this.csvData = parsedData;
  }

  downloadCSV(details) {

      let dataString = details.leerlingnaam + ',' + details.leerlingnummer + ',' + details.leerbedrijf + ',' + details.woonplaats + ',' + details.praktijkopleider + ',' +
      details.telefoon + ',' + details.leerlingnummer + '@edu.rocmn.nl' + ',' + details.docent + ',' + details.telefoon;
      let newData = papa.parse(dataString).data;

      let csv = papa.unparse({
          fields: this.headerRow,
          data: newData
      });



      console.log(csv);

      var blob = new Blob([csv]);
      var a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = "export.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }

  handleError(err) {
      console.log(err);
  }




}
