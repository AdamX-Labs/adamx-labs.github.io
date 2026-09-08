const header = document.querySelector('.site-header');
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = themeToggle.querySelector('.theme-label');

const updateThemeControl = () => {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  themeLabel.textContent = dark ? 'Light' : 'Dark';
};

updateThemeControl();
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem('adamx-theme', nextTheme);
  updateThemeControl();
});

let previousScroll = window.scrollY;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  header.style.position = currentScroll > 86 ? 'sticky' : 'relative';
  header.style.top = currentScroll > previousScroll && currentScroll > 400 ? '-88px' : '0';
  header.style.transition = 'top 220ms ease';
  previousScroll = currentScroll;
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('revealed');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-heading, .method-intro, .manifesto-copy, .project-card, .mini-card, .steps article').forEach((item, index) => {
  item.classList.add('reveal');
  item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 80}ms`);
  observer.observe(item);
});
