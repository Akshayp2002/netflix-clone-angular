import { IVideoContent } from './../../shared/model/vide-content.interface';
import { MovieService } from './../../shared/services/movie.service';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieCarouselComponent } from "../../shared/components/movie-carousel/movie-carousel.component";

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, MovieCarouselComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {

  movieService = inject(MovieService)

  popularMovies: IVideoContent[] = [];
  popularTv: IVideoContent[] = [];

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(res => {
      console.log(res, "Boooom");
      this.popularMovies = res.results;
      console.log(this.popularMovies,"First Api");
    });

    this.movieService.getTv().subscribe(res => {
      console.log(res, "TV Boom");
      this.popularTv = res.results;
      console.log(this.popularTv, "Second Api");
    });
  }

  auth = inject(AuthService);

  name = JSON.parse(sessionStorage.getItem("loggenInUser")!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem("loggenInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("loggenInUser")!).email;



  defaultImg = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png';

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImg;
  }

  signOut() {
    sessionStorage.removeItem("loggenInUser");
    this.auth.signOut();
  }

}
