import React, { createContext, useEffect, useMemo, useState } from 'react';
import Progress from '@/component/Progress';

interface LoadingContextProps {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextProps>({} as LoadingContextProps);

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  const showLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  const value: LoadingContextProps = useMemo(
    () => ({
      isLoading,
      showLoading,
      hideLoading,
    }),
    [isLoading],
  );

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <Progress />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
