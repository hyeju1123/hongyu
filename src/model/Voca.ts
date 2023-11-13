import Realm, {ObjectSchema} from 'realm';

export default class Voca extends Realm.Object<Voca> {
  _id!: number;
  word!: string;
  meaning!: string;
  intonation!: string;
  wordclass!: string;
  level!: number;
  theme!: string;
  explanation?: string;
  bookmarked!: boolean;

  static schema: ObjectSchema = {
    name: 'Voca',
    properties: {
      _id: 'int',
      word: 'string',
      meaning: 'string',
      intonation: 'string',
      wordclass: 'string',
      level: 'int',
      theme: 'string',
      explanation: 'string?',
      bookmarked: 'bool',
    },
    primaryKey: '_id',
  };
}
