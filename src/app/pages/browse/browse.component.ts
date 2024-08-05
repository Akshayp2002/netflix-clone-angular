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
import { HeaderService } from '../../shared/services/header.service';

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

  // to get header data
  headerService = inject(HeaderService)
  headerData$ = this.headerService.getHeaderData(); // Get header data
  // validate api response
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
  getMovieKey() {
    this.movieService.getBannerVideo(this.movies[0].id)
      .subscribe(res => {
        console.log(res, "getMovieKey");
      })
  }

  signOut() {
    sessionStorage.removeItem("loggenInUser");
    this.auth.signOut();
  }

}
