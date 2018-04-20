import * as React from 'react';
import { Provider, ProviderProps } from 'unstated';
import * as Syncano from '@syncano/client';

export var syncano: {
  s?: {
    post: (endpoint: string, options: object) => Promise<any>;
    setToken: (token: string) => void;
  };
} = {};
export type SyncanoProviderProps = ProviderProps & {
  instanceName: string;
};

export const SyncanoProvider = ({ instanceName, ...props }: SyncanoProviderProps) => {
  syncano.s = Syncano(instanceName);
  return <Provider {...props} />;
};
