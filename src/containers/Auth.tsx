import { Syncano } from './Syncano';
import * as Cookies from 'js-cookie';
export type AuthState = {
  valid?: boolean;
  token?: string;
  username?: string;
};
export class Auth extends Syncano<AuthState> {
  save = (name: string, value: string) => {
    Cookies.set(name, value);
  };
  load = (name: string, defaultValue?: any): any => {
    return Cookies.get(name) || defaultValue;
  };
  reset = (name: string) => {
    Cookies.remove(name);
  };
  state = {
    ...super.state,
    valid: false,
    token: this.load('token'),
    username: this.load('username')
  };
  constructor(props) {
    super(props);
    this.validate();
  }
  login = (username: string, password: string) => {
    this.s.post('rest-auth/login', { username, password }).then(({ token }) => {
      if (token) {
        this.save('token', token);
        this.save('username', username);
        this.s.setToken(token);
        this.setState({
          username,
          token,
          valid: true
        });
      }
    });
  };
  logout = () => {
    this.reset('username');
    this.reset('token');
    this.setState({
      valid: false,
      token: null,
      username: null
    });
  };
  private validate() {
    const { token, username } = this.state;
    if (token && username) {
      this.s
        .post('rest-auth/validate', {
          username,
          token
        })
        .then((valid) => {
          this.setState({
            valid
          });
          if (valid) {
            this.s.setToken(token);
          }
        });
    } else {
      this.setState({
        valid: false
      });
    }
  }
}
