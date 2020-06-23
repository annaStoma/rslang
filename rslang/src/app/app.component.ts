import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { LocalstorageService } from './shared/services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private localData: LocalstorageService
  ) {}

  ngOnInit(): void {
    const token = this.localData.getToken();

    if (token) {
      this.auth.setToken(token);
    }
  }
}
