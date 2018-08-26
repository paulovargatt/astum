import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts = [];
  public socket;
  user: any;

  constructor(private postsService: PostService,
              private tokenService: TokenService,
              private router: Router

  ) {
    this.socket = io('http://localhost:3000')
  }

  ngOnInit() {
    this.user = this.tokenService.getPayload();

    this.allPosts();

    this.socket.on('refreshPage', (data) => {
      this.allPosts();
    });
  }

  allPosts(){
    this.postsService.getPosts().subscribe((data) => {
      let ret = (data as any);
      this.posts = ret.posts;
    }, err => {
      if(err.error.token === null){
        this.tokenService.deleteToken();
        this.router.navigate(['/'])
      }
    });
  }

  likePost(post){
    this.postsService.addLike(post).subscribe(data => {
      console.log(data);
      this.socket.emit('refresh', {});
    },err => {
      console.log(err)
    })
  }

  checkInLikesArray(arr, username){
    return _.some(arr, {username: username})
  }

  timeFromNow(time){
    moment.locale('pt-br');
    return moment(time).fromNow();
  }

  openCommentBox(post){
    this.router.navigate(['post', post._id]);
  }


}
