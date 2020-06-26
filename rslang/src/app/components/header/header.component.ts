import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces';
import { UserBlockService } from '../../shared/services/user-block.service';
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SettingsComponent } from '../../modules/learning-mode/components/settings/settings.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User = null;

  constructor(
    private userBlockService: UserBlockService,
    private auth: AuthService,
    public dialog: MatDialog
  ) {
    this.userBlockService.updateUser.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

  openUserSettingDialog(): void {
    this.dialog.open(SettingsComponent, {
      width: '320px'
    });
  }
}
