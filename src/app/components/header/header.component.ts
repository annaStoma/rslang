import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openLogin() {
    this.dialog.open(AuthorizationComponent);
  }

  openRegistration() {
    this.dialog.open(RegisterComponent);
  }
}
