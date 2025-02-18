import { getLocalStorageItem, LocalStorageKeys } from '@/utils/local-storage/local-storage.utils';
import { useEffect, useState } from 'react';

export const useMounted = () => {
  const [mounted, setMounted] = useState<boolean>();
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};

export const useLocalStorageItem = <K extends keyof LocalStorageKeys>(key: K): LocalStorageKeys[K] | null => {
  const mounted = useMounted();
  if (!mounted) {
    return null;
  }
  return getLocalStorageItem(key);
};
