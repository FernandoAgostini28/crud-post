import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-cp-card',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  styleUrl: './cp-card.component.scss',
  template: `
    <mat-card class="cp-card">
      <img mat-card-image [src]="image" [alt]="alt" />
      <mat-card-content>
        <mat-card-title>{{ title }}</mat-card-title>
        <p>
          {{ content }}
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="actionEdit.emit()">Editar</button>
        <button mat-button (click)="actionDelete.emit()">Excluir</button>
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
