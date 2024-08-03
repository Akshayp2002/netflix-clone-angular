import { IVideoContent } from './../../shared/model/vide-content.interface';
import { MovieService } from './../../shared/services/movie.service';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieCarouselComponent } from "../../shared/components/movie-carousel/movie-carousel.component";
import { forkJoin, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PreviewBannerComponent } from "../../shared/components/preview-banner/preview-banner.component";

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, MovieCarouselComponent, PreviewBannerComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {

  movieService = inject(MovieService)
  auth = inject(AuthService);

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  popular: IVideoContent[] = [];
  upcoming: IVideoContent[] = [];
  toprated: IVideoContent[] = [];
  trending: IVideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTv(),
    this.movieService.getPopular(),
    this.movieService.getUpcoming(),
    this.movieService.getTopRated(),
    this.movieService.getTrending(),
  ]

  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();

  ngOnInit(): void {
    forkJoin(this.sources)
      .pipe(map(([trending, movies, tvShows, popular, upcoming, toprated]) => {
        console.log(toprated, "top tated");
        this.bannerDetail$ = this.movieService.getBannerDetail(trending.results[6].id);
        this.bannerVideo$ = this.movieService.getBannerVideo(trending.results[6].id);
        return { trending, movies, tvShows, popular, upcoming, toprated };
      })
      ).subscribe((res: any) => {
        this.movies = res.movies.results as IVideoContent[],
          this.trending = res.trending.results as IVideoContent[],
          this.tvShows = res.tvShows.results as IVideoContent[],
          this.popular = res.popular.results as IVideoContent[],
          this.upcoming = res.upcoming.results as IVideoContent[],
          this.toprated = res.toprated.results as IVideoContent[]
      })
  }

  name = JSON.parse(sessionStorage.getItem("loggenInUser")!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem("loggenInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("loggenInUser")!).email;

  defaultImg = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png';

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImg;
  }
  getMovieKey() {
    this.movieService.getBannerVideo(this.movies[0].id)
      .subscribe(res => {
        console.log(res, "banner");
      })
  }

  signOut() {
    sessionStorage.removeItem("loggenInUser");
    this.auth.signOut();
  }

}
