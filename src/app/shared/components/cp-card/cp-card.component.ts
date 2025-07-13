import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-cp-card',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <mat-card class="cp-card" appearance="outlined">
      <mat-card-header>
        <mat-card-title>{{ title }}</mat-card-title>
      </mat-card-header>
      <img mat-card-image [src]="image" [alt]="alt" />
      <mat-card-content>
        <p>
          {{ content }}
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button matButton (click)="actionEdit.emit()">Editar</button>
        <button matButton (click)="actionDelete.emit()">Excluir</button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class CpCardComponent {
  @Input() title = 'Shiba Inu';
  @Input() content = '';
  @Input() image =
    'https://material.angular.dev/assets/img/examples/shiba2.jpg';
  @Input() alt?: string = `Image card ${this.title}`;

  @Output() actionEdit = new EventEmitter<void>();
  @Output() actionDelete = new EventEmitter<void>();
}
