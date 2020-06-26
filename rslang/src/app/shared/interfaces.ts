export interface Game {
  name: string;
  url: string;
  image: string;
}

export interface UserCreate {
  userName?: string;
  email: string;
  password: string;
}

export interface UserUpdate extends UserCreate {}

export interface UserCreateResponse {
  userName?: string;
  email: string;
  id: string;
}

export interface UserUpdateResponse extends UserCreateResponse {}

export interface LoginResponse {
  message: string;
  token: string;
  userId: string;
  name: string;
  email: string;
}

export interface AuthData {
  token: string | null;
  userId: string | null;
}

export interface UsersWords {
  difficulty: string;
  optional: object;
}

export interface Word {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  wordsPerExampleSentence: number;
}

export interface AggregatedWord extends Word {
  userWord?: UserWordById;
}
export interface AggregatedWordResponse {
  paginatedResults: Array<AggregatedWord>;
  totalCount: Array<{ count: number }>;
}

export interface UserWordById {
  difficulty: string;
  optional?: object;
}

export interface UserStatistic {
  learnedWords: number;
  optional: object;
}

export interface UserSetting {
  wordsPerDay: number;
  optional: object;
}

export interface UserData {
  learningWords: string[];
  hardWords: string[];
  deletedWords: string[];
}

export interface AggregatedFilter {
  $and?: Array<AggregatedFilterItem>;
  $or?: Array<AggregatedFilterItem>;
  userWord: null | true | false;
}

interface AggregatedFilterItem {
  [key: string]: string | [];
}

export interface User {
  name: string;
  email: string;
}

export interface Games {
  speakIt: GameItem;
  puzzle: GameItem;
  savannah: GameItem;
  audioCall: GameItem;
  sprint: GameItem;
  ownGame: GameItem;
}

export interface GameItem {
  name: string;
  link: string;
  description: string;
  background: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
