import {useEffect, useRef} from 'react';

/**
 * useIsMounted hook will indicate if the component is mounted or not
 * we can use it generally, after an await of an async call and especially if there's a setState after it
 */
export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    // On Component mount set the value to true
    isMounted.current = true;

    return () => {
      // On Component un-mount set the value to false
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};
