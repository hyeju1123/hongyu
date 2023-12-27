import {atom} from 'recoil';

export const realmState = atom({
  key: 'realm',
  default: {toggleByChange: false},
});
