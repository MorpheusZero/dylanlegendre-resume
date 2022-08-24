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
   * Displays a console welcoming message with my name and link to my Github.
   * This is mostly for fun, and to let potential technical managers know that
   * I know what they are looking at :)
   */
  const showConsoleMessage = () => {
    console.info(`
👋 WELL HEY THERE! 👋
    
Thanks for checking out my code! I'm Dylan Legendre, and I could be your next Systems Architect or DevOps Engineer!

If you are interested in checking out my source code--or just want to chat on LinkedIn--please check out my links below! 

https://www.github.com/MorpheusZero

http://www.linkedin.com/in/dylan-legendre-9733ab65

❤️ Dylan Legendre
    `);
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
    showConsoleMessage();
  };

  /**
   * LAUNCH!
   */
  init();
});
