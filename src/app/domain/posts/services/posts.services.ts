import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/posts-model';

export interface PostsResponse {
  posts: Post[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = '/api/posts';

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostsWithCursor(
    limit: number,
    lastPostId?: number | string
  ): Observable<{ posts: Post[]; lastPostId: number | string }> {
    let params = `?limit=${limit}`;
    if (lastPostId) {
      params += `&lastPostId=${lastPostId}`;
    }
    return this.http.get<{ posts: Post[]; lastPostId: number | string }>(
      `${this.apiUrl}${params}`
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  updatePost(post: Post): Observable<Post> {
    const url = `${this.apiUrl}/${post.id}`;
    return this.http.put<Post>(url, post);
  }

  deletePost(postId: number | string): Observable<void> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.delete<void>(url);
  }
}
