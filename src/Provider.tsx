import * as React from 'react';
import { Provider, ProviderProps } from 'unstated';
import { Auth, Rest, SyncanoContainer } from './containers';
import * as SyncanoClient from '@syncano/client';
export type SyncanoProviderProps = ProviderProps & {
  instanceName: string;
  syncanoContainers?: {
    [x: string]: SyncanoContainer<any>;
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
