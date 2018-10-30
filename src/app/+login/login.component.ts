import { Component, OnInit } from '@angular/core';
import { SignService } from '../services/sign.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * User Email
   */
  email = '';

  /**
   * User Password
   */
  password = '';

  constructor(private signService: SignService) { }

  ngOnInit() {
  }

  signIn() {
    this.signService.signIn(this.email,this.password).then((data)=>{});
  }
}
