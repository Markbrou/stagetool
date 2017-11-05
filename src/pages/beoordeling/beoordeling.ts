import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import jsPDF from 'jspdf';

declare let jsPDF;

export interface Beoordeling {

}

@IonicPage()
@Component({
  selector: 'page-beoordeling',
  templateUrl: 'beoordeling.html',
})
export class BeoordelingPage {

  public details = this.navParams.get('val');

  public beoordeling = {
      brdlng_1: 'v',
      brdlng_2: 'v',
      brdlng_3: 'v',
      brdlng_4: 'v',
      brdlng_5: 'v',
      brdlng_6: 'v',
      brdlng_7: 'v',
      brdlng_8: 'v',
      brdlng_9: 'v',
      brdlng_10: 'v',
      brdlng_11: 'v',
      brdlng_12: 'v',
      brdlng_13: 'v',
      brdlng_14: 'v',
      brdlng_15: 'v',
      brdlng_technisch: 'v',
      opmerking_1: '',
      brdlng_16: 'v',
      brdlng_17: 'v',
      brdlng_18: 'v',
      brdlng_19: 'v',
      brdlng_20: 'v',
      brdlng_21: 'v',
      brdlng_22: 'v',
      brdlng_23: 'v',
      brdlng_24: 'v',
      brdlng_houding: 'v',
      opmerking_2: '',
  }

  beoordelingCollectionRef: AngularFirestoreCollection<Beoordeling>;
  beoordeling$: Observable<Beoordeling[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public afs: AngularFirestore) {
    this.beoordelingCollectionRef = this.afs.collection<Beoordeling>('beoordeling');
    this.beoordeling$ = this.beoordelingCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Beoordeling;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  beoordeel() {
      this.beoordelingCollectionRef.add({
          student: this.details.leerlingnummer,
          brdlng_1: this.beoordeling.brdlng_1,
          brdlng_2: this.beoordeling.brdlng_2,
          brdlng_3: this.beoordeling.brdlng_3,
          brdlng_4: this.beoordeling.brdlng_4,
          brdlng_5: this.beoordeling.brdlng_5,
          brdlng_6: this.beoordeling.brdlng_6,
          brdlng_7: this.beoordeling.brdlng_7,
          brdlng_8: this.beoordeling.brdlng_8,
          brdlng_9: this.beoordeling.brdlng_9,
          brdlng_10: this.beoordeling.brdlng_10,
          brdlng_11: this.beoordeling.brdlng_11,
          brdlng_12: this.beoordeling.brdlng_12,
          brdlng_13: this.beoordeling.brdlng_13,
          brdlng_14: this.beoordeling.brdlng_14,
          brdlng_15: this.beoordeling.brdlng_15,
          brdlng_technisch: this.beoordeling.brdlng_technisch,
          opmerking_1: this.beoordeling.opmerking_1,
          brdlng_16: this.beoordeling.brdlng_16,
          brdlng_17: this.beoordeling.brdlng_17,
          brdlng_18: this.beoordeling.brdlng_18,
          brdlng_19: this.beoordeling.brdlng_19,
          brdlng_20: this.beoordeling.brdlng_20,
          brdlng_21: this.beoordeling.brdlng_21,
          brdlng_22: this.beoordeling.brdlng_22,
          brdlng_23: this.beoordeling.brdlng_23,
          brdlng_24: this.beoordeling.brdlng_24,
          brdlng_houding: this.beoordeling.brdlng_houding,
          opmerking_2: this.beoordeling.opmerking_2,
      });
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

      var text =  '\n\n' + 'Beoordelingsformulier Tech College' + '\n\n' +
                  'Opleiding: ' + details.opleiding + '\n' +
                  'Periode: 1/2/3/4' + '\n' +
                  'Student: ' + details.leerlingnaam + '(' + details.leerlingnummer + ')' + '\n' +
                  'Leerjaar: ' + details.leerjaar + '\n' +
                  'Klas: ' + details.klas + '\n' +
                  'Leerbedrijf: ' + details.leerbedrijf + '\n' +
                  'Woonplaats: ' + details.woonplaats + '\n' +
                  'Praktijkopleider: ' + details.praktijkopleider + '\n' +
                  'Telefoon: ' + details.bedrijf_nummer + '\n' +
                  'E-mailadres: ' + details.leerlingnummer + '@edu.rocmn.nl\n' +
                  'BPV docent: ' + details.docent + '\n' +
                  'Telefoon: ' + details.telefoon + '\n\n\n' +
                  'Technische aspecten' + '\n\n' +
                  '1.  Voorbereiding werkzaamheden: ' + this.beoordeling.brdlng_1 + '\n' +
                  '2.  Plannen en organiseren werkzaamheden: ' + this.beoordeling.brdlng_2 + '\n' +
                  '3.  Gebruik materiaal en gereedschap: ' + this.beoordeling.brdlng_3 + '\n' +
                  '4.  Gebruik meetapparatuur: ' + this.beoordeling.brdlng_4 + '\n' +
                  '5.  Tekeninglezen: ' + this.beoordeling.brdlng_5 + '\n' +
                  '6.  Ontwerpen / aanpassen tekeningen: ' + this.beoordeling.brdlng_6 + '\n' +
                  '7.  Ontwerpen / aanpassen schakelingen: ' + this.beoordeling.brdlng_7 + '\n' +
                  '8.  Ontwerpen / aanpassen installaties: ' + this.beoordeling.brdlng_8 + '\n' +
                  '9.  Kostenberekening maken: ' + this.beoordeling.brdlng_9 + '\n' +
                  '10.  Theoretisch inzicht: ' + this.beoordeling.brdlng_10 + '\n' +
                  '11.  Technisch inzicht: ' + this.beoordeling.brdlng_11 + '\n' +
                  '12.  Kwaliteit geleverde werk: ' + this.beoordeling.brdlng_12 + '\n' +
                  '13.  Rapporteren werkzaamheden: ' + this.beoordeling.brdlng_13 + '\n' +
                  '14.  Houdt zich aan bedrijfsregels: ' + this.beoordeling.brdlng_14 + '\n' +
                  '15.  Houdt zich aan ARBO-regels: ' + this.beoordeling.brdlng_15 + '\n' +
                  'Beoordeling technische aspecten: ' + this.beoordeling.brdlng_technisch + '\n\n' +
                  'Mogelijke opmerking en/of aandachtspunten met betrekking tot de technische aspecten: \n' +
                  this.beoordeling.opmerking_1 + '\n\n' +
                  'Houdingsaspecten' + '\n\n' +
                  '16.  Verloop eerste contacten bedrijf: ' + this.beoordeling.brdlng_16 + '\n' +
                  '17.  Houding ten aanzien van collega’s: ' + this.beoordeling.brdlng_17 + '\n' +
                  '18.  Houding ten aanzien van leidinggevenden: ' + this.beoordeling.brdlng_18 + '\n' +
                  '19.  Houding ten aanzien van klanten: ' + this.beoordeling.brdlng_19 + '\n' +
                  '20.  Omgaan met kritiek: ' + this.beoordeling.brdlng_20 + '\n' +
                  '21.  Komt op tijd: ' + this.beoordeling.brdlng_21 + '\n' +
                  '22.  Toont eigen initiatief: ' + this.beoordeling.brdlng_22 + '\n' +
                  '23.  Inzet: ' + this.beoordeling.brdlng_23 + '\n' +
                  '24.  Toont belangstelling voor het vak: ' + this.beoordeling.brdlng_24 + '\n' +
                  'Beoordeling houdingsaspecten: ' + this.beoordeling.brdlng_houding + '\n\n' +
                  'Mogelijke opmerking en/of aandachtspunten met betrekking tot de houdingsaspecten: \n' +
                  this.beoordeling.opmerking_2 + '\n\n';

      doc.setFontSize(12);
      doc.text(text, 1, 1)
      doc.save('export.pdf')
  }

}
