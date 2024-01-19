import {atom} from 'recoil';

export enum WordNav {
  Voca = 'voca',
  Book = 'book',
  Busu = 'busu',
}

export enum BookedNav {
  Voca = 'voca',
  Busu = 'busu',
}

export const wordNavState = atom<{navType: WordNav; level: number}>({
  key: 'wordNavType',
  default: {navType: WordNav.Voca, level: 1},
});

export const bookedNavState = atom<{
  bookedNavType: BookedNav;
  bookedLevel: number;
}>({
  key: 'bookedNv',
  default: {bookedNavType: BookedNav.Voca, bookedLevel: 1},
});
