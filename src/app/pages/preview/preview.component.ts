import { MovieService } from './../../shared/services/movie.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { IVideoContent } from '../../shared/model/vide-content.interface';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HeaderComponent } from '../../core/components/header/header.component';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { PreviewBannerComponent } from '../../shared/components/preview-banner/preview-banner.component';
import { HeaderService } from '../../shared/services/header.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, MovieCarouselComponent, PreviewBannerComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent implements OnInit {
  previewId!: number; // Declare previewId as a number
  movieService = inject(MovieService)
  headerService = inject(HeaderService)

  headerData$ = this.headerService.getHeaderData(); // Get header data

  constructor(private route: ActivatedRoute) { }
  previewDetails$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  popular: IVideoContent[] = [];
  trending: IVideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTv(),
    this.movieService.getPopular(),
    this.movieService.getTrending(),
    this.movieService.getTopRated(),
  ]

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          this.previewId = Number(params['id']); // Convert id to number

          return forkJoin(this.sources).pipe(
            map(([trending, movies, tvShows, popular]) => {
              // Update observables based on new previewId
              this.previewDetails$ = this.movieService.getBannerDetail(this.previewId);
              this.bannerVideo$ = this.movieService.getBannerVideo(this.previewId);
              console.log(this.previewDetails$);

              return { trending, movies, tvShows, popular };
            })
          );
        })
      )
      .subscribe((res: any) => {
        this.movies = res.movies.results as IVideoContent[];
        this.trending = res.trending.results as IVideoContent[];
        this.tvShows = res.tvShows.results as IVideoContent[];
        this.popular = res.popular.results as IVideoContent[];
      });
  }

}
