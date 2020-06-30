import { Word } from '../../../../../shared/interfaces';

export interface WordSpeakit extends Word{
  learned: boolean;
}

export interface ResultList {
  [key: string]: number;
}
