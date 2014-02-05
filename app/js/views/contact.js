ContactManager.Views.Contact = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'media col-md-6 col-lg-4',
  template: '#tpl-contact',

  events: {
    'click .delete-contract': 'onClickDelete'
  },

  modelEvents: {
    'remove': 'close'
  },

  onClickDelete: function(e) {
    e.preventDefault();
    this.model.collection.remove(this.model);
  }
});
