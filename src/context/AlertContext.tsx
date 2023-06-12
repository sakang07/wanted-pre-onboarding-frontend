import React, { createContext, useEffect, useMemo, useState } from 'react';
import Alert, { AlertProps } from '@/component/Alert';

interface AlertContextProps {
  isAlert: boolean;
  showAlert: (props: AlertProps) => void;
  hideAlert: () => void;
}

export const AlertContext = createContext<AlertContextProps>({} as AlertContextProps);

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [isAlert, setIsAlert] = useState(false);
  const [alertContent, setAlertContent] = useState<AlertProps | null>(null);

  useEffect(() => {
    return () => {
      hideAlert();
    };
  }, []);

  const showAlert = (alertContent: AlertProps) => {
    setIsAlert(true);
    setAlertContent(alertContent);
  };

  const hideAlert = () => {
    setIsAlert(false);
    setAlertContent(null);
    alertContent?.onClose && alertContent.onClose();
  };

  const value: AlertContextProps = useMemo(
    () => ({
      isAlert,
      showAlert,
      hideAlert,
    }),
    [isAlert],
  );

  return (
    <AlertContext.Provider value={value}>
      {isAlert && (
        <Alert title={alertContent?.title} closeCopy={alertContent?.closeCopy} onClose={hideAlert}>
          {alertContent?.children}
        </Alert>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
