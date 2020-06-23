import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces';
import { UserBlockService } from '../../shared/services/user-block.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User = null;

  constructor(
    private userBlockService: UserBlockService,
    private auth: AuthService
  ) {
    this.userBlockService.updateUser.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  logout() {
    this.auth.logout();
  }
}
