import { Component, OnInit } from '@angular/core';
import { CreateUserService } from '../../services/create-user.service';
import { WordsService } from '../../services/words.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-learning-mode',
  templateUrl: './learning-mode.component.html',
  styleUrls: ['./learning-mode.component.scss'],
})
export class LearningModeComponent implements OnInit {
  constructor(
    private createUserService: CreateUserService,
    private wordsService: WordsService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.createUserService
      .signIn({
        email: 'annstoma9@fgmail.com',
        password: 'Gfhjkm_123',
      })
      .subscribe((data) => {
        this.userDataService.setUserId = data.userId;
        this.userDataService.setUserToken = data.token;
        console.log(
          this.userDataService.getUserId,
          this.userDataService.getUserToken
        );
        this.wordsService
          .getSettings(
            this.userDataService.getUserId,
            this.userDataService.getUserToken
          )
          .subscribe((data) => console.log(data));
        // this.wordsService
        //   .getUserWords(data.userId, data.token)
        //   .subscribe((data) => console.log(data));
      });
  }
}
