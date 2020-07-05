export enum KEY_CODE {
  NUMBER_ONE = 1,
  NUMBER_TWO = 2,
  NUMBER_THREE = 3,
  NUMBER_FOUR = 4,
}

export enum CARD_NUMBER {
  FIRST = 0,
  SECOND = 1,
  THIRD = 2,
  FOURTH = 3,
}

export const MAX_NUMBER = {
  LEVEL: 6,
  PAGE: 30,
}

export const AUDIO_NAMES = {
  ERROR: 'error',
  FAILURE: 'failure',
  SUCCESS: 'succes',
  CORRECT: 'correct',
};

export const SAVANNAH_DEFAULT_VALUES = {
  livesArray: [1, 1, 1, 1, 1],
  isHiddenDescription: false,
  isHiddenLoader: true,
  isHiddenButton: false,
  isHiddenFinalScreen: true,
  isAnimationStart: true,
  isAnimationEnd: true,
  isAnimationBullet: false,
  isSoundSelected: true,
}

export const SAVANNAH_START_VALUES = {
  isHiddenDescription: true,
  isHiddenButton: true,
  isHiddenLoader: false,
  lives: 5,
  mistakes: 0,
  rightWords: 0,
  isHiddenFinalScreen: true,
  livesArray: [1, 1, 1, 1, 1],
}
