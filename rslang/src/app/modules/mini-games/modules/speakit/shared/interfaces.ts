export interface WordSpeakit {
  id: string;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  learned: boolean;
}

export interface ResultList {
  [key: string]: number;
}

export interface StatsWords {
  date: number;
  words: string[];
  group: number;
  page: number;
  progress: number;
}
