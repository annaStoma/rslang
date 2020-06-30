import { Injectable } from '@angular/core';

@Injectable()
export class SpeechRecognitionService {

  private recognition: SpeechRecognition;

  constructor() {}

  listen(response, speechstart): void {
    window.SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    this.recognition = new window.SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 20;

    const resultList = {};

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

      // outputWord.value = '';
      // this.heardAs.innerHTML = '';
      // const keys = Object.keys(result);
      // let percent;

      // this.inputs.forEach(input => {
      //   keys.forEach(str => {
      //     if (str === input.value) {
            // if (this.correct.includes(str)) {
            //   isRecognized = false;
            // } else {
              // this.correct.push(str);
              // currentGame.forEach(el => {
              //   if (el.word === str) {
              //     el.done = 'ok';
              //   }
              // });
              // this.updateLocalStorage(currentGame);
              // this.setLocalStorageCurrentGame(currentGame);
              // cardImage.style.backgroundImage = `url(${input.parentNode.dataset.image})`;
              // percent = result[str] * 100;
              // outputWord.value = `${input.value} (${percent ? parseInt(percent, 10) : '<5'})%`;
          //   }
          // }
        // });
      // });

      // if (isRecognized) {
      //   let tempKey = 0;
      //   let tempValue;
      //   for (const k in result) {
      //     const curPercent = result[k] * 100;
      //     if (curPercent > tempKey) {
      //       tempKey = curPercent;
      //       tempValue = k;
      //     }
      //   }

        // outputWord.value = outputWord.value || 'not recognized';

        // if (!percent || percent < tempKey) {
        //   this.heardAs.innerHTML = tempValue ? `heard as "${tempValue}" (${parseInt(tempKey, 10)})%` : '';
        // }
      // }

      // isRecognized = true;
      // result = null;
      // result = {};

      // this.recognition.start();
    });
  }

  off(): void {

  }
}
