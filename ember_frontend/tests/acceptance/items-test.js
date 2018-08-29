import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Item', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /items without data', function(assert) {
  visit('/items');

  andThen(function() {
    assert.equal(currentPath(), 'items.index');
    assert.equal(find('#blankslate').text().trim(), 'No Items found');
  });
});

test('visiting /items with data', function(assert) {
  server.create('item');
  visit('/items');

  andThen(function() {
    assert.equal(currentPath(), 'items.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new item', function(assert) {
  visit('/items');
  click('a:contains(New Item)');

  andThen(function() {
    assert.equal(currentPath(), 'items.new');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Todo) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing item', function(assert) {
  server.create('item');
  visit('/items');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'items.edit');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Todo) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing item', function(assert) {
  server.create('item');
  visit('/items');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'items.show');

    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Todo:)').next().text(), 'MyString');
  });
});

test('delete a item', function(assert) {
  server.create('item');
  visit('/items');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'items.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
