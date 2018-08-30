import EmberRouter from '@ember/routing/router';
import SaveModelMixin from 'ember-frontend/mixins/items/save-model-mixin';

export default EmberRouter.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('item');
  }
});
