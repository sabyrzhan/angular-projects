import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message?: string;
  name?: string;
  password?: string;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.name && this.password) {
      if (!this.authService.authenticate(this.name, this.password)) {
        this.message = 'Invalid name and/or password';
      } else {
        this.router.navigateByUrl(this.route.snapshot.queryParams.redirectTo);
      }
    }
  }
}
