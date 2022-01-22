import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';

import notificationAtoms from '../atoms/notification';

const useNotification = (delay = 5000) => {
  const value = useAtomValue(notificationAtoms.value);
  const show = useUpdateAtom(notificationAtoms.show);
  const hide = useUpdateAtom(notificationAtoms.hide);

  useEffect(() => {
    const timeout = setTimeout(() => {
      hide();
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return {
    value,
    show,
  };
};

export default useNotification;
