import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {

  user: any;
  following = [];

  constructor(private tokenService: TokenService,
              private userService: UsersService) { }

  ngOnInit() {
    this.user = this.tokenService.getPayload();
    this.getUser()
  }

  getUser(){
    this.userService.getUserById(this.user._id).subscribe(data => {
      this.following = data.result.following;
    })
  }

}
