import { StatsSpeakitGameItem, StatsMiniGamesItem, TypeRegExp } from './interfaces';

export type Group = 0|1|2|3|4|5;
export type Page = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29;
export type AggregatedFilter = {
  $and: AggregatedFilter[],
  $or?: never,
  $nor?: never,
  'userWord.optional.learned'?: never,
  'userWord.difficulty'?: never,
  userWord?: never,
  word?: never,
} | {
  $and?: never,
  $or: AggregatedFilter[],
  $nor?: never,
  'userWord.optional.learned'?: never,
  'userWord.difficulty'?: never,
  userWord?: never,
  word?: never,
} | {
  $and?: never,
  $or?: never,
  $nor: AggregatedFilter[],
  'userWord.optional.learned'?: never,
  'userWord.difficulty'?: never,
  userWord?: never,
  word?: never,
} | {
  $and?: never,
  $or?: never,
  $nor?: never,
  'userWord.optional.learned': boolean,
  'userWord.difficulty'?: never,
  userWord?: never,
  word?: never,
} | {
  $and?: never,
  $or?: never,
  $nor?: never,
  'userWord.optional.learned'?: never,
  'userWord.difficulty': difficulty | query | TypeRegExp,
  userWord?: never,
  word?: never,
} | {
  $and?: never,
  $or?: never,
  $nor?: never,
  'userWord.optional.learned'?: never,
  'userWord.difficulty'?: never,
  userWord: null | { $exists: true },
  word?: never,
} | {
  $and?: never,
  $or?: never,
  $nor?: never,
  'userWord.optional.learned'?: never,
  'userWord.difficulty'?: never,
  userWord?: never,
  word: string | query | TypeRegExp,
};

type difficulty = 'easy' | 'hard' | 'middle';

type query = {
  $not?: any,
  $in?: Array<string | RegExp>,
  $nin?: Array<string | RegExp>,
  $ne?: string,
  $exists?: boolean,
  optional?: string,
};

export type optional = {
  speakit: StatsSpeakitGameItem,
  audiocall?: never,
  'english-puzzle'?: never,
  sprint?: never,
  savannah?: never,
  'own-game'?: never,
} | {
  speakit?: never,
  audiocall: StatsMiniGamesItem,
  'english-puzzle'?: never,
  sprint?: never,
  savannah?: never,
  'own-game'?: never,
} | {
  speakit?: never,
  audiocall?: never,
  'english-puzzle': StatsMiniGamesItem,
  sprint?: never,
  savannah?: never,
  'own-game'?: never,
} | {
  speakit?: never,
  audiocall?: never,
  'english-puzzle'?: never,
  sprint: StatsMiniGamesItem,
  savannah?: never,
  'own-game'?: never,
} | {
  speakit?: never,
  audiocall?: never,
  'english-puzzle'?: never,
  sprint?: never,
  savannah: StatsMiniGamesItem,
  'own-game'?: never,
} | {
  speakit?: never,
  audiocall?: never,
  'english-puzzle'?: never,
  sprint?: never,
  savannah?: never,
  'own-game': StatsMiniGamesItem,
};
