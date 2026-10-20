// Small interactions: mobile menu, project filters, reveal animations and scroll progress.
const menuToggle = document.querySelector('#menuToggle');
const nav = document.querySelector('#nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const filterButtons = document.querySelectorAll('.filter-chip');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

//const emailButton = document.getElementById('emailButton');
//const copyMessage = document.getElementById('copyMessage');

//emailButton?.addEventListener('click', async function (event) {
  //event.preventDefault();

  //const email = this.dataset.email;

  //if (!email) {
    //if (copyMessage) {
      //copyMessage.textContent = 'Email address is missing.';
    //}
    //return;
  //}

  //try {
    //await navigator.clipboard.writeText(email);

    //if (copyMessage) {
      //copyMessage.textContent = 'Email copied!';
    //} else {
      //alert('Email copied: ' + email);
    //}
  //} catch (error) {
    // Fallback for browsers that block clipboard access.
    //window.prompt('Copy your email address:', email);
  //}

  //if (copyMessage) {
    //setTimeout(() => {
      //copyMessage.textContent = '';
    //}, 3000);
  //}
//}); 

const emailButton = document.getElementById('emailButton');
const copyMessage = document.getElementById('copyMessage');

emailButton?.addEventListener('click', function () {
  if (copyMessage) {
    copyMessage.textContent = 'Opening Gmail...';

    setTimeout(() => {
      copyMessage.textContent = '';
    }, 3000);
  }
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const progress = document.querySelector('#scrollProgress');
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
document.querySelector('#year').textContent = new Date().getFullYear();

// IMPORTANT: update these links before publishing.
document.querySelectorAll('.placeholder-link, .social-placeholder').forEach(link => {
  link.addEventListener('click', event => {
    if (link.getAttribute('href') === '#') {
      event.preventDefault();
      alert('Replace this placeholder link in index.html with your real certificate or social profile URL.');
    }
  });
});
