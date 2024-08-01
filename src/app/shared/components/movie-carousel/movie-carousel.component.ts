import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { IVideoContent } from '../../model/vide-content.interface';
import { NgFor } from '@angular/common';
import { ImagePipe } from '../../pipes/image.pipe';
import Swiper from 'swiper';

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [NgFor, ImagePipe],
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieCarouselComponent implements AfterViewInit {

  @Input() viewContents: IVideoContent[] = [];
  @Input() title!: string;

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  ngAfterViewInit() {
    const swiper = new Swiper(this.swiperContainer.nativeElement, {
      speed: 500,
      breakpoints: {
        320: { slidesPerView: 3 },
        480: { slidesPerView: 3 },
        640: { slidesPerView: 5 },
        768: { slidesPerView: 8 },
        1024: { slidesPerView: 8 },
      }
    });
  }
}
