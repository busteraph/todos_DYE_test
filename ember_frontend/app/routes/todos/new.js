import Ember from 'ember';
import SaveModelMixin from 'ember-frontend/mixins/todos/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('todo');
  }
});
