const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId;
    const data =
      await invModel.getInventoryByClassificationId(classification_id);

    if (!data || data.length === 0) {
      throw new Error("No vehicles found for this classification");
    }

    const grid = await utilities.buildClassificationGrid(data);
    let nav = await utilities.getNav();
    const className = data[0].classification_name;
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

/* ***************************
 *  Build inventory detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  try {
    const inventory_id = req.params.inventoryId;
    const data = await invModel.getInventoryById(inventory_id);

    if (!data || data.length === 0) {
      throw new Error("Vehicle not found");
    }

    const vehicleHTML = await utilities.buildVehicleDetail(data);
    let nav = await utilities.getNav();

    res.render("./inventory/detail", {
      title: `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`,
      nav,
      vehicleHTML,
    });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

module.exports = invCont;
