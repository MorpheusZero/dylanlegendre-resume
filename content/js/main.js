/**
 * ############################
 *                AppJS
 *      by Dylan Legendre
 * https://www.dylanlegendre.com/
 *
 * All miscellaneous functions for my
 * resume and portfolio site.
 *
 * ############################
 */

$(() => {
  /**
   * Calculates age in years based on a birthday and the current time.
   * @param {*} dateString
   */
  const calcAge = (dateString) => {
    const birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  };

  /**
   * Let the page fade in for added effect.
   * But only if the screen is large--on mobile just show it quickly.
   */
  const fadePageInOptionally = () => {
    if ($(window).width() < 1350) {
      $("body").show();
    } else {
      $("body").fadeIn(1500);
    }
  };

  /**
   * Enable the various bootstrap features we want to use.
   */
  const enableBootstrapFeatures = () => {
    // Enable Popovers
    $('[data-toggle="popover"]').popover({
      trigger: "focus",
    });
    // Enable Tooltips
    $('[data-toggle="tooltip"]').tooltip();
  };

  /**
   * Run this function when the app starts.
   */
  const init = () => {
    enableBootstrapFeatures();
    fadePageInOptionally();
    // Set the value of my age.
    $("#myAge").text(calcAge("09-05-1990"));
    // Set the value of currentYear
    $("#currentYear").text(new Date().getFullYear().toString());
  };

  /**
   * LAUNCH!
   */
  init();
});
