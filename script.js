/**
 * ==========================================================================
 * AQIB FAKIR - INTERACTIVE PORTFOLIO JAVASCRIPT ENGINE
 * Features: Typing effect, 3D card tilt, mouse glow orb, animated counters,
 * skill tab filters, scrollspy, theme toggle, copy to clipboard, modal & toasts
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. THEME SWITCHER (Dark & Light Mode)
  // ------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;
  
  // Check stored theme or system preference
  const storedTheme = localStorage.getItem('aqib_portfolio_theme');
  if (storedTheme) {
    htmlRoot.className = storedTheme;
  } else {
    // Default to dark mode
    htmlRoot.className = 'dark';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (htmlRoot.classList.contains('dark')) {
        htmlRoot.classList.replace('dark', 'light');
        localStorage.setItem('aqib_portfolio_theme', 'light');
        showToast('Light Theme Activated');
      } else {
        htmlRoot.classList.replace('light', 'dark');
        localStorage.setItem('aqib_portfolio_theme', 'dark');
        showToast('Dark Theme Activated');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 2. MOUSE GLOW ORB TRACKER
  // ------------------------------------------------------------------------
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursorGlow() {
    if (cursorGlow) {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
    }
    requestAnimationFrame(animateCursorGlow);
  }
  animateCursorGlow();

  // ------------------------------------------------------------------------
  // 3. DYNAMIC TYPING EFFECT IN HERO SECTION
  // ------------------------------------------------------------------------
  const typingElement = document.getElementById('typingText');
  const roles = [
    "Computer Operations",
    "System Administration",
    "IT Support & Troubleshooting",
    "Web Development",
    "WordPress CMS",
    "Prompt Engineering & AI"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeRoleEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 45;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 95;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingDelay = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 400; // Pause before typing next word
    }

    setTimeout(typeRoleEffect, typingDelay);
  }
  setTimeout(typeRoleEffect, 500);

  // ------------------------------------------------------------------------
  // 4. 3D CARD MOUSE HOVER TILT PARALLAX
  // ------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('.tilt-effect, .tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -7; // max 7 deg
      const rotateY = ((x - centerX) / centerX) * 7;  // max 7 deg

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // ------------------------------------------------------------------------
  // 5. STICKY NAVBAR & ACTIVE SCROLLSPY
  // ------------------------------------------------------------------------
  const mainHeader = document.getElementById('mainHeader');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 40) {
      mainHeader?.classList.add('scrolled');
    } else {
      mainHeader?.classList.remove('scrolled');
    }

    // Scrollspy active indicator
    let scrollPos = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ------------------------------------------------------------------------
  // 6. MOBILE DRAWER NAVIGATION
  // ------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('open');
    mobileDrawer?.setAttribute('aria-hidden', 'false');
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('open');
    mobileDrawer?.setAttribute('aria-hidden', 'true');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileMenuBtn?.addEventListener('click', openDrawer);
  closeDrawerBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ------------------------------------------------------------------------
  // 7. SCROLL REVEAL & STATS COUNTER
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));

  // Counter animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsCounted) {
        statsCounted = true;
        statNumbers.forEach(stat => {
          const target = +stat.getAttribute('data-target');
          let count = 0;
          const duration = 1500;
          const increment = target / (duration / 30);

          const counter = setInterval(() => {
            count += increment;
            if (count >= target) {
              stat.childNodes[0].nodeValue = target;
              clearInterval(counter);
            } else {
              stat.childNodes[0].nodeValue = Math.floor(count);
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.4 });

  const heroStatsGrid = document.querySelector('.hero-stats-grid');
  if (heroStatsGrid) statsObserver.observe(heroStatsGrid);

  // ------------------------------------------------------------------------
  // 8. SKILLS TAB FILTERING
  // ------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 9. COPY TO CLIPBOARD BUTTONS
  // ------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
          const icon = btn.querySelector('i');
          if (icon) {
            icon.className = 'fa-solid fa-check text-green';
            setTimeout(() => {
              icon.className = 'fa-regular fa-copy';
            }, 2000);
          }
        });
      }
    });
  });

  // ------------------------------------------------------------------------
  // 10. RESUME PREVIEW MODAL
  // ------------------------------------------------------------------------
  const openResumeModalBtn = document.getElementById('openResumeModalBtn');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');
  const resumeModal = document.getElementById('resumeModal');

  function openResumeModal() {
    resumeModal?.classList.add('open');
    resumeModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeResumeModal() {
    resumeModal?.classList.remove('open');
    resumeModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openResumeModalBtn?.addEventListener('click', openResumeModal);
  closeResumeModalBtn?.addEventListener('click', closeResumeModal);

  resumeModal?.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeResumeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal?.classList.contains('open')) {
      closeResumeModal();
    }
  });

  // ------------------------------------------------------------------------
  // 11. INTERACTIVE CONTACT FORM & CLIENT-SIDE VALIDATION
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const phoneInput = document.getElementById('formPhone');
    const subjectInput = document.getElementById('formSubject');
    const messageInput = document.getElementById('formMessage');

    let isValid = true;

    // Reset error messages
    document.querySelectorAll('.form-error').forEach(err => err.textContent = '');

    if (!nameInput.value.trim()) {
      document.getElementById('nameError').textContent = 'Please enter your name.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!subjectInput.value.trim()) {
      document.getElementById('subjectError').textContent = 'Please enter a subject.';
      isValid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 5) {
      document.getElementById('messageError').textContent = 'Message should be at least 5 characters.';
      isValid = false;
    }

    if (isValid) {
      const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value.trim()}`);
      const body = encodeURIComponent(
        `Hello Aqib Fakir,\n\nMy Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\nPhone: ${phoneInput.value.trim() || 'N/A'}\n\nMessage:\n${messageInput.value.trim()}`
      );

      // Open mailto link
      window.location.href = `mailto:aqibfakir6@gmail.com?subject=${subject}&body=${body}`;

      if (formSuccessMessage) {
        formSuccessMessage.style.display = 'flex';
      }
      contactForm.reset();
      showToast('Preparing your email inquiry...');
    }
  });

  // ------------------------------------------------------------------------
  // 12. TOAST NOTIFICATION HELPER
  // ------------------------------------------------------------------------
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

});
