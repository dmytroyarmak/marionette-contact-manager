ContactManager.Controller = Marionette.Controller.extend({
  initialize: function(options) {
    this._contacts = options.contacts;
    this._router = options.router;
    this._mainRegion = options.mainRegion;
  },

  showContacts: function() {
    var contactsView = new ContactManager.Views.Contacts({
      collection: this._contacts
    });

    ContactManager.mainRegion.show(contactsView);
  },

  newContact: function() {
    var newContactForm = new ContactManager.Views.ContactForm({
      model: new ContactManager.Models.Contact()
    });

    this.listenTo(newContactForm, 'form:submitted', function(attrs) {
      attrs.id = this._contacts.isEmpty() ? 1 : (_.max(this._contacts.pluck('id')) + 1);
      this._contacts.add(attrs);
      this._router.navigate('contacts', true);
    });

    ContactManager.mainRegion.show(newContactForm);
  },

  editContact: function(id) {
    var contact = this._contacts.get(id),
        editContactForm;

    if (contact) {
      editContactForm = new ContactManager.Views.ContactForm({
          model: contact
      });

      this.listenTo(editContactForm, 'form:submitted', function(attrs) {
        contact.set(attrs);
        this._router.navigate('contacts', true);
      });

      ContactManager.mainRegion.show(editContactForm);
    } else {
      this._router.navigate('contacts', true);
    }
  }
});
