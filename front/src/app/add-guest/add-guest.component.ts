import { Component, OnInit, Input} from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import {GuestService} from '../guest.service';
import {Guest} from '../guestInterface';

@Component({
  moduleId: module.id,
  selector: 'app-add-guest',
  templateUrl: 'add-guest.component.html',
  styleUrls: ['add-guest.component.css'],
  directives: [MD_INPUT_DIRECTIVES, MD_BUTTON_DIRECTIVES],
  providers: [GuestService]
})
export class AddGuestComponent implements OnInit {

  formActive = false;

  @Input()
  guest:string;
  @Input()
  author:string;

  guestInsert:Guest;

  constructor(private guestService: GuestService) {}

  ngOnInit() {
  }

  onSubmit(){
    this.formActive = false;
    this.guestInsert = new Guest(this.guest, this.author);
    this.guestService.save(this.guestInsert);
  }

  activeForm(){
    this.formActive = true;
  }

}
