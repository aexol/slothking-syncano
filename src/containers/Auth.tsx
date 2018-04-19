import { Container } from 'unstated';
import * as Cookies from 'js-cookie';
import { s } from '..';
export type AuthState = {
  valid?: boolean;
  token?: string;
  username?: string;
};

export class Auth extends Container<AuthState> {
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
    valid: false,
    token: this.load('token'),
    username: this.load('username')
  };
  constructor() {
    super();
    this.validate();
  }
  login = (username: string, password: string) => {
    s.post('rest-auth/login', { username, password }).then(({ token }) => {
      if (token) {
        this.save('token', token);
        this.save('username', username);
        s.setToken(token);
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
      s
        .post('rest-auth/validate', {
          username,
          token
        })
        .then((valid) => {
          this.setState({
            valid
          });
          if (valid) {
            s.setToken(token);
          }
        });
    } else {
      this.setState({
        valid: false
      });
    }
  }
}
