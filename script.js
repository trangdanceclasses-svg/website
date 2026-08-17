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
  initHomeDriveGallery();
  initHomeDriveVideos();
  initFullGalleryPage();
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
  const galleryItems = document.querySelectorAll('.gallery-item:not([data-type="video"]):not(.see-more-card)');
  const videoItems = document.querySelectorAll('.gallery-item[data-type="video"], .gallery-video-item');

  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');
  const videoClose = document.getElementById('videoClose');

  // Photo Lightbox
  if (lightboxModal && lightboxImg) {
    if (galleryItems.length) {
      galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
          const img = item.querySelector('img');
          if (img) {
            lightboxImg.src = img.src;
            lightboxModal.classList.add('active');
          }
        });
      });
    }

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
  const closeVideo = () => {
    if (videoModal) videoModal.classList.remove('active');
    if (videoIframe) videoIframe.src = '';
  };

  if (videoModal && videoIframe) {
    if (videoItems.length) {
      videoItems.forEach((item) => {
        item.addEventListener('click', () => {
          const videoId = item.getAttribute('data-video-id') || 'dQw4w9WgXcQ';
          videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
          videoModal.classList.add('active');
        });
      });
    }

    if (videoClose) {
      videoClose.addEventListener('click', closeVideo);
    }

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideo();
      }
    });

    // Also close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
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

/* ==========================================================================
   GOOGLE DRIVE GALLERY ENGINE (Images + Videos from Drive Folders)
   ========================================================================== */
const GOOGLE_DRIVE_API_KEY = "AIzaSyCGmhdUOIpBGdYlRhxjXQX3IlUSr-CIiy4";
const GOOGLE_DRIVE_FOLDER_ID = "1Fqzyj2Gl9wIMz_IBUJRe9dQCilBylEOK";
const GOOGLE_DRIVE_VIDEO_FOLDER_ID = "1OGIYLtFYkYnEsY8MWBLqjssv_RnSL37k";

// Fallback sample photos displayed when API keys are not configured yet
const DEFAULT_DRIVE_FALLBACK_IMAGES = [
  { src: "image/image1.jpeg", name: "Contemporary & Ballet Practice" },
  { src: "image/image2.jpeg", name: "Indian Classical (Kathak) Session" },
  { src: "image/image3.jpeg", name: "Urban Hip Hop Grooves Cypher" },
  { src: "image/image4.jpeg", name: "Creative Art & Craft Studio" },
  { src: "image/image5.jpeg", name: "Studio Rehearsal Tour" },
  { src: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&auto=format&fit=crop&q=80", name: "Classical Heritage Stage Event" },
  { src: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=600&auto=format&fit=crop&q=80", name: "Bollywood Annual Celebration" },
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80", name: "Junior Kids Dance Graduation" }
];

// Fallback sample videos (used when Drive API is not reachable)
const DEFAULT_DRIVE_FALLBACK_VIDEOS = [
  { type: "video", driveId: "demo1", title: "Dance Practice Highlights", thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80" },
  { type: "video", driveId: "demo2", title: "Hip Hop Workshop Session", thumbnail: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=600&auto=format&fit=crop&q=80" },
  { type: "video", driveId: "demo3", title: "Classical Dance Recital", thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80" }
];

function isDriveConfigured() {
  return (
    GOOGLE_DRIVE_API_KEY !== "YOUR_GOOGLE_API_KEY" &&
    GOOGLE_DRIVE_FOLDER_ID !== "YOUR_GOOGLE_DRIVE_FOLDER_ID"
  );
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* Helper: Fetch files from a Google Drive folder */
async function fetchDriveFiles(folderId, mimeTypeFilter, maxResults) {
  let allFiles = [];
  let pageToken = null;

  do {
    const params = new URLSearchParams({
      key: GOOGLE_DRIVE_API_KEY,
      q: `'${folderId}' in parents and mimeType contains '${mimeTypeFilter}' and trashed = false`,
      fields: "nextPageToken,files(id,name,mimeType,modifiedTime)",
      orderBy: "modifiedTime desc",
      pageSize: maxResults ? String(maxResults) : "1000"
    });
    if (pageToken) params.append("pageToken", pageToken);

    const url = "https://www.googleapis.com/drive/v3/files?" + params.toString();
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error?.message || `Google Drive API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.files) allFiles.push(...data.files);
    pageToken = data.nextPageToken || null;

    // If we have a max and already have enough, stop
    if (maxResults && allFiles.length >= maxResults) {
      allFiles = allFiles.slice(0, maxResults);
      break;
    }
  } while (pageToken);

  return allFiles;
}

/* Helper to create gallery image cards */
function createDriveImageCard(src, name, fallbackSrc) {
  const card = document.createElement("div");
  card.className = "gallery-item animate-on-scroll animated";
  card.setAttribute("data-type", "photo");

  const onErrorAttr = fallbackSrc ? `onerror="this.src='${fallbackSrc}'"` : "";

  card.innerHTML = `
    <img src="${src}" alt="${escapeHTML(name)}" loading="lazy" ${onErrorAttr}>
    <div class="gallery-overlay">
      <i class="ri-zoom-in-line"></i>
      <h4>${escapeHTML(name)}</h4>
      <span style="font-size: 0.8rem; color: #cbd5e1;">Dance Studio Moment</span>
    </div>
  `;

  // Attach Lightbox preview listener
  card.addEventListener("click", () => {
    const lightboxModal = document.getElementById("lightboxModal");
    const lightboxImg = document.getElementById("lightboxImg");
    if (lightboxModal && lightboxImg) {
      lightboxImg.src = src;
      lightboxModal.classList.add("active");
    }
  });

  return card;
}

/* Helper to create Google Drive video cards */
function createDriveVideoCard(file) {
  const card = document.createElement("div");
  card.className = "gallery-item gallery-grid-item animate-on-scroll animated";
  card.setAttribute("data-type", "video");
  card.setAttribute("data-drive-video-id", file.id);

  const thumbnailURL = `https://drive.google.com/thumbnail?id=${file.id}&sz=w600`;
  const fallbackThumb = "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80";
  // Clean up filename for display (remove extension)
  const displayName = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");

  card.innerHTML = `
    <img src="${thumbnailURL}" alt="${escapeHTML(displayName)}" loading="lazy" onerror="this.src='${fallbackThumb}'">
    <span class="video-card-badge"><i class="ri-play-circle-fill"></i> Video</span>
    <div class="gallery-overlay" style="opacity: 1; background: rgba(15, 23, 42, 0.45);">
      <div class="video-play-btn"><i class="ri-play-fill"></i></div>
      <h4>${escapeHTML(displayName)}</h4>
      <span style="font-size: 0.8rem; color: #cbd5e1;">Google Drive Video</span>
    </div>
  `;

  card.addEventListener("click", () => {
    const videoModal = document.getElementById("videoModal");
    const videoIframe = document.getElementById("videoIframe");
    if (videoModal && videoIframe) {
      videoIframe.src = `https://drive.google.com/file/d/${file.id}/preview`;
      videoModal.classList.add("active");
    }
  });

  return card;
}

/* 1. Homepage Drive Gallery (Shows 3 images in Row 2) */
async function initHomeDriveGallery() {
  const container = document.getElementById("homeDriveImagesContainer") || document.getElementById("homeDriveGallery");
  const statusBox = document.getElementById("homeGalleryStatus");
  const errorBox = document.getElementById("homeGalleryError");

  if (!container) return;

  if (!isDriveConfigured()) {
    container.innerHTML = "";
    DEFAULT_DRIVE_FALLBACK_IMAGES.slice(0, 3).forEach((item) => {
      const card = createDriveImageCard(item.src, item.name);
      container.appendChild(card);
    });
    return;
  }

  try {
    const params = new URLSearchParams({
      key: GOOGLE_DRIVE_API_KEY,
      q: `'${GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: "files(id,name,mimeType,modifiedTime)",
      orderBy: "modifiedTime desc",
      pageSize: "3"
    });

    const url = "https://www.googleapis.com/drive/v3/files?" + params.toString();
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error?.message || `Google Drive API error: ${response.status}`);
    }

    const data = await response.json();
    const files = data.files || [];

    container.innerHTML = "";

    if (files.length === 0) {
      DEFAULT_DRIVE_FALLBACK_IMAGES.slice(0, 3).forEach((item) => {
        const card = createDriveImageCard(item.src, item.name);
        container.appendChild(card);
      });
      return;
    }

    files.slice(0, 3).forEach((file) => {
      const imageURL = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`;
      const fallbackURL = `https://drive.google.com/uc?export=view&id=${file.id}`;
      const card = createDriveImageCard(imageURL, file.name, fallbackURL);
      container.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = "";
    // Render fallback 3 images if network fails
    DEFAULT_DRIVE_FALLBACK_IMAGES.slice(0, 3).forEach((item) => {
      const card = createDriveImageCard(item.src, item.name);
      container.appendChild(card);
    });
  }
}

/* 1b. Homepage Drive Videos (Shows 3 videos in Row 1) */
async function initHomeDriveVideos() {
  const container = document.getElementById("homeDriveVideosContainer");
  if (!container) return;

  if (!isDriveConfigured()) {
    // Show fallback video cards
    DEFAULT_DRIVE_FALLBACK_VIDEOS.slice(0, 3).forEach((item) => {
      const fakeFile = { id: item.driveId, name: item.title };
      const card = createDriveVideoCard(fakeFile);
      container.appendChild(card);
    });
    return;
  }

  try {
    const files = await fetchDriveFiles(GOOGLE_DRIVE_VIDEO_FOLDER_ID, "video/", 3);
    container.innerHTML = "";

    if (files.length === 0) {
      DEFAULT_DRIVE_FALLBACK_VIDEOS.slice(0, 3).forEach((item) => {
        const fakeFile = { id: item.driveId, name: item.title };
        const card = createDriveVideoCard(fakeFile);
        container.appendChild(card);
      });
      return;
    }

    files.slice(0, 3).forEach((file) => {
      const card = createDriveVideoCard(file);
      container.appendChild(card);
    });

  } catch (error) {
    console.error("Drive video fetch error:", error);
    container.innerHTML = "";
    DEFAULT_DRIVE_FALLBACK_VIDEOS.slice(0, 3).forEach((item) => {
      const fakeFile = { id: item.driveId, name: item.title };
      const card = createDriveVideoCard(fakeFile);
      container.appendChild(card);
    });
  }
}

/* 2. Full Dedicated Gallery Page (Supports All, Image, Video Filters & Drive Sync) */
async function initFullGalleryPage() {
  const container = document.getElementById("fullDriveGallery");
  const statusBox = document.getElementById("fullGalleryStatus");
  const errorBox = document.getElementById("fullGalleryError");
  const filterBtns = document.querySelectorAll(".full-gallery-filter-btn");

  if (!container) return;

  let driveVideoItems = []; // { type: "video", file: {id, name} }
  let driveImageItems = []; // { type: "image", src, fallbackSrc, name }
  let currentFilter = "all";

  if (isDriveConfigured()) {
    if (statusBox) statusBox.innerHTML = `<div class="loading"><i class="ri-loader-4-line spin-icon"></i> Syncing media from Google Drive...</div>`;

    // Fetch Drive Videos
    try {
      const videoFiles = await fetchDriveFiles(GOOGLE_DRIVE_VIDEO_FOLDER_ID, "video/", null);
      videoFiles.forEach((file) => {
        driveVideoItems.push({ type: "video", file: file });
      });
    } catch (err) {
      console.error("Drive video fetch error:", err);
    }

    // Fetch Drive Images
    try {
      const imageFiles = await fetchDriveFiles(GOOGLE_DRIVE_FOLDER_ID, "image/", null);
      imageFiles.forEach((file) => {
        driveImageItems.push({
          type: "image",
          src: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
          fallbackSrc: `https://drive.google.com/uc?export=view&id=${file.id}`,
          name: file.name
        });
      });
    } catch (err) {
      console.error("Drive image fetch error:", err);
      if (errorBox) {
        errorBox.style.display = "block";
        errorBox.innerHTML = `<div class="error-card">Google Drive error: ${escapeHTML(err.message)}</div>`;
      }
    }
  }

  // Fallback images if empty
  if (driveImageItems.length === 0) {
    DEFAULT_DRIVE_FALLBACK_IMAGES.forEach((item) => {
      driveImageItems.push({ type: "image", src: item.src, name: item.name });
    });
  }

  // Fallback videos if empty
  if (driveVideoItems.length === 0) {
    DEFAULT_DRIVE_FALLBACK_VIDEOS.forEach((item) => {
      driveVideoItems.push({ type: "video", file: { id: item.driveId, name: item.title } });
    });
  }

  // Render function according to active filter (all, image, video)
  function renderGallery() {
    container.innerHTML = "";
    let itemsToRender = [];

    if (currentFilter === "all") {
      itemsToRender = [...driveVideoItems, ...driveImageItems];
    } else if (currentFilter === "video") {
      itemsToRender = [...driveVideoItems];
    } else if (currentFilter === "image") {
      itemsToRender = [...driveImageItems];
    }

    if (statusBox) {
      const typeLabel = currentFilter === "all" ? "media item(s)" : currentFilter + "(s)";
      statusBox.innerHTML = `Showing <strong>${itemsToRender.length}</strong> ${typeLabel}`;
    }

    itemsToRender.forEach((item) => {
      if (item.type === "video") {
        const card = createDriveVideoCard(item.file);
        container.appendChild(card);
      } else {
        const card = createDriveImageCard(item.src, item.name, item.fallbackSrc);
        container.appendChild(card);
      }
    });
  }

  // Attach Filter Button Listeners
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      renderGallery();
    });
  });

  // Initial render
  renderGallery();
}
