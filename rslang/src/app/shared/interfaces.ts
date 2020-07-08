export interface Game {
  name: string;
  url: string;
  image: string;
}

export interface UserCreate {
  name?: string;
  email: string;
  password: string;
}

export interface UserUpdate extends UserCreate {}

export interface UserCreateResponse {
  name?: string;
  email: string;
  id: string;
}
export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export interface UserUpdateResponse extends UserCreateResponse {}

export interface LoginResponse {
  message: string;
  token: string;
  userId: string;
  name: string;
  email: string;
  refreshToken: string;
}

export interface AuthData {
  token: string | null;
  userId: string | null;
  refreshToken: string | null;
}

export interface UsersWords {
  difficulty: string;
  optional: {
    learned: boolean;
  };
}

export interface Word {
  id?: string;
  group?: number;
  page?: number;
  word?: string;
  image?: string;
  audio?: string;
  audioMeaning?: string;
  audioExample?: string;
  textMeaning?: string;
  textExample?: string;
  transcription?: string;
  textExampleTranslate?: string;
  textMeaningTranslate?: string;
  wordTranslate?: string;
  wordsPerExampleSentence?: number;
}

export interface GameTranslateItem {
  word: string
  wordTranslate: string;
  index?: number;
  isDisabled?: boolean;
  audio?: string;
}

export interface SprintResult {
  historyOfAnswers?: boolean[],
  countOfCorrect?: number,
  countCorrectInRow?:number,
  totalScore?: number,
}

export interface AggregatedWord extends Word {
  userWord?: UsersWords;
  _id: string;
}
export interface AggregatedWordResponse {
  paginatedResults: Array<AggregatedWord>;
  totalCount: Array<{ count: number }>;
}


export interface UserStatistic {
  learnedWords: number;
  optional: {
    speakit?: string;
  };
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

export interface TypeRegExp {
  $regex: RegExp | string;
  $options?: string;
}
