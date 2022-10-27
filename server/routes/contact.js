const express = require("express");
const router = express.Router();

const passport = require("passport");

//connect to contact model
let contactController = require("../controllers/contact");

//helper function for guard purposes
function requireAuth(req, res, next) {
  //check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* GET Route for the Business Contact page - READ operation */
router.get("/", contactController.displayContactList);

/* GET Route for displaying the Add page - CREATE operation */
router.get("/add", requireAuth, contactController.displayAddPage);

/* POST Route for processing the Add page - CREATE operation */
router.post("/add", requireAuth, contactController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE operation */
router.get("/edit/:id", requireAuth, contactController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE operation */
router.post("/edit/:id", requireAuth, contactController.processEditPage);

/* GET to perform contact deletion - DELETE operation */
router.get("/delete/:id", requireAuth, contactController.performDeletePage);

module.exports = router;