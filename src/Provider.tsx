import * as React from 'react';
import { Provider, ProviderProps, Container } from 'unstated';
import { Auth, Rest } from './containers';
import * as SyncanoClient from '@syncano/client';
export type SyncanoProviderProps = ProviderProps & {
  instanceName: string;
  syncanoContainers?: {
    [x: string]: Container<any>;
  };
};
export const SyncanoProvider = ({
  instanceName,
  syncanoContainers = {},
  ...props
}: SyncanoProviderProps) => {
  let injected = { Auth, Rest, ...syncanoContainers };
  let inj = [];
  let sync = SyncanoClient(instanceName);
  for (var k of Object.keys(injected)) {
    inj.push(new injected[k](sync));
  }
  return <Provider inject={inj} {...props} />;
};
