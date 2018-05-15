import { SyncanoType, SyncanoContainer } from './Syncano';
export type RestModel = {
  id: number;
  [x: string]: any;
};
export type RestState = {
  isAdmin: boolean;
  models: {
    [x: string]: Array<RestModel>;
  };
  s: SyncanoType;
};

export const toFormData = (obj) => {
  var fd = new FormData();
  let isFd = false;
  var formKey;
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      formKey = property;
      if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        fd.append(formKey, JSON.stringify(obj));
      } else {
        fd.append(formKey, obj[property]);
      }
      if (obj[property] instanceof File) {
        isFd = true;
      }
    }
  }
  return isFd ? fd : obj;
};

export class Rest extends SyncanoContainer<RestState> {
  state = {
    isAdmin: null,
    models: {},
    s: null
  };
  isAdmin = () => {
    if (this.state.isAdmin === null) {
      this.s.post('rest-framework/isAdmin', {}).then((isAdmin) =>
        this.setState({
          isAdmin
        })
      );
    }
  };
  list = (model: string, refresh = false) => {
    if (!this.state.models[model] || refresh) {
      this.s.post('rest-framework/list', { model }).then((objects: Array<RestModel>) => {
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
    return this.s
      .post('rest-framework/add', toFormData({ model, ...data }))
      .then((obj: RestModel) => {
        this.setState({
          models: {
            ...this.state.models,
            [model]: [...this.state.models[model], obj]
          }
        });
      });
  };
  remove = (model: string, id: number) => {
    return this.s.post('rest-framework/remove', { model, id }).then((obj) => {
      this.setState({
        models: {
          ...this.state.models,
          [model]: this.state.models[model].filter((m) => m.id !== id)
        }
      });
    });
  };
  update = (model: string, id: number, data: object) => {
    return this.s
      .post('rest-framework/update', toFormData({ model, id, ...data }))
      .then((obj: RestModel) => {
        this.setState({
          models: {
            ...this.state.models,
            [model]: this.state.models[model].map((m) => (m.id === obj.id ? obj : m))
          }
        });
      });
  };
}
