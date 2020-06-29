import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class GetLearningWordsService {
  constructor(private apiService: ApiService) {}

  getLearningWords() {
    this.apiService.getUserWords()
  }
}
