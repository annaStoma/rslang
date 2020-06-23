import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces';
import { UserBlockService } from '../../shared/services/user-block.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User = null;

  constructor(private userBlockService: UserBlockService) {
    this.userBlockService.updateUser.subscribe((user) => {
      console.log(user);
    });
  }

  ngOnInit(): void {}
}
