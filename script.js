// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact form validation + accessible feedback
const form = document.querySelector('form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', function (e) {
  const email = form.querySelector('input[type="email"]').value;
  if (!email.includes('@')) {
    e.preventDefault();
    formStatus.textContent = '❌ Please enter a valid email address.';
  } else {
    formStatus.textContent = '✅ Message sent successfully!';
  }
});

// Dark/Light mode toggle with aria-pressed
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  const darkModeActive = document.body.classList.toggle('dark-mode');
  toggleBtn.setAttribute('aria-pressed', darkModeActive);

  // Update button text/icon
  toggleBtn.textContent = darkModeActive ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Project filter buttons with aria-selected
const filterButtons = document.querySelectorAll('.filter-buttons button');
const projects = document.querySelectorAll('.project');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');

    const filter = button.getAttribute('data-filter');
    projects.forEach(project => {
      const category = project.getAttribute('data-category');
      if (filter === 'all' || category.includes(filter)) {
        project.classList.remove('hide');
      } else {
        project.classList.add('hide');
      }
    });
  });
});
