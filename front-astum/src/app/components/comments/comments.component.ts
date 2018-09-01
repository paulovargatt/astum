import { PostService } from './../../services/post.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [
    PostService
  ]
})

export class CommentsComponent implements OnInit, AfterContentInit {

  toolbarElement: any;
  commentForm: any;
  commentsArray;
  socket: any;
  postId: any;
  post: string;

  constructor(private fb: FormBuilder,
              private postService: PostService,
              private route: ActivatedRoute
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });

    this.getPost();
    this.socket.on('refreshPage', (data) => {
      this.getPost();
    })

  }

  ngAfterContentInit() {

  }

  addComment() {
   if( this.commentForm.value.comment.length > 1){
    this.postService.addComment(this.postId, this.commentForm.value.comment).subscribe((data) => {
      this.socket.emit('refresh', {});
      this.commentForm.reset();
    });
   }
  }

  getPost() {
    this.postService.getPostId(this.postId).subscribe((data) => {
      let response = (data as any);
      this.post = response.post.post;
      this.commentsArray = response.post.comments.reverse();
    });
  }

  timeFromNow(time){
    moment.locale('pt-br');
    return moment(time).fromNow();
  }

}
