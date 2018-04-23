import * as React from 'react';
import { Provider, ProviderProps } from 'unstated';
import { Auth, Rest, SyncanoContainer } from './containers';
import * as SyncanoClient from '@syncano/client';

export type SyncanoContainerType<State extends object> = {
  new (s?: any): SyncanoContainer<State>;
};
export type SyncanoProviderProps = ProviderProps & {
  instanceName: string;
  syncanoContainers?: Array<SyncanoContainerType<any>>;
};

export const SyncanoProvider = ({
  instanceName,
  syncanoContainers = [],
  ...props
}: SyncanoProviderProps) => {
  let injected = [Auth, Rest, ...syncanoContainers];
  let inj = [];
  let sync = SyncanoClient(instanceName);
  for (var k of injected) {
    inj.push(new k(sync));
  }
  return <Provider inject={inj} {...props} />;
};
