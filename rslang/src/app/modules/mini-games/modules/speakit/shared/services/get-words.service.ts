import { Injectable } from '@angular/core';
import { WordSpeakit } from '../interfaces';
import { Word } from '../../../../../../shared/interfaces';

@Injectable()
export class GetWordsService {

  getMix(words: Word[]): WordSpeakit[] {
    const keys = Object.keys(words);

    while (keys.length) {
      const idx = Math.floor(Math.random() * keys.length);
      const x = +keys[idx];
      keys.splice(idx, 1);
      const idx2 = Math.floor(Math.random() * keys.length);
      const y = +keys[idx2];
      keys.splice(idx2, 1);
      [words[x], words[y]] = [words[y], words[x]];
    }
    return words.slice(-10).map((w: Word) => ({
      id: w.id,
      word: w.word,
      image: w.image,
      audio: w.audio,
      audioMeaning: w.audioMeaning,
      audioExample: w.audioExample,
      textMeaning: w.textMeaning,
      textExample: w.textExample,
      transcription: w.transcription,
      wordTranslate: w.wordTranslate,
      learned: false
    }));
  }

  filter(neededWords: string[], words: Word[]): WordSpeakit[] {
    const filteredWords = words.filter(w => neededWords.includes(w.word));
    return this.getMix(filteredWords);
  }
}
