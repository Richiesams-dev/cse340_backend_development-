const errorCont = {};

/* ***************************
 *  Trigger intentional error for testing
 * ************************** */
errorCont.triggerIntentionalError = async function (req, res, next) {
  // This will trigger the error middleware
  throw new Error("This is an intentional 500 error for testing purposes.");
};

module.exports = errorCont;
