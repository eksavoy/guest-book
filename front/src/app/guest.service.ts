import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Http, Headers} from '@angular/http';
import {Guest} from './guestInterface';
import { Observable }     from 'rxjs/Observable';

const API = "http://localhost:8080/api/guests";


@Injectable()
export class GuestService {

  constructor(public http: Http) {}

  getGuests() {
    return this.http.get(API).toPromise().then(response => response.json()).catch(this.handleError);
  }

  private post(guest: Guest){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(API, JSON.stringify(guest), {headers: headers}).toPromise().then(res => res.json().data).catch(this.handleError);
  }

  private put(guest: Guest) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = '${API}/${guest._id}';

    return this.http
      .put(url, JSON.stringify(guest), {headers: headers})
      .toPromise()
      .then(() => guest)
      .catch(this.handleError);
  }

  delete(guest: Guest) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = '${API}/${guest._id}';

    return this.http
      .delete(url, headers)
      .toPromise()
      .catch(this.handleError);

  }

  save(guest: Guest){
    if(guest._id){
      return this.put(guest);
    }
    return this.post(guest);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }

}
