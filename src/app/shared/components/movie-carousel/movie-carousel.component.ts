import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { IVideoContent } from '../../model/vide-content.interface';
import { NgFor } from '@angular/common';
import { ImagePipe } from '../../pipes/image.pipe';
import Swiper from 'swiper';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [NgFor, ImagePipe,RouterLink, RouterLink],
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieCarouselComponent implements AfterViewInit {

  @Input() viewContents: IVideoContent[] = [];
  @Input() title: string | undefined;
  @ViewChild('swiperContainer1') swiperContainer1!: ElementRef;

  // Common Swiper configuration
  private swiperConfig = {
    speed: 500,
    slidesPerView: 1,
    breakpoints: {
      320: { slidesPerView: 2 },
      480: { slidesPerView: 2 },
      640: { slidesPerView: 4 },
      768: { slidesPerView: 5 },
      1024: { slidesPerView: 8 },
    }
  };

  ngAfterViewInit() {
    this.initializeSwiper(this.swiperContainer1.nativeElement);
  }

  private initializeSwiper(container: HTMLElement) {
    new Swiper(container, this.swiperConfig);
  }

}
