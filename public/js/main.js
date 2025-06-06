/**
 * ############################
 *            AppJS
 *      by Dylan Legendre
 * https://www.dylanlegendre.com/
 *
 * All miscellaneous functions for my
 * resume and portfolio site.
 *
 * ############################
 */

/**
 * Material Design Portfolio - Main JavaScript
 * Enhanced interactions and smooth animations
 */

$(document).ready(function () {
  // Navbar scroll behavior
  let lastScrollTop = 0;
  const navbar = $(".material-navbar");

  $(window).scroll(function () {
    const scrollTop = $(this).scrollTop();

    // Add/remove backdrop blur effect based on scroll position
    if (scrollTop > 50) {
      navbar.addClass("scrolled");
    } else {
      navbar.removeClass("scrolled");
    }

    // Auto-hide navbar on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.css("transform", "translateY(-100%)");
    } else {
      // Scrolling up
      navbar.css("transform", "translateY(0)");
    }

    lastScrollTop = scrollTop;
  });

  // Smooth scrolling for navigation links
  $('a[href^="#"]').on("click", function (e) {
    const target = $(this.getAttribute("href"));

    if (target.length) {
      e.preventDefault();

      // Remove active class from all nav links
      $(".nav-link").removeClass("active");

      // Add active class to clicked link
      $(this).addClass("active");

      // Calculate offset for fixed navbar
      const navbarHeight = navbar.outerHeight();
      const targetOffset = target.offset().top - navbarHeight - 20;

      $("html, body").animate(
        {
          scrollTop: targetOffset,
        },
        800,
        "easeInOutCubic"
      );
    }
  });

  // Update active navigation item based on scroll position
  $(window).scroll(function () {
    const scrollPos = $(window).scrollTop() + 100;

    $("section[id]").each(function () {
      const sectionTop = $(this).offset().top;
      const sectionBottom = sectionTop + $(this).outerHeight();
      const sectionId = $(this).attr("id");

      if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
        $(".nav-link").removeClass("active");
        $(`.nav-link[href="#${sectionId}"]`).addClass("active");
      }
    });
  });

  // Mobile navbar collapse on link click
  $(".navbar-nav .nav-link").on("click", function () {
    if ($(window).width() < 992) {
      $(".navbar-collapse").collapse("hide");
    }
  });

  // Material Design ripple effect for buttons
  $(".btn, .material-card").on("click", function (e) {
    const button = $(this);
    const ripple = $('<span class="ripple"></span>');

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.css({
      width: size + "px",
      height: size + "px",
      left: x + "px",
      top: y + "px",
    });

    button.append(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });

  // Intersection Observer for fade-in animations
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observe elements for animation
    $(".material-card, .project-card, .section-title").each(function () {
      observer.observe(this);
    });
  }

  // Parallax effect for hero section
  $(window).scroll(function () {
    const scrolled = $(window).scrollTop();
    const parallax = $(".hero-section");
    const speed = scrolled * 0.5;

    parallax.css("transform", `translateY(${speed}px)`);
  });

  // Type writer effect for hero subtitle (optional enhancement)
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.text("");

    function type() {
      if (i < text.length) {
        element.text(element.text() + text.charAt(i));
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Initialize typewriter effect after page load
  setTimeout(() => {
    const subtitle = $(".hero-subtitle");
    const originalText = subtitle.text();
    typeWriter(subtitle, originalText, 80);
  }, 1000);

  // Project card hover effects
  $(".project-card").hover(
    function () {
      $(this).find(".project-icon").css("transform", "scale(1.1) rotate(5deg)");
    },
    function () {
      $(this).find(".project-icon").css("transform", "scale(1) rotate(0deg)");
    }
  );

  // Custom easing function for smooth animations
  $.easing.easeInOutCubic = function (x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  };

  // Loading animation (fade in page content)
  $("body").css("opacity", "0");
  $(window).on("load", function () {
    $("body").animate({ opacity: 1 }, 800);
  });

  // Form validation and submission (if forms are added later)
  $("form").on("submit", function (e) {
    e.preventDefault();

    const form = $(this);
    const submitBtn = form.find('button[type="submit"]');
    const originalText = submitBtn.text();

    // Show loading state
    submitBtn
      .prop("disabled", true)
      .html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');

    // Simulate form submission (replace with actual logic)
    setTimeout(() => {
      submitBtn.prop("disabled", false).text(originalText);

      // Show success message
      const successMsg = $(
        '<div class="alert alert-success mt-3">Message sent successfully!</div>'
      );
      form.after(successMsg);

      setTimeout(() => {
        successMsg.fadeOut(() => successMsg.remove());
      }, 3000);

      form[0].reset();
    }, 2000);
  });
});

// Additional utility functions
window.portfolioUtils = {
  // Smooth scroll to element
  scrollTo: function (element, offset = 80) {
    const target = $(element);
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - offset,
        },
        800,
        "easeInOutCubic"
      );
    }
  },

  // Show notification
  showNotification: function (message, type = "info") {
    const notification = $(`
            <div class="notification notification-${type}">
                <i class="fas fa-info-circle me-2"></i>
                ${message}
            </div>
        `);

    $("body").append(notification);

    setTimeout(() => {
      notification.addClass("show");
    }, 100);

    setTimeout(() => {
      notification.removeClass("show");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  },

  // Toggle theme (for future dark/light mode toggle)
  toggleTheme: function () {
    $("body").toggleClass("light-theme");
    localStorage.setItem(
      "theme",
      $("body").hasClass("light-theme") ? "light" : "dark"
    );
  },
};
