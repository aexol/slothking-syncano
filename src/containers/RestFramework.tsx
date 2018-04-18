import { Container } from 'unstated';
import { s } from '..';
export type RestModel = {
  id: number;
  [x: string]: any;
};
export type RestState = {
  isAdmin: boolean;
  models: {
    [x: string]: Array<RestModel>;
  };
};
export class Rest extends Container<RestState> {
  state = {
    isAdmin: null,
    models: {}
  };
  isAdmin = () => {
    if (this.state.isAdmin === null) {
      s.post('rest-framework/isAdmin', {}).then((isAdmin) =>
        this.setState({
          isAdmin
        })
      );
    }
  };
  list = (model: string, refresh = false) => {
    if (!this.state.models[model] || refresh) {
      s.post('rest-framework/list', { model }).then((objects: Array<RestModel>) => {
        this.setState({
          models: {
            ...this.state.models,
            [model]: objects
          }
        });
      });
    }
  };
  add = (model: string, data: object) => {
    return s.post('rest-framework/add', { model, ...data }).then((obj: RestModel) => {
      this.setState({
        models: {
          ...this.state.models,
          [model]: [...this.state.models[model], obj]
        }
      });
    });
  };
  remove = (model: string, id: number) => {
    return s.post('rest-framework/remove', { model, id }).then((obj) => {
      this.setState({
        models: {
          ...this.state.models,
          [model]: this.state.models[model].filter((m) => m.id !== id)
        }
      });
    });
  };
  update = (model: string, id: number, data: object) => {
    return s.post('rest-framework/update', { model, id, ...data }).then((obj: RestModel) => {
      this.setState({
        models: {
          ...this.state.models,
          [model]: this.state.models[model].map((m) => (m.id === obj.id ? obj : m))
        }
      });
    });
  };
}
