import { Component, EventEmitter, Output } from '@angular/core';
import { CpButtonComponent } from '../../../../shared/components/cp-button/cp-button.component';

@Component({
  selector: 'app-add-post-button',
  standalone: true,
  imports: [CpButtonComponent],
  template: `
    <app-cp-button
      [text]="'Adicionar Post'"
      [iconName]="'add'"
      (buttonClick)="onAddPostClick()"
    ></app-cp-button>
  `,
  styleUrls: ['./add-post-button.component.scss'],
})
export class AddPostButtonComponent {
  @Output() addPostClick = new EventEmitter<void>();

  onAddPostClick(): void {
    this.addPostClick.emit();
  }
}
