import { Component } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private utilities: UtilitiesService
  ) {}

  ionViewWillEnter(): void {
    const element = document.getElementById('home-page');
    this.utilities.styleScrollbars(element);
  }

}
