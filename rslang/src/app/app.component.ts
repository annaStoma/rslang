import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { LocalstorageService } from './shared/services/localstorage.service';
import { UserBlockService } from './shared/services/user-block.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private localData: LocalstorageService,
    private userBlockService: UserBlockService
  ) {}

  ngOnInit(): void {
    const token = this.localData.getToken();
    const user = this.localData.getUser();

    if (token) {
      this.auth.setToken(token);
    }

    if (user) {
      this.userBlockService.setUser(user);
    }
  }
}
