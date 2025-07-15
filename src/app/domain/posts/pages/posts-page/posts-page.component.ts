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
        // TODO: Chamar o serviço para atualizar o post
        this.refresh$.next();
      }
    });
  }

  onPostDelete(_post: Post): void {
    console.log('Deletando post:', _post);
    // TODO: Chamar o serviço para deletar o post e atualizar a lista.
    this.refresh$.next();
  }

  onAddPost(): void {
    const dialogRef = this.dialog.open(PostFormDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // TODO: Chamar o serviço para criar o post
        this.refresh$.next();
      }
    });
  }
}
