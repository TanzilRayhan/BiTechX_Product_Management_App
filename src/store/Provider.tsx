'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { hydrateAuth } from '@/store/slices/authSlice';

function AuthHydration() {
  useEffect(() => {
    store.dispatch(hydrateAuth());
  }, []);

  return null;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthHydration />
      {children}
    </Provider>
  );
}
