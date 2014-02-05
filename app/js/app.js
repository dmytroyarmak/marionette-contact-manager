var ContactManager = new Marionette.Application({
  Models: {},
  Collections: {},
  Views: {}
});

ContactManager.addRegions({
  mainRegion: '.main-container'
});

ContactManager.addInitializer(function(data) {
  var contacts = new ContactManager.Collections.Contacts(),
      router = new ContactManager.Router(),
      controller = new ContactManager.Controller({
        contacts: contacts,
        router: router,
        mainRegion: this.mainRegion
      });

  router.processAppRoutes(controller, {
    'contacts': 'showContacts',
    'contacts/new': 'newContact',
    'contacts/edit/:id': 'editContact'
  });
});

ContactManager.on('initialize:after', function(options){
  if (Backbone.history){
    Backbone.history.start();
  }
});
