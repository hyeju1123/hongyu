import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Voca from '../model/Voca';
import Busu from '../model/Busu';

Realm.copyBundledRealmFiles();

const realmConfig: Realm.Configuration = {
  schema: [Voca, Busu],
  path: 'bundle.realm',
};

export const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);
