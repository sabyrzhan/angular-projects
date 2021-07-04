import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  subscription?: Subscription;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.authenticationEventResult.subscribe(isAuth => {
      this.router.navigate(['']);
    });
    this.logout();
  }

  logout(): void {
    this.authService.logout();
  }
}
