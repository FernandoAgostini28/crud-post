import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../models/posts-model';
import { PostService } from '../../services/posts.services';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AddPostButtonComponent } from '../../components/add-post-button/add-post-button.component';
import { MatDialog } from '@angular/material/dialog';
import { PostFormDialogComponent } from '../../components/post-form-dialog/post-form-dialog.component';
import { CpToastService } from '../../../../shared/components/cp-toast/cp-toast.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PostsListCardsComponent } from '../../components/posts-list-cards/posts-list-cards.component';
import { BreakpointService } from '../../../../core/services/breakpoint.service';

@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    PostsListCardsComponent,
    AddPostButtonComponent,
  ],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss',
})
export class PostsPageComponent implements OnInit {
  private postService = inject(PostService);
  private dialog = inject(MatDialog);
  private toastService = inject(CpToastService);
  private breakpointService = inject(BreakpointService);

  title = 'Posts';

  posts: Post[] = [];
  pageSize = 6;
  totalPosts = 0;
  pageIndex = 0;

  isHandset$: Observable<boolean>;
  public loading = false;

  constructor() {
    this.isHandset$ = this.breakpointService.screenSize$.pipe(
      map(({ isHandset }) => isHandset)
    );
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.postService.getPosts().subscribe((allPosts: Post[]) => {
      this.totalPosts = allPosts.length;
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.posts = allPosts.slice(startIndex, endIndex);
      this.loading = false;
    });
  }

  onPostEdit(post: Post): void {
    const dialogRef = this.dialog.open(PostFormDialogComponent, {
      width: '500px',
      data: { post: post },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postService.updatePost(result).subscribe(() => {
          this.loadPosts();
          this.toastService.open('Post atualizado com sucesso!');
        });
      }
    });
  }

  onPostDelete(post: Post): void {
    this.postService.deletePost(post.id).subscribe(() => {
      this.loadPosts();
      this.toastService.open('Post excluído com sucesso!');
    });
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
          this.loadPosts();
          this.toastService.open('Post criado com sucesso!');
        });
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPosts();
  }
}
