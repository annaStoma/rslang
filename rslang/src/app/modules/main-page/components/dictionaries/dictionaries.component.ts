import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss']
})
export class DictionariesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToDeleted(vocabulary: string): void{
    this.router.navigate(['/vocabulary'], { queryParams: {voc: `${vocabulary}`} });
  }

  goToLearningNewWords(): void{
    this.router.navigate(['/learning']);
  }
}
