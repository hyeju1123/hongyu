import {useCallback, useState} from 'react';
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';
import Config from 'react-native-config';
import useToast from './toast';
import useDebounce from './debounce';
import useDidMountEffect from './didMount';
import {ToastIcon} from '../recoil/ToastState';
import {Platform} from 'react-native';

const apiUrl = Config.POLLY_API_URL;
Sound.setCategory('Playback');

export default function Polly() {
  const {fireToast} = useToast();

  const [toggle, setToggle] = useState({word: '', level: 1});
  const debouncedSoundToggle = useDebounce(toggle, 300);

  useDidMountEffect(() => {
    fetchPolly(toggle.level, toggle.word);
  }, [debouncedSoundToggle]);

  const fetchPolly = useCallback(
    async (level: number, hanzi: string) => {
      try {
        const url = await fetchPollyUrl(level, hanzi);
        const filePath = await fetchPollyAudio(url, hanzi);
        playAudio(filePath, error => {
          fireToast({
            text: error,
            icon: ToastIcon.AbNormal,
            remove: true,
          });
        });
      } catch (e) {
        fireToast({
          text: '재시도해주세요!',
          icon: ToastIcon.AbNormal,
          remove: true,
        });
      }
    },
    [fireToast],
  );

  const clearMp3File = useCallback(() => {
    const documentDir = RNFetchBlob.fs.dirs.DocumentDir;
    RNFetchBlob.fs
      .ls(documentDir)
      .then(files => {
        const mp3Files = files.filter(file => file.endsWith('.mp3'));

        mp3Files.forEach(async mp3File => {
          try {
            const filePath = `${documentDir}/${mp3File}`;
            await RNFetchBlob.fs.unlink(filePath);
          } catch (e) {
            fireToast({
              text: '음성 파일을 삭제하는 데 실패했습니다',
              icon: ToastIcon.AbNormal,
              remove: true,
            });
          }
        });
      })
      .catch(() => {
        fireToast({
          text: '음성 파일을 삭제하는 데 실패했습니다',
          icon: ToastIcon.AbNormal,
          remove: true,
        });
      });
  }, [fireToast]);

  const fetchPollyUrl = async (level: number, hanzi: string) => {
    const res = await fetch(`${apiUrl}/${level}/${hanzi}`);
    const {url} = await res.json();
    return url;
  };

  const fetchPollyAudio = async (url: string, hanzi: string) => {
    let dirs = RNFetchBlob.fs.dirs;
    let path = `${dirs.DocumentDir}/${hanzi}.mp3`;
    const isExist = await RNFetchBlob.fs.exists(path);

    if (!isExist) {
      path = (
        await RNFetchBlob.config({
          path,
          fileCache: true,
          session: 'polly',
        }).fetch('GET', url)
      ).path();
    }

    return path;
  };

  const playAudio = (path: string, errorCallback: (e: string) => void) => {
    const bundle = Platform.OS === 'ios' ? '' : Sound.DOCUMENT;
    const sound = new Sound(path, bundle, error => {
      if (error) {
        errorCallback('음성 초기화 실패\n 재시도해주세요!');
      } else {
        sound.play(success => {
          sound.release();

          if (!success) {
            errorCallback('디코딩 실패\n 재시도해주세요!');
          }
        });
      }
    });
  };

  return {setToggle, clearMp3File};
}
