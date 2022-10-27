const mongoose = require("mongoose");

//create a model class

const contactModel = mongoose.Schema(
  {
    contact_name: String,
    contact_number: String,
    email: String,
  },
  {
    collection: "Buisiness_contact",
  }
);

module.exports = mongoose.model("Contact", contactModel);