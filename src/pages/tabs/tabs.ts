import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { StudentsPage } from '../students/students';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = StudentsPage;

  constructor() {

  }
}
