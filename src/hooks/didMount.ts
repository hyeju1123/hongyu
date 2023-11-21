import {useEffect, useRef, DependencyList} from 'react';

type EffectFunction = () => void;
type CleanupFunction = () => void;

function useDidMountEffect(
  func: EffectFunction,
  deps: DependencyList,
  clean?: CleanupFunction,
) {
  const didMount = useRef(false);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
    return () => {
      clean && clean();
    };
  }, deps);
}

export default useDidMountEffect;
