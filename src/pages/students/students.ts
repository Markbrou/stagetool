import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AddstudentPage } from '../addstudent/addstudent';
import { BedrijfPage } from '../bedrijf/bedrijf';
import { GegevensPage } from '../gegevens/gegevens';
import { GesprekkenPage } from '../gesprekken/gesprekken';
import { BeoordelingPage } from '../beoordeling/beoordeling';

export interface Student {
  name: string;
}

@IonicPage()
@Component({
  selector: 'page-students',
  templateUrl: 'students.html',
})
export class StudentsPage {

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentsPage');
  }

  newStudent() {
    this.navCtrl.push(AddstudentPage, {})
  }

  deleteStudent(student) {
      console.log('delete: ' + student.id);
      this.studentCollectionRef.doc(student.id).delete();
  }

  openGegevens(student) {
    this.navCtrl.push(GegevensPage, {
      val: student
    })
  }

  openBedrijf(student) {
    this.navCtrl.push(BedrijfPage, {
      val: student
    })
  }

  openGesprekken(student) {
    this.navCtrl.push(GesprekkenPage, {
      val: student
    })
  }

  openBeoordeling(student) {
    this.navCtrl.push(BeoordelingPage, {
      val: student
    })
  }

showOptions(student) {

  let actionSheet = this.actionSheetCtrl.create({
    title: 'Selecteer een optie',
    buttons: [
      {
        text: 'Gegevens',
        icon: 'person',
        handler: () => {
          this.openGegevens(student);
        }
      },{
        text: 'Stagebedrijf',
        icon: 'briefcase',
        handler: () => {
          this.openBedrijf(student);
        }
      },{
        text: 'Gesprekken',
        icon: 'chatboxes',
        handler: () => {
          this.openGesprekken(student);
        }
      },{
        text: 'Beoordeling',
        icon: 'list-box',
        handler: () => {
          this.openBeoordeling(student);
        }
      },{
        text: 'Verwijder student',
        icon: 'trash',
        role: 'destructive',
        handler: () => {
          this.deleteStudent(student);
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

}
