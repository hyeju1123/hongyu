import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Voca from '../model/Voca';

Realm.copyBundledRealmFiles();

const realmConfig: Realm.Configuration = {
  schema: [Voca],
  path: 'bundle.realm',
};

export const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);
