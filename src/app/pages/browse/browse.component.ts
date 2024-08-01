import { MovieService } from './../../shared/services/movie.service';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent ,BannerComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit{

  movieService = inject(MovieService)
  ngOnInit(): void {
    
    this.movieService.getMovies().subscribe(res=>{
      console.log(res,"MOVUIEIEIEI");
    });
  }
  auth = inject(AuthService);

  name = JSON.parse(sessionStorage.getItem("loggenInUser")!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem("loggenInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("loggenInUser")!).email;



  signOut() {
    sessionStorage.removeItem("loggenInUser");
    this.auth.signOut();
  }

  defaultImg = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png';

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImg;
  }
}
