import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Guest} from './guestInterface';
import {AddGuestComponent} from './add-guest/add-guest.component';
import {GuestService} from './guest.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, AddGuestComponent],
  providers: [GuestService]
})
export class AppComponent{
  guests:Guest[];

  constructor(private guestService: GuestService){
    this.guestService.getGuests().then(response => this.guests = response);
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }
}
