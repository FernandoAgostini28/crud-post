import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/posts-model';
import { CommonModule } from '@angular/common';
import { CpCardComponent } from '../../../../shared/components/cp-card/cp-card.component';
import { CpButtonComponent } from '../../../../shared/components/cp-button/cp-button.component';

@Component({
  selector: 'app-posts-list-cards',
  standalone: true,
  imports: [CommonModule, CpCardComponent, CpButtonComponent],
  templateUrl: './posts-list-cards.component.html',
  styleUrl: './posts-list-cards.component.scss',
})
export class PostsListCardsComponent {
  @Input() posts: Post[] | null = [];
  @Output() editPost = new EventEmitter<Post>();
  @Output() deletePost = new EventEmitter<Post>();

  onEditPost(post: Post): void {
    this.editPost.emit(post);
  }

  onDeletePost(post: Post): void {
    this.deletePost.emit(post);
  }
}
