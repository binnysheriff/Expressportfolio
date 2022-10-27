let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//Create a reference to DB schema

let Contact = require("../models/buisinessContact.js");

module.exports.displayContactList = (req, res, next) => {
  Contact.find((err, ContactList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("./buisiness/list", {
        title: "Buisiness Contacts",
        displayName: req.user ? req.user.displayName : "",
        ContactList,
      });
    }
  }).sort({ contact_name: 1 });
};

module.exports.displayAddPage = (req, res, next) => {
  res.render("./buisiness/add", {
    title: "Add Contacts",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.processAddPage = (req, res, next) => {
  console.log(req.body);
  let newContact = Contact({
    contact_name: req.body.name,
    contact_number: req.body.phone,
    email: req.body.email,
  });

  Contact.create(newContact, (err, Contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //Refresh Business Contacts List
      //changedTouches
      res.redirect("/contact-list");
    }
  });
};

module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;

  Contact.findById(id, (err, contactToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //Show the Edit View
      //keep
      res.render("./buisiness/edit", {
        title: "Edit Contact",
        displayName: req.user ? req.user.displayName : "",
        contact: contactToEdit,
      });
    }
  });
};

module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id;

  let updatedContact = Contact({
    _id: id,
    contact_name: req.body.name,
    contact_number: req.body.phone,
    email: req.body.email,
  });

  Contact.updateOne({ _id: id }, updatedContact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //Refresh the Business Contact List
      //chnages
      res.redirect("/contact-list");
    }
  });
};

module.exports.performDeletePage = (req, res, next) => {
  let id = req.params.id;

  Contact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //Refresh the Business Contact List
      //chanages
      res.redirect("/contact-list");
    }
  });
};