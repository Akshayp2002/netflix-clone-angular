import { AuthService } from './../../../shared/services/auth.service';
import { Component, Input, inject } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  auth = inject(AuthService);

  @Input({ required: true })
  userName: string = '';

  @Input({ required: true })
  userImg: string = '';

  defaultImg = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png';


  navList = ["Home", "Tv Show", "News & Popular", "My List", "Browse by Language"];

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImg;
  }


  signOut() {
    sessionStorage.removeItem("loggenInUser");
    this.auth.signOut();
  }

}
