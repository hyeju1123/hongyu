import {useEffect} from 'react';
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';
import Config from 'react-native-config';
import useToast from './toast';

const apiUrl = Config.POLLY_API_URL;

export default function Polly() {
  const {fireToast} = useToast();

  useEffect(() => {
    return () => {
      RNFetchBlob.session('polly').dispose();
    };
  }, []);

  const fetchPolly = async (level: number, hanzi: string) => {
    try {
      const url = await fetchPollyUrl(level, hanzi);
      const filePath = await fetchPollyAudio(url, hanzi);
      playAudio(filePath, error => {
        fireToast({
          text: error,
          icon: 'warning',
          remove: true,
        });
      });
    } catch (e) {
      fireToast({
        text: '재시도해주세요!',
        icon: 'warning',
        remove: true,
      });
    }
  };

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
    const sound = new Sound(path, Sound.DOCUMENT, error => {
      if (error) {
        errorCallback('음성 초기화 실패{"\n"} 재시도해주세요!');
      } else {
        sound.play(success => {
          sound.release();

          if (!success) {
            errorCallback('디코딩 실패{"\n"} 재시도해주세요!');
          }
        });
      }
    });
  };

  return {fetchPolly};
}
