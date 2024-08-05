import { PopUpComponent } from './../../../shared/components/pop-up/pop-up.component';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, PopUpComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  constructor(private dialog: MatDialog) { }
  @Input({ required: true }) bannerTitle = '';
  @Input() bannerOverview = '';
  @Input() language = '';
  @Input() vote = '';
  @Input() releaseDate = '';
  @Input() key = 'r_pUE7OcN8w';
  private sanitizer = inject(DomSanitizer)
  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=10&controls=0`)

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key']) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=10&controls=0`);
    }
  }

  openPopup(): void {
    this.dialog.open(PopUpComponent, {
      width: '450px',
      data: {}
    });
  }
}
