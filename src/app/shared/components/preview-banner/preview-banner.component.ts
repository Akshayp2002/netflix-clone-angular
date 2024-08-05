import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { IVideoContent } from '../../model/vide-content.interface';
import Swiper from 'swiper';
import { NgFor } from '@angular/common';
import { ImagePipe } from '../../pipes/image.pipe';


@Component({
  selector: 'app-preview-banner',
  standalone: true,
  imports: [NgFor, ImagePipe],
  templateUrl: './preview-banner.component.html',
  styleUrl: './preview-banner.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PreviewBannerComponent {

  @Input() viewContents: IVideoContent[] = [];
  @Input() title: string | undefined;
  @ViewChild('swiperContainer1') swiperContainer1!: ElementRef;

  // Common Swiper configuration
  private swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 10, // Adjust spacing between slides if needed
    navigation: true, // Enable navigation arrows if desired
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // Responsive settings for different screen sizes
      340: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  };

  ngAfterViewInit() {
    this.initializeSwiper(this.swiperContainer1.nativeElement);
  }

  private initializeSwiper(container: HTMLElement) {
    new Swiper(container, this.swiperConfig);
  }

}
