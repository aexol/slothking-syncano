import { Container } from 'unstated';
export type SyncanoType = {
  s: {
    post: (endpoint: string, options: object) => Promise<any>;
    setToken: (token: string) => void;
  };
};
export class Syncano<T extends object> extends Container<T> {
  s;
  constructor(s: SyncanoType) {
    super();
    this.s = s;
  }
}
