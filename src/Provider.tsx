import * as React from 'react';
import { Provider, ProviderProps } from 'unstated';
import Syncano from '@syncano/client';

export let s: {
  post: (endpoint: string, options: object) => Promise<any>;
  setToken: (token: string) => void;
};
type SyncanoProviderProps = ProviderProps & {
  instanceName: string;
};

export const SyncanoProvider = ({ instanceName, ...props }: SyncanoProviderProps) => {
  s = Syncano(instanceName);
  return <Provider {...props} />;
};
