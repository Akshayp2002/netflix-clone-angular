import { RouterLink } from '@angular/router';
import { HeaderService } from '../../../shared/services/header.service';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, Input, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  auth = inject(AuthService);

  @Input() userName: string = '';
  @Input() userImg: string = '';
  @Input() email: string = '';

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.getHeaderData().subscribe(data => {
      this.userName = data.name;
      this.userImg = data.userProfileImg;
      this.email = data.email;
    });
  }

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
