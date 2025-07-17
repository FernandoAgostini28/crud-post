import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { ThemePalette } from '@angular/material/core';

export type CpButtonVariant = 'basic' | 'raised' | 'flat' | 'stroked';

@Component({
  selector: 'app-cp-button',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  styleUrl: './cp-button.component.scss',
  template: `
    <ng-template #buttonContent>
      <mat-icon *ngIf="iconName">{{ iconName }}</mat-icon>
      <span *ngIf="text">{{ text }}</span>
    </ng-template>

    <ng-container [ngSwitch]="variant">
      <button
        *ngSwitchCase="'raised'"
        mat-raised-button
        [color]="color"
        (click)="onClick()"
        [class.full-width]="full"
        [disabled]="disabled"
      >
        <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
      </button>
      <button
        *ngSwitchCase="'flat'"
        mat-flat-button
        [color]="color"
        (click)="onClick()"
        [class.full-width]="full"
        [disabled]="disabled"
      >
        <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
      </button>
      <button
        *ngSwitchCase="'stroked'"
        mat-stroked-button
        [color]="color"
        (click)="onClick()"
        [class.full-width]="full"
        [disabled]="disabled"
      >
        <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
      </button>
      <button
        *ngSwitchDefault
        mat-button
        [color]="color"
        (click)="onClick()"
        [class.full-width]="full"
        [disabled]="disabled"
      >
        <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
      </button>
    </ng-container>
  `,
})
export class CpButtonComponent {
  @Input() variant: CpButtonVariant = 'basic';
  @Input() text = '';
  @Input() iconName?: string;
  @Input() full = false;
  @Input() color?: ThemePalette;
  @Input() disabled = false;

  @Output() buttonClick = new EventEmitter<void>();

  onClick(): void {
    this.buttonClick.emit();
  }
}
