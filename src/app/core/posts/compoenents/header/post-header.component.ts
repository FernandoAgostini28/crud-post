import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';

@Component({
  selector: 'app-post-header',
  standalone: true,
  imports: [MaterialModule],
  template: `
    <mat-toolbar class="app-header">
      <span class="title">Posts</span>
      <span class="spacer"></span>
      <img
        class="user-avatar"
        [src]="userAvatarUrl"
        [alt]="userName + ' Avatar'"
      />
      <span class="user-name">{{ userName }}</span>
    </mat-toolbar>
  `,
  styleUrls: ['./post-header.component.scss'],
})
export class PostHeaderComponent {
  @Input() userName: string = 'John Doe';
  @Input() userAvatarUrl: string = 'https://i.pravatar.cc/40';
}
