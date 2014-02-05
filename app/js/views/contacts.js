ContactManager.Views.Contacts = Marionette.CompositeView.extend({
  template: '#tpl-contacts',
  itemView: ContactManager.Views.Contact,
  itemViewContainer: '.contacts-container'
});
