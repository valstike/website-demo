// Fade-in animation
const faders = document.querySelectorAll('.fade');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
  });
});

faders.forEach(el => observer.observe(el));

// Fake form submit
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Message sent (demo)");
});

