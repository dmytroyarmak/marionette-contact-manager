ContactManager.Collections.Contacts = Backbone.Collection.extend({
  model: ContactManager.Models.Contact,
  localStorage: new Backbone.LocalStorage('contacts')
});
