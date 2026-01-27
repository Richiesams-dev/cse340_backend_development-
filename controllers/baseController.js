const utilities = require("../utilities/");
const baseController = {};

baseController.buildHome = async function (req, res) {
  try {
    const nav = await utilities.getNav();
    res.render("index", { title: "Home", nav, errors: null });
  } catch (error) {
    next(error);
  }
};

module.exports = baseController;
