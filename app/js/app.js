var ContactManager = new Marionette.Application({
  Models: {},
  Collections: {},
  Views: {}
});

ContactManager.addRegions({
  mainRegion: '.main-container'
});

ContactManager.addInitializer(function(data) {
  var contacts = new ContactManager.Collections.Contacts(data.contacts),
      router = new ContactManager.Router(),
      controller = new ContactManager.Controller({
        contacts: contacts,
        router: router,
        mainRegion: this.mainRegion
      });


  router.on('route:home', controller.home, controller);
  router.on('route:showContacts', controller.showContacts, controller);
  router.on('route:newContact', controller.newContact, controller);
  router.on('route:editContact', controller.editContact, controller);
});

ContactManager.on('initialize:after', function(options){
  if (Backbone.history){
    Backbone.history.start();
  }
});
