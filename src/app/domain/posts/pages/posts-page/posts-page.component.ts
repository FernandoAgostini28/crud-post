import { Component, inject } from '@angular/core';
import { PostsListCardsComponent } from '../../components/posts-list-cards/posts-list-cards.component';
import { Post } from '../../models/posts-model';
import { PostService } from '../../services/posts.services';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AddPostButtonComponent } from '../../components/add-post-button/add-post-button.component';
import { MatDialog } from '@angular/material/dialog';
import { PostFormDialogComponent } from '../../components/post-form-dialog/post-form-dialog.component';

@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [PostsListCardsComponent, CommonModule, AddPostButtonComponent],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss',
})
export class PostsPageComponent {
  private postService = inject(PostService);
  private dialog = inject(MatDialog);
  title = 'Posts';

  private refresh$ = new BehaviorSubject<void>(undefined);

  posts$: Observable<Post[]> = this.refresh$.pipe(
    switchMap(() => this.postService.getPosts())
  );

  onPostEdit(post: Post): void {
    const dialogRef = this.dialog.open(PostFormDialogComponent, {
      width: '500px',
      data: { post: post },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postService.updatePost(result).subscribe(() => {
          this.refresh$.next();
        });
      }
    });
  }

  onPostDelete(post: Post): void {
    if (confirm(`Tem certeza que deseja excluir o post "${post.title}"?`)) {
      this.postService.deletePost(post.id).subscribe(() => {
        this.refresh$.next();
      });
    }
  }

  onAddPost(): void {
    const dialogRef = this.dialog.open(PostFormDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { ...newPost } = result;
        this.postService.addPost(newPost).subscribe(() => {
          this.refresh$.next();
        });
      }
    });
  }
}
