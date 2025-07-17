import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Post } from '../../models/posts-model';
import { CommonModule } from '@angular/common';
import { CpCardComponent } from '../../../../shared/components/cp-card/cp-card.component';
import { CpButtonComponent } from '../../../../shared/components/cp-button/cp-button.component';
import { MatDialog } from '@angular/material/dialog';
import { CpConfirmDialogComponent } from '../../../../shared/components/cp-confirm-dialog/cp-confirm-dialog.component';

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

  private dialog = inject(MatDialog);

  onEditPost(post: Post): void {
    this.editPost.emit(post);
  }

  onDeletePost(post: Post): void {
    const dialogRef = this.dialog.open(CpConfirmDialogComponent, {
      data: {
        title: 'Excluir Post',
        message: `Tem certeza que deseja excluir o post "${post.title}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePost.emit(post);
      }
    });
  }
}
