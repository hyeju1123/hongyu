import Realm, {ObjectSchema} from 'realm';

export default class Busu extends Realm.Object<Busu> {
  _id!: number;
  stroke!: number;
  busu!: string;
  yin!: string;
  xunyin!: string;
  sample!: string;
  explanation!: string;
  bookmarked!: boolean;

  static schema: ObjectSchema = {
    name: 'Busu',
    properties: {
      _id: 'int',
      stroke: 'int',
      busu: 'string',
      yin: 'string',
      xunyin: 'string',
      sample: 'string',
      explanation: 'string',
      bookmarked: 'bool',
    },
    primaryKey: '_id',
  };
}
