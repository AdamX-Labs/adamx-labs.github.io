const header = document.querySelector('.site-header');

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

document.querySelectorAll('.project-card, .mini-card, .steps article').forEach((item) => {
  item.classList.add('reveal');
  observer.observe(item);
});
