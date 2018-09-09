import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import _ from 'lodash';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  constructor(private userService: UsersService,
              private tokenService: TokenService
              ) {
  }

  users = [];
  loggedUser: any;

  ngOnInit() {
    this.loggedUser = this.tokenService.getPayload();
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      console.log(data);
      _.remove(data.result, {username: this.loggedUser.username});

      this.users = data.result;
    });
  }

}
