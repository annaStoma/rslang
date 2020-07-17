import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

import { AuthService } from './shared/services/auth.service';
import { LocalDataService } from './shared/services/local-data.service';
import { UserBlockService } from './shared/services/user-block.service';
import { ApiService } from './shared/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private localData: LocalDataService,
    private userBlockService: UserBlockService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    const token = this.localData.getToken();
    const refreshToken = this.localData.getRefreshToken();
    const user = this.localData.getUser();
    const userId = this.localData.getUserId();

    if (token) {
      this.auth.setToken(token);
    }

    if (refreshToken) {
      this.auth.setRefreshToken(refreshToken);
    }

    if (user) {
      this.userBlockService.setUser(user);
    }

    if (userId) {
      this.apiService.setUserId(userId);
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe(data => {
        this.titleService.setTitle(data.title);
      });
    });
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
