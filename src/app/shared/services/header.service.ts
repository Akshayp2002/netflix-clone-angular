import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  // Mock implementation of data fetching
  getHeaderData(): Observable<any> {
    const sessions = sessionStorage.getItem('loggenInUser');
    let name = 'Guest User';
    let userProfileImg = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'; // Default image
    let email = '';

    if (sessions) {
      const user = JSON.parse(sessions);
      name = user.name || name;
      userProfileImg = user.picture || userProfileImg;
      email = user.email || email;
    }

    return of({
      name,
      userProfileImg,
      email
    });
  }
}
