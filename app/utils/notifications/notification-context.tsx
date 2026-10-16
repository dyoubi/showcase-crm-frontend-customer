import { createContext, FC, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { Notification, NotificationContextContainer, NotificationProps } from '@/core/shared/Notification';

import { genUID } from '@/utils/idgen';

type NotificationContextType = {
  addNotification: (item: NotificationProps) => void;
};

export const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType);

const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Array<NotificationProps>>([]);

  const deleteNotification = useCallback(
    (id?: string) => {
      setNotifications(notifications.filter((n) => n.id !== id));
    },
    [notifications],
  );

  const addNotification = useCallback(
    (item: NotificationProps) => {
      if (!item.id) {
        item.id = genUID();
      }

      const match = notifications.find((existing) => existing.id === item.id);

      if (match) {
        return;
      }

      setNotifications((oldNotifications) => [...oldNotifications, item]);
    },
    [setNotifications, notifications],
  );

  const providerValues = useMemo(() => ({ addNotification }), [addNotification]);

  return (
    <NotificationContext.Provider value={providerValues}>
      <>
        <NotificationContextContainer>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              id={notification.id}
              type={notification.type}
              onClick={() => deleteNotification(notification?.id)}
              autoRemove={notification.autoRemove}
              autoRemoveDelay={notification.autoRemoveDelay}
              title={notification.title}
              text={notification.text}
            />
          ))}
        </NotificationContextContainer>
        {children}
      </>
    </NotificationContext.Provider>
  );
};

const useNotification = () => useContext(NotificationContext);

export { NotificationProvider, useNotification };
