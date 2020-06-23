import { Game } from './components/game/game.component';

export interface Games {
  [key: string]: Game;
}

export const GAMES: Games = {
  speakIt: {
    name: 'SpeakIt',
    link: 'speakit',
    description: 'Learn how to pronounce',
    background: 'assets/images/speakit.png',
  },
  puzzle: {
    name: 'English Puzzle',
    link: 'puzzle',
    description: 'Build an app from the available words',
    background:
      'assets/images/Download%20Woman%20Connecting%20Puzzle%20Pieces%20for%20free.png',
  },
  savanna: {
    name: 'Savanna',
    link: 'savanna',
    description: 'Choose the right word and get taller',
    background: 'assets/images/Savanna.jpg',
  },
  audioCall: {
    name: 'Audio Call',
    link: 'call',
    description: 'Listen and choose the right word.',
    background:
      'assets/images/audiocall.jpg',
  },
  sprint: {
    name: 'Sprint',
    link: 'sprint',
    description: 'Determine whether the word is translated correctly.',
    background: 'assets/images/Enterprise%20Design%20Sprints.png',
  },
  custom: {
    name: 'Custom Game',
    link: 'game',
    description: ' game we haven\'t invented yet.',
    background: 'assets/images/Serenity%20Illustration%20Series.jpg',
  },
};
