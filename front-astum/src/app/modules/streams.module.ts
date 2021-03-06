import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import {ToolbarComponent} from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import { PostService } from '../services/post.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from '../components/comments/comments.component';
import { RouterModule } from '@angular/router';
import { PeopleComponent } from '../components/people/people.component';
import {SideThreeComponent} from '../components/side-three/side-three.component';
import { UsersService } from '../services/users.service';
import { FollowingComponent } from '../components/following/following.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [StreamsComponent,ToolbarComponent,SideThreeComponent, SideComponent, PostFormComponent, PostsComponent, CommentsComponent, PeopleComponent, FollowingComponent],
  exports: [StreamsComponent,ToolbarComponent],
  providers:[
    TokenService,
    PostService,
    UsersService
  ]
})
export class StreamsModule { }
