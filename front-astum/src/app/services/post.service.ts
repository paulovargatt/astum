import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/astum';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) {

  }

  addPost(body): Observable<any> {
    return this.http.post(`${BASEURL}/post/add-post`, body);
  }

  getPosts() {
    return this.http.get(`${BASEURL}/posts/`);
  }

  addLike(body): Observable<any> {
    return this.http.post(`${BASEURL}/post/add-like`, body);
  }

  addComment(postId,comment): Observable<any> {
    return this.http.post(`${BASEURL}/post/add-comment`,{ postId, comment} );
  }

  getPostId(id){
    return this.http.get(`${BASEURL}/post/${id}`);
  }
}
