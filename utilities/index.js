const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = "<ul>";
  list += '<li><a href="/" title="Home Page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      ' " title="See our inventory of ' +
      row.classification_name +
      ' vechiles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += "<li>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        'details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" ></a>';
      grid += '<div class="namePrice">';
      grid += "<hr >";
      grid += "<h2>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* ****************************************
 * Build vehicle detail HTML
 * *************************************** */
Util.buildVehicleDetail = async function (data) {
  if (!data || data.length === 0) {
    return '<p class="notice">Sorry, no vehicle details could be found.</p>';
  }

  const vehicle = data[0];

  // Format price with USD currency symbol and commas
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(vehicle.inv_price);

  // Format mileage with commas
  const formattedMileage = new Intl.NumberFormat("en-US").format(
    vehicle.inv_miles,
  );

  // Build HTML structure
  const html = `
    <div class="vehicle-detail">
      <div class="vehicle-image">
      <h1>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h1>
        <img src="${vehicle.inv_image}" alt="${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}" class="img-fluid">
      </div>
      <div class="vehicle-info">
        <p class="vehicle-title">${vehicle.inv_make} ${vehicle.inv_model} Details</p>
        
        <div class="price-badge">
          <span>Price: ${formattedPrice}</span>
        </div>

        <div class="description-section">
          <p><span>Description: </span> ${vehicle.inv_description}</p>
        </div>
        
        <div class="spec-item">
          <span>Color: </span>${vehicle.inv_color}
        </div>

        <div class="spec-item">
          <span>Mileage: </span>${formattedMileage} miles
        </div>
      </div>
    </div>
  `;

  return html;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;
