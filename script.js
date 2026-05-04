const faders = document.querySelectorAll(".fade");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("show");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  faders.forEach((element) => observer.observe(element));
} else {
  faders.forEach((element) => element.classList.add("show"));
}

document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenuPane = document.getElementById("mobile-menu-pane");
  const mainNav = document.getElementById("main-nav");

  if (!mobileMenuPane || !mainNav) {
    return;
  }

  mobileMenuPane.innerHTML = mainNav.innerHTML;

  const closeMenu = () => {
    mobileMenuPane.classList.remove("is-open");
    if (mobileToggle) {
      mobileToggle.setAttribute("aria-expanded", "false");
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = mobileMenuPane.classList.toggle("is-open");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  mobileMenuPane.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!mobileMenuPane.classList.contains("is-open")) {
      return;
    }

    if (!mobileMenuPane.contains(event.target) && !mobileToggle?.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
});
