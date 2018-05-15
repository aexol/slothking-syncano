import { Container } from 'unstated';

export type SyncanoType = {
  post: (endpoint: string, options?: object) => Promise<any>;
  setToken: (token: string) => void;
};
export class SyncanoContainer<T extends object> extends Container<T> {
  public s: SyncanoType;
  constructor(s?: SyncanoType) {
    super();
    this.s = s;
  }
}
