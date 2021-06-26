import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  message?: string;
  name?: string;
  password?: string;
  subscription?: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.authService.authenticationEventResult.subscribe(isAuth => {
      if (!isAuth) {
        this.message = 'Invalid name and/or password';
      } else {
        this.router.navigateByUrl(this.route.snapshot.queryParams.redirectTo);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.name && this.password) {
      this.authService.authenticate(this.name, this.password);
    }
  }
}
