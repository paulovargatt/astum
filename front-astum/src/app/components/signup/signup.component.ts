import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],

})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  showSpinner = false;

  constructor(private authService: AuthService,
              private router: Router,
              private tokenService: TokenService,
              private formBuild: FormBuilder) { }

  ngOnInit() {
   this.init()
  }

  init() {
    this.signupForm = this.formBuild.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  signupUser() {
    this.showSpinner = true;

    this.authService.registerUser(this.signupForm.value).subscribe((data) => {
      this.tokenService.setToken(data.token);
      this.signupForm.reset();
      setTimeout(() => {
        this.router.navigate(['streams']);
      }, 1000);
    }, err => {
      this.showSpinner = false
    })
  }


}
