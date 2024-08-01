declare var google:any;
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);
  constructor() { }


  signOut(){
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/'])
  }
}
