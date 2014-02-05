ContactManager.Views.ContactForm = Marionette.ItemView.extend({
  template: '#tpl-new-contact',

  ui: {
    nameInput: '.contact-name-input',
    telInput: '.contact-tel-input',
    emailInput: '.contact-email-input'
  },

  events: {
    'submit .contract-form': 'onFormSubmit'
  },

  triggers: {
    'click .form-cancel-btn': 'form:canceled'
  },

  serializeData: function() {
    return _.extend(this.model.toJSON(), {
      isNew: this.model.isNew()
    });
  },

  onFormSubmit: function(e) {
    e.preventDefault();

    this.trigger('form:submitted', {
      name: this.ui.nameInput.val(),
      tel: this.ui.telInput.val(),
      email: this.ui.emailInput.val()
    });
  }
});
