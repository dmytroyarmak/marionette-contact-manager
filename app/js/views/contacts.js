ContactManager.Views.Contacts = Marionette.CompositeView.extend({
  template: '#tpl-contacts',
  itemView: ContactManager.Views.Contact,
  itemViewContainer: '.contacts-container',
  triggers: {
    'click .add-contact-btn': 'addContact:clicked'
  }
});
