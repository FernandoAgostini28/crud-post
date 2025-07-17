import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cp-card',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  styleUrl: './cp-card.component.scss',
  template: `
    <mat-card class="cp-card">
      <img mat-card-image [src]="safeImage" [alt]="alt || title" />
      <mat-card-content>
        <mat-card-title>{{ title }}</mat-card-title>
        <p>{{ content }}</p>
      </mat-card-content>
      <mat-card-actions>
        <ng-content></ng-content>
      </mat-card-actions>
    </mat-card>
  `,
})
export class CpCardComponent implements OnChanges {
  private sanitizer = inject(DomSanitizer);

  @Input() title = 'Shiba Inu';
  @Input() content = '';
  @Input() image =
    'https://material.angular.dev/assets/img/examples/shiba2.jpg';
  @Input() alt?: string;

  safeImage: SafeUrl;

  constructor() {
    this.safeImage = this.sanitizer.bypassSecurityTrustUrl(this.image);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['image'] && this.image) {
      this.safeImage = this.sanitizer.bypassSecurityTrustUrl(this.image);
    }
  }
}
