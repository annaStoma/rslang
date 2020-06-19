import { Game } from './components/game/game.component';

export interface Games {
  [key: string]: Game;
}

export const GAMES: Games = {
  speakIt: {
    name: 'SpeakIt',
    link: 'speakit',
    description: 'Learn how to pronounce',
    background: "url('src/assets/images/speakit.png')",
  },
  puzzle: {
    name: 'English Puzzle',
    link: 'puzzle',
    description: 'Build an app from the available words',
    background:
      "url('src/assets/images/Download Woman Connecting Puzzle Pieces for free.png')",
  },
  savanna: {
    name: 'Savanna',
    link: 'savanna',
    description: 'Choose the right word and get taller',
    background: "url('src/assets/images/Savanna.jpg')",
  },
  audioCall: {
    name: 'Audio Call',
    link: 'call',
    description: 'Listen and choose the right word.',
    background:
      "url('src/assets/images/People Talking Phone Men Women Calling Stock Vector (Royalty Free) 1432364213.jpg')",
  },
  sprint: {
    name: 'Sprint',
    link: 'sprint',
    description: 'Determine whether the word is translated correctly.',
    background: "url('src/assets/images/Enterprise Design Sprints.png')",
  },
  custom: {
    name: 'Custom Game',
    link: 'game',
    description: "A game we haven't invented yet.",
    background: "url('src/assets/images/Serenity Illustration Series.jpg')",
  },
};
