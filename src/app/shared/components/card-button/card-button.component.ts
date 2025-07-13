import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-card-button',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss'],
})
export class CardButtonComponent {
  @Input() icon?: string;
  @Input() text = '';

  @Output() action = new EventEmitter<void>();
}
