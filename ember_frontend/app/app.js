import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

//Initialize Rails CSRF
// loadInitializers(App, 'rails-csrf');
// import { setCsrfUrl } from 'rails-csrf/config';
// setCsrfUrl('api/v1/csrf');

export default App;
