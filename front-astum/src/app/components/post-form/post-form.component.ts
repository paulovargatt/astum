import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  socketHost: any;
  socket: any;
  postForm: FormGroup;

  constructor(private fb: FormBuilder,
              private postService: PostService
              ) {
    this.socketHost = 'http://localhost:3000';
    this.socket = io(this.socketHost)
  }



  ngOnInit() {
    this.postForm = this.fb.group({
      post: ['', Validators.required]
    })
  }

  submitPost(){
    this.postService.addPost(this.postForm.value).subscribe(data => {
      this.socket.emit('refresh', {data: 'event test'});
      this.postForm.reset();
    });
  }

}
