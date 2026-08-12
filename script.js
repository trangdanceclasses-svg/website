/**
 * Trang Dance Class - Interactive Engine
 * Handles navigation, program filtering, schedule tab switching,
 * WhatsApp widget popover, modals, and smooth scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize modules
  initHeaderScroll();
  initMobileNav();
  initHeroSlider();
  initProgramFilters();
  initScheduleTabs();
  initWhatsAppWidget();
  initModals();
  initLightbox();
  initCounters();
  initFAQAccordions();
  initScrollAnimations();
});

/* ==========================================================================
   1. Header Scroll Effect & Active Link Highlight
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active link toggle
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks.querySelectorAll('.nav-link, .btn');

  if (!mobileToggle || !navLinks) return;

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.className = 'ri-close-line';
    } else {
      icon.className = 'ri-menu-line';
    }
  });

  // Close mobile drawer when a link is clicked
  links.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) icon.className = 'ri-menu-line';
    });
  });
}

/* ==========================================================================
   3. Dance Program Filtering System
   ========================================================================== */
function initProgramFilters() {
  const filterBtns = document.querySelectorAll('.programs-filter-btn');
  const programCards = document.querySelectorAll('.program-card');

  if (!filterBtns.length || !programCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active state
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      programCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Weekly Schedule Day Tab Switcher & Demo Schedule Data
   ========================================================================== */
const scheduleData = {
  mon: [
    { time: '07:00 AM - 08:30 AM', title: 'Morning Ballet Basics', level: 'Beginner', instructor: 'Elena Rostova', img: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=100&auto=format&fit=crop&q=80', room: 'Studio A' },
    { time: '05:00 PM - 06:30 PM', title: 'Contemporary Flow', level: 'Intermediate', instructor: 'Marcus Chen', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&auto=format&fit=crop&q=80', room: 'Studio B' },
    { time: '07:00 PM - 08:30 PM', title: 'Urban Hip Hop Choreography', level: 'All Levels', instructor: 'Jordan Vance', img: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=100&auto=format&fit=crop&q=80', room: 'Studio A' }
  ],
  tue: [
    { time: '08:00 AM - 09:30 AM', title: 'Power Yoga & Stretch', level: 'All Levels', instructor: 'Priya Sharma', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&auto=format&fit=crop&q=80', room: 'Studio C' },
    { time: '05:30 PM - 07:00 PM', title: 'Salsa & Bachata Social', level: 'Beginner / Intermediate', instructor: 'Carlos & Sofia', img: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=100&auto=format&fit=crop&q=80', room: 'Studio A' },
    { time: '07:15 PM - 08:45 PM', title: 'Bollywood Fusion Blast', level: 'All Levels', instructor: 'Aarav Patel', img: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=100&auto=format&fit=crop&q=80', room: 'Studio B' }
  ],
  wed: [
    { time: '04:00 PM - 05:00 PM', title: 'Junior Hip Hop & Grooves (Kids)', level: 'Ages 6-12', instructor: 'Jordan Vance', img: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=100&auto=format&fit=crop&q=80', room: 'Studio B' },
    { time: '05:30 PM - 07:00 PM', title: 'Classical Kathak Rhythm', level: 'Intermediate', instructor: 'Priya Sharma', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&auto=format&fit=crop&q=80', room: 'Studio A' },
    { time: '07:15 PM - 08:45 PM', title: 'Lyrical Contemporary', level: 'Advanced', instructor: 'Marcus Chen', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&auto=format&fit=crop&q=80', room: 'Studio C' }
  ],
  thu: [
    { time: '07:30 AM - 09:00 AM', title: 'Ballet Pointe & Technique', level: 'Intermediate / Adv', instructor: 'Elena Rostova', img: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=100&auto=format&fit=crop&q=80', room: 'Studio A' },
    { time: '06:00 PM - 07:30 PM', title: 'Street Dance & Popping', level: 'All Levels', instructor: 'Jordan Vance', img: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=100&auto=format&fit=crop&q=80', room: 'Studio B' },
    { time: '07:30 PM - 09:00 PM', title: 'Sensual Bachata Couples', level: 'Intermediate', instructor: 'Carlos & Sofia', img: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=100&auto=format&fit=crop&q=80', room: 'Studio A' }
  ],
  fri: [
    { time: '05:00 PM - 06:30 PM', title: 'Bollywood Commercial Hits', level: 'All Levels', instructor: 'Aarav Patel', img: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=100&auto=format&fit=crop&q=80', room: 'Studio A' },
    { time: '06:45 PM - 08:30 PM', title: 'Friday Night Dance Party & Cypher', level: 'Open Floor', instructor: 'Trang Team', img: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=100&auto=format&fit=crop&q=80', room: 'Main Stage' }
  ],
  sat: [
    { time: '09:00 AM - 10:30 AM', title: 'Little Stars Ballet & Movement', level: 'Kids (4-8 yrs)', instructor: 'Elena Rostova', img: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=100&auto=format&fit=crop&q=80', room: 'Studio B' },
    { time: '11:00 AM - 01:00 PM', title: 'Masterclass Bootcamp (Rotating Style)', level: 'All Levels', instructor: 'Guest Celebrity Choreographer', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&auto=format&fit=crop&q=80', room: 'Studio A' },
    { time: '04:00 PM - 06:00 PM', title: 'Salsa Cubana Social Session', level: 'All Levels', instructor: 'Carlos & Sofia', img: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=100&auto=format&fit=crop&q=80', room: 'Studio A' }
  ],
  sun: [
    { time: '10:00 AM - 11:30 AM', title: 'Sunday Chill & Stretch Yoga', level: 'All Levels', instructor: 'Priya Sharma', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&auto=format&fit=crop&q=80', room: 'Studio C' },
    { time: '04:00 PM - 06:00 PM', title: 'Open Practice & Rehearsals', level: 'Members Only', instructor: 'Studio Staff', img: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=100&auto=format&fit=crop&q=80', room: 'All Studios' }
  ]
};

function initScheduleTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const scheduleContainer = document.getElementById('scheduleList');

  if (!tabBtns.length || !scheduleContainer) return;

  function renderSchedule(dayKey) {
    const items = scheduleData[dayKey] || [];
    if (!items.length) {
      scheduleContainer.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-muted);">No classes scheduled for this day.</div>`;
      return;
    }

    scheduleContainer.innerHTML = items
      .map(
        (item) => `
      <div class="schedule-row">
        <div class="schedule-time">
          <i class="ri-time-line"></i>
          <span>${item.time}</span>
        </div>
        <div class="schedule-info">
          <h4>${item.title}</h4>
          <p>Level: <strong>${item.level}</strong></p>
        </div>
        <div class="schedule-instructor">
          <img src="${item.img}" alt="${item.instructor}">
          <span>${item.instructor}</span>
        </div>
        <div class="schedule-room">${item.room}</div>
        <div>
          <button class="btn btn-primary btn-sm open-booking-modal" data-class="${item.title}">
            Reserve <i class="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    `
      )
      .join('');

    // Rebind booking modal triggers
    bindBookingButtons();
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const day = btn.getAttribute('data-day');
      renderSchedule(day);
    });
  });

  // Render initial Monday schedule
  renderSchedule('mon');
}

/* ==========================================================================
   5. WhatsApp Floating Widget & Instant Chat Popover
   ========================================================================== */
function initWhatsAppWidget() {
  const waBtn = document.getElementById('whatsappBtn');
  const waPopover = document.getElementById('whatsappPopover');
  const waClose = document.getElementById('waClose');
  const waSend = document.getElementById('waSend');
  const waInput = document.getElementById('waInput');

  if (!waBtn || !waPopover) return;

  waBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    waPopover.classList.toggle('active');
  });

  if (waClose) {
    waClose.addEventListener('click', () => {
      waPopover.classList.remove('active');
    });
  }

  // Close popover when clicking outside
  document.addEventListener('click', (e) => {
    if (!waPopover.contains(e.target) && !waBtn.contains(e.target)) {
      waPopover.classList.remove('active');
    }
  });

  // Send WhatsApp Direct Message trigger
  if (waSend && waInput) {
    waSend.addEventListener('click', sendWhatsAppMsg);
    waInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendWhatsAppMsg();
    });
  }

  function sendWhatsAppMsg() {
    const message = waInput.value.trim() || 'Hi Trang Dance Class! I would like to inquire about classes.';
    const phoneNumber = '918521893659'; // Real WhatsApp Number
    const encodedUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(encodedUrl, '_blank');
    waPopover.classList.remove('active');
    showToast('Opening WhatsApp to send your inquiry...');
  }
}

/* ==========================================================================
   6. Modal Dialog & Booking Form Handling
   ========================================================================== */
function initModals() {
  const modalOverlay = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const trialForm = document.getElementById('trialForm');
  const selectClassInput = document.getElementById('selectedClassInput');

  if (!modalOverlay) return;

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('personName').value;
      modalOverlay.classList.remove('active');
      trialForm.reset();
      showToast(`Thank you, ${name}! Your Free Trial pass is confirmed. We will call you shortly.`);
    });
  }
}

function bindBookingButtons() {
  const bookingBtns = document.querySelectorAll('.open-booking-modal');
  const modalOverlay = document.getElementById('bookingModal');
  const selectClassInput = document.getElementById('selectedClassInput');

  bookingBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const className = btn.getAttribute('data-class') || 'General Dance Class';
      if (selectClassInput) {
        selectClassInput.value = className;
      }
      if (modalOverlay) {
        modalOverlay.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. Gallery Lightbox Modal
   ========================================================================== */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item:not(.gallery-video-item)');
  const videoItems = document.querySelectorAll('.gallery-video-item');

  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');
  const videoClose = document.getElementById('videoClose');

  // Photo Lightbox
  if (galleryItems.length && lightboxModal && lightboxImg) {
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxModal.classList.add('active');
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.remove('active');
      });
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // YouTube Video Modal Player
  if (videoItems.length && videoModal && videoIframe) {
    videoItems.forEach((item) => {
      item.addEventListener('click', () => {
        const videoId = item.getAttribute('data-video-id') || 'dQw4w9WgXcQ';
        videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        videoModal.classList.add('active');
      });
    });

    const closeVideo = () => {
      videoModal.classList.remove('active');
      videoIframe.src = '';
    };

    if (videoClose) {
      videoClose.addEventListener('click', closeVideo);
    }

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideo();
      }
    });
  }

  // Gallery Sub-Filter (All, Photos, Videos, Social)
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const allGalleryCards = document.querySelectorAll('.gallery-grid-item');

  if (galleryFilterBtns.length && allGalleryCards.length) {
    galleryFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        galleryFilterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-gallery-filter');

        allGalleryCards.forEach((card) => {
          const type = card.getAttribute('data-type');
          if (filter === 'all' || type === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
}

/* ==========================================================================
   8. Toast Notification Utility
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="ri-checkbox-circle-fill"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   9. Animated Hero Stats Counters
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  function runCounter() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      const speed = 200; // lower is faster
      const increment = target / speed;

      let count = 0;
      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target + '+';
        }
      };

      updateCount();
    });
  }

  window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;
    const position = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (position < screenPosition && !animated) {
      runCounter();
      animated = true;
    }
  });
}

/* ==========================================================================
   10. Scroll-Triggered Entrance Animations
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });
}

/* ==========================================================================
   11. Hero 5-Slide Auto Carousel
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-slider-dots .dot');

  if (!slides.length || !dots.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));

    currentSlide = (index + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 1000);
  }

  function stopAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slideIdx = parseInt(dot.getAttribute('data-index'));
      showSlide(slideIdx);
      startAutoSlide(); // Reset timer on manual dot click
    });
  });

  // Pause auto slider on mouse enter
  const sliderWrapper = document.querySelector('.hero-slider');
  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
    sliderWrapper.addEventListener('mouseleave', startAutoSlide);
  }

  startAutoSlide();
}

/* ==========================================================================
   FAQ Accordion Module
   ========================================================================== */
function initFAQAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other open items
      faqItems.forEach((otherItem) => otherItem.classList.remove('active'));

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
