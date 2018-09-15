import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import _ from 'lodash';
import { TokenService } from '../../services/token.service';
import io from 'socket.io-client'


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  socket: any;
  users = [];
  loggedUser: any;

  constructor(private userService: UsersService,
              private tokenService: TokenService
              ) {

    this.socket = io('http://localhost:3000');

  }



  ngOnInit() {
    this.loggedUser = this.tokenService.getPayload();
    this.getUsers();
    this.getUser();

    this.socket.on('refreshPage', () => {
      this.getUsers();
      this.getUser()
    })
  }


  getUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      console.log(data);
      _.remove(data.result, {username: this.loggedUser.username});

      this.users = data.result;
    });
  }

  followUser(user){
    this.userService.followUser(user._id).subscribe((data) => {
       this.socket.emit('refresh', {})
    })
  }


  public userArr;

  getUser(){
    this.userService.getUserById(this.loggedUser._id).subscribe((data) => {
      console.log(data)
      this.userArr = data.result.following
    })
  }

  checkInArray(arr, id){
    const result = _.find(arr, ['userFollowed._id', id]);
    console.log(result,arr,id, 'result cHCEK')
    if(result){
      return true;
    }else{
      return false;
    }
  }
}
