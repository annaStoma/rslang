export interface User {
  id?: string;
  userName: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface UserSettings {
  wordsPerDay: number;
  optional: {
    maxWords: number;
    translation: boolean;
    explanation: boolean;
    exampleText: boolean;
    transcription: boolean;
    association: boolean;
    textExampleTranslate: boolean;
    textMeaningTranslate: boolean;
    autoPlay: boolean;
    group: number;
  };
}

export interface UsersWords {
  id: string;
  difficulty: string;
  wordId: string;
}
