import EmberRouter from '@ember/routing/router';

export default EmberRouter.extend({
  actions: {
    remove: function(model) {
      if(confirm('Are you sure?')) {
        model.destroyRecord();
      }
    }
  },
  model: function() {
    return this.store.findAll('item');
  }
});
