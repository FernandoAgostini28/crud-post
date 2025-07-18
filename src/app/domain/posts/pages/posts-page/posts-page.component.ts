import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../models/posts-model';
import { PostService } from '../../services/posts.services';
import { map, Observable, take, shareReplay, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AddPostButtonComponent } from '../../components/add-post-button/add-post-button.component';
import { MatDialog } from '@angular/material/dialog';
import { PostFormDialogComponent } from '../../components/post-form-dialog/post-form-dialog.component';
import { CpToastService } from '../../../../shared/components/cp-toast/cp-toast.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PostsListCardsComponent } from '../../components/posts-list-cards/posts-list-cards.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  private breakpointObserver = inject(BreakpointObserver);

  title = 'Posts';
  isHandset$: Observable<boolean>;
  public loading = false;

  desktopPosts: Post[] = [];
  desktopTotalPosts = 0;
  desktopPageIndex = 0;
  desktopPageSize = 6;

  mobilePosts: Post[] = [];
  mobileLastPostId: number | string | null = null;
  loadingMore = false;
  mobilePageSize = 6;

  constructor() {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => matches),
      tap((isHandset) => {
        this.resetAndLoadData(isHandset);
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  resetAndLoadData(isHandset: boolean): void {
    this.loading = true;
    if (isHandset) {
      this.mobilePosts = [];
      this.mobileLastPostId = null;
      this.loadMobilePosts();
      return;
    }
    this.desktopPosts = [];
    this.desktopPageIndex = 0;
    this.loadDesktopPosts();
  }

  loadDesktopPosts(): void {
    this.loading = true;
    this.postService.getPostsWithCursor(999999).subscribe((response) => {
      if (
        !Array.isArray(response) &&
        !(response && Array.isArray(response.posts))
      ) {
        console.error(
          'Unexpected response format for desktop posts:',
          response
        );
        this.loading = false;
        return;
      }

      const allPosts: Post[] = Array.isArray(response)
        ? response
        : response.posts;

      this.desktopTotalPosts = allPosts.length;
      const startIndex = this.desktopPageIndex * this.desktopPageSize;
      const endIndex = startIndex + this.desktopPageSize;

      this.desktopPosts = allPosts.slice(startIndex, endIndex);
      this.loading = false;
    });
  }

  onPageChange(event: PageEvent): void {
    this.desktopPageIndex = event.pageIndex;
    this.desktopPageSize = event.pageSize;
    this.loadDesktopPosts();
  }

  private setInitialLoadingState(loadMore: boolean): void {
    if (loadMore) {
      this.loadingMore = true;
      return;
    }
    this.loading = true;
  }

  loadMobilePosts(loadMore = false): void {
    if (this.loadingMore || this.mobileLastPostId === 'final') {
      return;
    }

    this.setInitialLoadingState(loadMore);

    this.postService
      .getPostsWithCursor(
        this.mobilePageSize,
        this.mobileLastPostId === null ? undefined : this.mobileLastPostId
      )
      .subscribe((response) => {
        const resetLoadingFlags = () => {
          if (loadMore) {
            this.loadingMore = false;
            return;
          }
          this.loading = false;
        };

        if (
          !Array.isArray(response) &&
          !(response && Array.isArray(response.posts))
        ) {
          console.error(
            'Unexpected response format for mobile posts:',
            response
          );
          resetLoadingFlags();
          return;
        }

        if (response.lastPostId === 'final') {
          this.mobileLastPostId = 'final';
          resetLoadingFlags();
          return;
        }

        const allPosts: Post[] = Array.isArray(response)
          ? response
          : response.posts;

        const newPosts = allPosts.filter((post) => {
          return (
            this.mobileLastPostId === null ||
            (typeof this.mobileLastPostId === 'number' &&
              Number(post.id) > this.mobileLastPostId)
          );
        });

        this.mobilePosts = loadMore
          ? [...this.mobilePosts, ...newPosts]
          : newPosts;

        this.mobileLastPostId = response.lastPostId;

        resetLoadingFlags();
      });
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if (
      !this.loadingMore &&
      this.mobileLastPostId !== 'final' &&
      element.scrollHeight - element.scrollTop < element.clientHeight + 200
    ) {
      this.loadMobilePosts(true);
    }
  }

  onAddPost(): void {
    const dialogRef = this.dialog.open(PostFormDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newPostWithId = { ...result, id: Date.now().toString() };
        this.postService.addPost(newPostWithId).subscribe(() => {
          this.toastService.open('Post criado com sucesso!');
          this.isHandset$
            .pipe(take(1))
            .subscribe((isHandset) => this.resetAndLoadData(isHandset));
        });
      }
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
          this.toastService.open('Post atualizado com sucesso!');
          this.isHandset$
            .pipe(take(1))
            .subscribe((isHandset) => this.resetAndLoadData(isHandset));
        });
      }
    });
  }

  onPostDelete(post: Post): void {
    this.postService.deletePost(post.id).subscribe(() => {
      this.toastService.open('Post excluído com sucesso!');
      this.isHandset$
        .pipe(take(1))
        .subscribe((isHandset) => this.resetAndLoadData(isHandset));
    });
  }
}
