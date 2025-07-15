// src/app/core/services/post.service.ts

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post } from '../models/posts-model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private mockUrl = 'db.json';

  getPosts(): Observable<Post[]> {
    return this.http
      .get<{ posts: Post[] }>(this.mockUrl)
      .pipe(
        map((response) =>
          response.posts.map(
            (item) =>
              new Post(item.id, item.title, item.description, item.photo)
          )
        )
      );
  }
}
