import * as React from 'react';
import { Provider, ProviderProps } from 'unstated';
import { Auth, Rest, SyncanoContainer } from './containers';
import * as SyncanoClient from '@syncano/client';
export type SyncanoContainerType = {
  new (s: any): SyncanoContainer<any>;
};
export type SyncanoProviderProps = ProviderProps & {
  instanceName: string;
  syncanoContainers?: {
    [x: string]: SyncanoContainerType;
  };
};

export const SyncanoProvider = ({
  instanceName,
  syncanoContainers = {},
  ...props
}: SyncanoProviderProps) => {
  let injected: { [x: string]: SyncanoContainerType } = { Auth, Rest, ...syncanoContainers };
  let inj = [];
  let sync = SyncanoClient(instanceName);
  for (var k of Object.keys(injected)) {
    inj.push(new injected[k](sync));
  }
  return <Provider inject={inj} {...props} />;
};
