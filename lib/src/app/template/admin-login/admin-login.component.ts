import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// const jwt  = require("") ;
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  public model: any = {};
  response: any;
  constructor(
    private _apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  signin() {
    console.log('login.component.ts: sign() called');
    this._apiService.loginAdmin(this.model).subscribe({
      next: (data) => {
        console.log('Successfull', data);
        this.response = data;
        console.log('Response: ', this.response.message);
        //check the response message
        if (this.response.message === 'authenticated') {
          this.toastr.success('Success');
          localStorage.setItem('token', data['token']);
          let decodedTOken: any = jwt_decode(data.token);
          localStorage.setItem('user_type', decodedTOken.role);
          localStorage.setItem('uuid', decodedTOken.id);
          this.router.navigate(['admin/dash']) ; 
        }
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error in login.component.ts');
      },
    });
  }
}