function ContactController() {
  //flags
  let vm = this;
  let selectedId = -1;
  let addFlag = false;
  let editFlag = false;
  let removeFlag = false;

  //props and methods
  vm.currentContact = {};
  vm.startAddContact = startAddContact;
  vm.addContact = addContact;
  vm.startEditContact = startEditContact;
  vm.startRemoveContact = startRemoveContact;

  vm.save = save;
  vm.remove = remove;
  vm.cancel = reset;

  //states
  vm.isInAddMode = isInAddMode;
  vm.isInViewMode = isInViewMode;
  vm.isInEditMode = isInEditMode;
  vm.isInRemoveMode = isInRemoveMode;

  vm.contacts = [{
    id: 1,
    name: 'Bob',
    phone: '0123458690'
  },{
    id: 2,
    name: 'Tim',
    phone: '3934203242'
  },{
    id: 3,
    name: 'Ross',
    phone: '0684059433'
  }];

  function isInViewMode(id) {
    // view all when no contact is selected. View all minus the selected contact on click
    return selectedId < 0 || selectedId != id;
  }

  function isInAddMode() {
    return addFlag;
  }

  function isInEditMode(id) {
    return selectedId == id && editFlag;
  }

  function isInRemoveMode(id) {
    return selectedId == id && removeFlag;
  }

  function reset() {
    selectedId = -1;
    addFlag = false;
    editFlag = false;
    removeFlag = false;
  }

  function save() {
    for (var i = 0; i < vm.contacts.length; i++) {
      let contact = vm.contacts[i];
      if (contact.id == selectedId) {
        contact.name = vm.currentContact.name
        contact.phone = vm.currentContact.phone
        reset()
      }
    }
  }

  function remove(id) {
    for (var i = 0; i < vm.contacts.length; i++) {
      let contact = vm.contacts[i];
      if (contact.id == id) {
        vm.contacts.splice(i, 1)
        reset()
      }
    }
  }

  function startAddContact() {
    reset();
    addFlag = true;
    vm.currentContact = {};
  }

  function startEditContact(id) {
    reset();
    selectedId = id;
    editFlag = true;
    for (var i = 0; i < vm.contacts.length; i++) {
      let contact = vm.contacts[i];
      if (contact.id == id) {
        vm.currentContact.name = contact.name;
        vm.currentContact.phone = contact.phone;
      }
    }
  }

  function startRemoveContact(id) {
    reset();
    selectedId = id;
    removeFlag = true;
  }

  function addContact() {
    vm.contacts.push(vm.currentContact);
    reset();
  }
}

angular
    .module('app')
    .controller('ContactController', ContactController);
