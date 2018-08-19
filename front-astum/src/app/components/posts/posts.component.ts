import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import * as moment from 'moment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts = [];

  constructor(private postsService: PostService) { }

  ngOnInit() {
    this.allPosts()
  }

  allPosts(){
    this.postsService.getPosts().subscribe((data) => {
      let ret = (data as any);
      this.posts = ret.posts;
    })
  }

  timeFromNow(time){
    moment.locale('pt-br');
    return moment(time).fromNow();
  }
}
