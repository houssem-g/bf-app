import { useEffect } from 'react';

const useResizeObserver = (callback: ResizeObserverCallback) => {
  useEffect(() => {
    const observer = new ResizeObserver(callback);

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [callback]);
};

export default useResizeObserver;