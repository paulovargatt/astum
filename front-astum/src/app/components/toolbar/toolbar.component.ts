import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user:any;

  constructor(private token: TokenService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.token.getPayload();
    console.log(this.user)
  }

  logout(){
    this.token.deleteToken();
    this.router.navigate(['']);
  }

}
