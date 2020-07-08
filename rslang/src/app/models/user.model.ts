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
    explantation: boolean;
    exampleText: boolean;
    transcription: boolean;
    association: boolean;
  };
}

export interface UsersWords {
  id: string;
  difficulty: string;
  wordId: string;
}
