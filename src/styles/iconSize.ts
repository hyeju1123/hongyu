import {getDisplaySize, DisplaySize} from './screen';

const handleSize = () => {
  // SMALL
  if (getDisplaySize() === DisplaySize.Small) {
    return {
      Hong: 45,
      serviceSectionWidth: 140,
      serviceSectionHeight: 85,
      category: 20,
      search: 12,
      vocaSectionLantern: 18,
      clock: 20,
      triangle: 25,
      smallTrianle: 20,
      smallVersionBookmark: 20,
      largeVersionBookmark: 45,
      smallVersionSound: 20,
      largeVersionSound: 30,
      pickCategoryClose: 4,
      checkBox: 10,
      questionSquare: 15,
      lock: 15,
      ox: 7,
      writingReset: 13,
    };
  }

  // LARGE
  if (getDisplaySize() === DisplaySize.Large) {
    return {
      Hong: 95,
      serviceSectionWidth: 160,
      serviceSectionHeight: 97,
      category: 25,
      search: 15,
      vocaSectionLantern: 25,
      clock: 25,
      triangle: 40,
      smallTrianle: 25,
      smallVersionBookmark: 22,
      largeVersionBookmark: 45,
      smallVersionSound: 22,
      largeVersionSound: 50,
      pickCategoryClose: 8,
      checkBox: 14,
      questionSquare: 25,
      lock: 25,
      ox: 10,
      writingReset: 20,
    };
  }

  // MEDIUM
  return {
    Hong: 60,
    serviceSectionWidth: 140,
    serviceSectionHeight: 85,
    category: 20,
    search: 15,
    vocaSectionLantern: 25,
    clock: 25,
    triangle: 40,
    smallTrianle: 25,
    smallVersionBookmark: 20,
    largeVersionBookmark: 45,
    smallVersionSound: 20,
    largeVersionSound: 50,
    pickCategoryClose: 8,
    checkBox: 14,
    questionSquare: 25,
    lock: 25,
    ox: 10,
    writingReset: 20,
  };
};

const iconSize = handleSize();
export default iconSize;
