import { Injectable } from '@angular/core';
import { ResultList } from '../interfaces';

@Injectable()
export class SpeechRecognitionService {

  private recognition: SpeechRecognition;

  constructor() {}

  listen(response, speechstart): SpeechRecognition {
    window.SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    this.recognition = new window.SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 20;

    const resultList: ResultList = {};

    this.recognition.addEventListener('result', (e: SpeechRecognitionEvent) => {
      const results = Array.from(e.results);
      results.forEach((el: SpeechRecognitionResult) => {
        if (el.isFinal) {
          const resultItem = Array.from(el);
          resultItem.forEach(item => {
            const key = item.transcript.toLowerCase();
            resultList[key] = item.confidence;
          });
        }
      });
    });

    this.recognition.start();
    this.recognition.addEventListener('speechstart', speechstart);

    this.recognition.addEventListener('end', () => {
      response(resultList);
    });
    return this.recognition;
  }
}
