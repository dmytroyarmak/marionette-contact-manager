ContactManager.Controller = Marionette.Controller.extend({
  initialize: function(options) {
    this._router = options.router;
    this._mainRegion = options.mainRegion;
    this._contacts = options.contacts;
  },

  showContacts: function() {
    this._fetchContacts().then(_.bind(this.showContactsSync, this));
  },

  showContactsSync: function() {
    var contactsView = new ContactManager.Views.Contacts({
      collection: this._contacts
    });

    this.listenTo(contactsView, 'addContact:clicked', this.newContactSync);
    this.listenTo(contactsView, 'itemview:delete:clicked', function(contactView) {
      contactView.model.destroy();
    });
    this.listenTo(contactsView, 'itemview:edit:clicked', function(contactView) {
      this.editContactSync(contactView.model.id);
    });

    ContactManager.mainRegion.show(contactsView);

    this._router.navigate('contacts');
  },

  newContact: function() {
    this._fetchContacts().then(_.bind(this.newContactSync, this));
  },

  newContactSync: function() {
    var newContactForm = new ContactManager.Views.ContactForm({
      model: new ContactManager.Models.Contact()
    });

    this.listenTo(newContactForm, 'form:submitted', function(attrs) {
      attrs.avatar = _.random(1, 15) + '.jpg';
      this._contacts.create(attrs, {wait: true});
      this.showContactsSync();
    });

    this.listenTo(newContactForm, 'form:canceled', this.showContactsSync);

    ContactManager.mainRegion.show(newContactForm);

    this._router.navigate('contacts/new');
  },

  editContact: function(id) {
    this._fetchContacts().then(_.bind(this.editContactSync, this, id));
  },

  editContactSync: function(id) {
    var contact = this._contacts.get(id),
        editContactForm;

    if (contact) {
      editContactForm = new ContactManager.Views.ContactForm({
          model: contact
      });

      this.listenTo(editContactForm, 'form:submitted', function(attrs) {
        contact.save(attrs);
        this.showContactsSync();
      });

      this.listenTo(editContactForm, 'form:canceled', this.showContactsSync);

      ContactManager.mainRegion.show(editContactForm);

      this._router.navigate('contacts/edit/' + id);
    } else {
      this.showContacts();
    }
  },

  _fetchContacts: function() {
    this._contactsFetching = this._contactsFetching || this._contacts.fetch();
    return this._contactsFetching;
  }
});
