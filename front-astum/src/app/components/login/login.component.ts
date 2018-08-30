import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  showSpiner = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenService: TokenService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser() {
    this.showSpiner = true;
    this.auth.loginUser(this.loginForm.value).subscribe((data) => {
        let response = (data as any);
        this.tokenService.setToken(response.token);
        this.loginForm.reset();
        setTimeout(() => {
          this.router.navigate(['streams']);
        }, 1000);
    },
    err => {
      this.showSpiner = false;
    });
  }

}
