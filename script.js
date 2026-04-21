// ===== DOM Elements =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const loader = $('#loader');
const cursor = $('#cursor');
const cursorFollower = $('#cursorFollower');
const header = $('#header');
const menuBtn = $('#menuBtn');
const mobileMenu = $('#mobileMenu');
const navLinks = $$('.nav-link, .mobile-nav-link');
const filterBtns = $$('.filter-btn');
const productCards = $$('.product-card');
const contactForm = $('#contactForm');
const formSuccess = $('#formSuccess');
const backTopBtn = $('#backTop');
const heroBg = $('#heroBg');

// ===== i18n TRANSLATIONS =====
const translations = {
  en: {
    'nav.about': 'About Us',
    'nav.collections': 'Collections',
    'nav.process': 'Process',
    'nav.contact': 'Contact',
    'hero.title': '<span>Professional</span><em>Handbag</em><span>Manufacturer</span>',
    'hero.desc': 'Premium Handbag Manufacturer & OEM Supplier<br>Quality Excellence · Craftsmanship · Global Shipping',
    'hero.browse': 'Browse Products',
    'hero.contact': 'Contact Us',
    'hero.scroll': 'Scroll Down',
    'about.p1': 'Foshan Veinashe Bags Co., Ltd. is a professional handbag manufacturer and OEM supplier. We specialize in the design, production, and customization of high-quality leather bags, serving global brand clients and retailers.',
    'about.p2': 'From classic totes to trendy shoulder bags, crossbody bags, and clutches, we offer a diverse product line and flexible customization services to meet the unique needs of different markets and clients.',
    'stat.products': 'Products',
    'stat.collections': 'Collections',
    'stat.custom': 'OEM/ODM',
    'collections.title': '<em>Our</em> Collections',
    'collections.subtitle': 'Click on any product card to explore details and color options',
    'filter.all': 'All',
    'filter.specs': 'With Specs',
    'filter.gallery': 'Gallery',
    'product.inquire': 'Inquire Now',
    'badge.best': 'Best Seller',
    'badge.new': 'New',
    'p1.name': 'Dharma Stick Bag',
    'p2.name': 'Fashion Commuter Tote Crossbody',
    'p3.name': 'Down Pine Eaves Bag · Spring/Summer',
    'p4.name': 'Chinese Pearl Chain Handbag',
    'p4.desc': 'Hand-embroidered jacquard · Elegant Lady Shoulder Bag',
    'p5.name': 'Lacquer Leather Handbag 26cm',
    'p6.name': 'Niche Moon Bag',
    'p7.name': 'Splicing Kelly Bag · 2025 New',
    'p7.desc': 'Base 25/30cm · Handheld Box Bag · Versatile Crossbody',
    'p8.name': 'Retro Suede Shoulder Bag',
    'p9a.name': 'Small Trendy Crossbody Bag',
    'p9b.name': 'Classic Baseball Boston Bag',
    'p9b.desc': 'Medium Handbag · New Shoulder Crossbody',
    'p10.name': 'Niche Vegetable Basket Tote',
    'p11.name': 'Houndstooth Contrast Tote · Travel Bag',
    'g2.name': 'Classic Handbag Collection',
    'g2.desc': 'Multiple materials, sizes, colors & functions available',
    'gallery.name': 'Selected Handbags A',
    'gallery.name2': 'Selected Handbags B',
    'gallery.name3': 'Selected Handbags C',
    'gallery.name4': 'Selected Handbags D',
    'gallery.name5': 'Selected Handbags E',
    'gallery.name6': 'Selected Handbags F',
    'gallery.name7': 'Selected Handbags G',
    'gallery.name8': 'Selected Handbags H',
    'gallery.name9': 'Selected Handbags I',
    'gallery.name10': 'Selected Handbags J',
    'gallery.name11': 'Selected Handbags K',
    'gallery.name12': 'Selected Handbags L',
    'gallery.name13': 'Selected Handbags M',
    'gallery.desc': 'Multiple colors available · OEM Customization',
    'gallery.desc6': '6 selected styles · Various designs',
    'gallery.desc12': '12 selected styles · Various designs',
    'craft.title': 'OEM / ODM <em>Process</em>',
    'craft.subtitle': 'From requirement communication to final delivery — efficient & professional',
    'step1.title': 'Requirement',
    'step1.desc': 'Discuss with our sales team via phone, WeChat or email to confirm product style, material, quantity and delivery requirements.',
    'step2.title': 'Sample',
    'step2.desc': 'We create samples based on your needs, including material color card confirmation, hardware selection and craftsmanship details.',
    'step3.title': 'Production',
    'step3.desc': 'After sample approval, we arrange mass production with full quality control to ensure every product meets standards.',
    'step4.title': 'Delivery',
    'step4.desc': 'Finished products are inspected, carefully packaged and shipped via sea or air freight to your designated warehouse.',
    'contact.title': 'Get In <em>Touch</em>',
    'contact.desc': 'Whether for OEM customization, sample requests or wholesale inquiries, feel free to contact us anytime.',
    'contact.phone_label': 'Phone / WhatsApp',
    'contact.address_label': 'Address',
    'contact.address': 'Foshan, Guangdong, China',
    'contact.hours_label': 'Working Hours',
    'form.title': 'Inquiry / Cooperation',
    'form.name': 'Your Name *',
    'form.name_ph': 'Enter your name',
    'form.phone': 'Phone Number *',
    'form.phone_ph': 'Mobile / WhatsApp',
    'form.email': 'Email / WeChat',
    'form.email_ph': 'How we can reach you',
    'form.company': 'Company Name',
    'form.company_ph': 'Your company name',
    'form.type': 'Cooperation Type',
    'form.oem': 'OEM Manufacturing',
    'form.odm': 'ODM Design',
    'form.wholesale': 'Wholesale',
    'form.sample': 'Sample Request',
    'form.other': 'Other',
    'form.requirement': 'Requirements',
    'form.req_ph': 'Describe your needs: product style, quantity, budget, delivery time, etc.',
    'form.submit': 'Submit Inquiry',
    'form.success_title': 'Inquiry Received!',
    'form.success_desc': 'We will contact you within 1 business day. Please keep your phone available.',
    'footer.about': 'Professional handbag manufacturer and OEM supplier, providing high-quality leather bag design, production and customization services.',
    'footer.nav_title': 'Quick Links',
    'footer.service_title': 'Services',
    'footer.oem': 'OEM Manufacturing',
    'footer.odm': 'ODM Design',
    'footer.sample': 'Sample Customization',
    'footer.wholesale': 'Wholesale',
    'footer.contact_title': 'Contact',
    'payment.title': 'Payment Methods',
    'payment.subtitle': 'We support the following secure payment methods',
    'payment.paypal_desc': 'For sample orders and small transactions',
    'payment.bank_title': 'Bank Transfer (T/T)',
    'payment.bank_desc': 'For bulk orders',
    'payment.wise_desc': 'Fast and low-cost international payment',
    'payment.secure_note': '🔒 All payments are secure and processed under strict financial standards.',
  },
  zh: {} // Chinese is the default text in HTML, so empty
};

let currentLang = localStorage.getItem('veinashe-lang') || 'en';

// Store original Chinese defaults on first load
const _originals = new Map();
function cacheOriginals() {
  $$('[data-i18n]').forEach(el => {
    if (!_originals.has(el)) _originals.set(el, el.textContent);
  });
  $$('[data-i18n-html]').forEach(el => {
    if (!_originals.has(el)) _originals.set(el, el.innerHTML);
  });
  $$('[data-i18n-placeholder]').forEach(el => {
    if (!_originals.has(el)) _originals.set(el, el.placeholder);
  });
}
cacheOriginals();

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('veinashe-lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  $('#langLabel').textContent = lang === 'zh' ? 'EN' : '中';

  // Translate all data-i18n elements
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = translations[lang][key];
    if (text !== undefined) {
      el.textContent = text;
    } else {
      // Restore original Chinese text
      el.textContent = _originals.get(el) || el.textContent;
    }
  });

  // Translate HTML elements (hero title, section titles with <em>)
  $$('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const html = translations[lang][key];
    if (html !== undefined) {
      el.innerHTML = html;
    } else {
      el.innerHTML = _originals.get(el) || el.innerHTML;
    }
  });

  // Translate placeholders
  $$('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const ph = translations[lang][key];
    if (ph !== undefined) {
      el.placeholder = ph;
    } else {
      el.placeholder = _originals.get(el) || el.placeholder;
    }
  });

  // Translate marquee
  $$('[data-i18n-marquee]').forEach(track => {
    track.querySelectorAll('[data-en]').forEach(span => {
      const text = lang === 'zh' ? span.getAttribute('data-zh') : span.getAttribute('data-en');
      if (text) span.textContent = text;
    });
  });
}

// Init language on load
setLanguage(currentLang);

// Language switch button
$('#langSwitch').addEventListener('click', () => {
  setLanguage(currentLang === 'zh' ? 'en' : 'zh');
});

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1400);
  initReveal();
});

// ===== CUSTOM CURSOR (desktop only) =====
if (window.matchMedia('(pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverables = $$('a, button, .filter-btn, .product-card, .checkbox-item, .material-card, .product-gallery-thumbs img');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorFollower.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovered'));
  });
} else {
  cursor.style.display = 'none';
  cursorFollower.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// ===== HEADER SCROLL =====
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 60);
  backTopBtn.classList.toggle('visible', y > 600);
}, { passive: true });

// ===== MOBILE MENU =====
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  menuBtn.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

// ===== SCROLL REVEAL =====
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  $$('.reveal-up').forEach(el => observer.observe(el));
}

// ===== PRODUCT FILTER =====
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeUp 0.5s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== PRODUCT GALLERY THUMBS =====
$$('.product-card').forEach(card => {
  const mainImg = card.querySelector('.product-img-wrap img');
  const thumbs = card.querySelectorAll('.product-gallery-thumbs img');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const newSrc = thumb.src;
      mainImg.src = newSrc;
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
});

// ===== LIGHTBOX =====
const lightbox = $('#lightbox');
const lightboxImg = $('#lightboxImg');
const lightboxClose = $('#lightboxClose');
const lightboxPrev = $('#lightboxPrev');
const lightboxNext = $('#lightboxNext');
const lightboxCounter = $('#lightboxCounter');
let lightboxImages = [];
let lightboxIndex = 0;

function getAllImagesFromCard(card) {
  const imgs = [];
  const mainImg = card.querySelector('.product-img-wrap img');
  if (mainImg) imgs.push(mainImg.src);
  const thumbs = card.querySelectorAll('.product-gallery-thumbs img');
  thumbs.forEach(t => {
    if (!imgs.includes(t.src)) imgs.push(t.src);
  });
  return imgs;
}

function openLightbox(images, index) {
  lightboxImages = images;
  lightboxIndex = index;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightbox() {
  if (lightboxImages.length > 0) {
    lightboxImg.src = lightboxImages[lightboxIndex];
    lightboxCounter.textContent = (lightboxIndex + 1) + ' / ' + lightboxImages.length;
  }
}

$$('.product-img-wrap').forEach(wrap => {
  wrap.addEventListener('click', (e) => {
    if (e.target.closest('.product-overlay-btn')) return;
    const card = wrap.closest('.product-card');
    if (!card) return;
    const images = getAllImagesFromCard(card);
    openLightbox(images, 0);
  });
});

$$('.product-gallery-thumbs img').forEach(thumb => {
  thumb.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = thumb.closest('.product-card');
    if (!card) return;
    const images = getAllImagesFromCard(card);
    const idx = images.indexOf(thumb.src);
    openLightbox(images, idx >= 0 ? idx : 0);
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', () => {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  updateLightbox();
});
if (lightboxNext) lightboxNext.addEventListener('click', () => {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  updateLightbox();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length; updateLightbox(); }
  if (e.key === 'ArrowRight') { lightboxIndex = (lightboxIndex + 1) % lightboxImages.length; updateLightbox(); }
});

// ===== CONTACT FORM =====
const API_BASE = 'http://localhost:3001'; // Change to your production URL when deploying

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name')?.trim() || '';
    const phone = formData.get('phone')?.trim() || '';
    const email = formData.get('email')?.trim() || '';
    const company = formData.get('company')?.trim() || '';
    const requirement = formData.get('requirement')?.trim() || '';

    // Collect checked cooperation types
    const checkedTypes = [];
    contactForm.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
      checkedTypes.push(cb.value);
    });

    if (!name || !phone) return;

    // Disable submit button
    const submitBtn = contactForm.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';

    try {
      const res = await fetch(`${API_BASE}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          company,
          type: checkedTypes,
          requirement,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        formSuccess.classList.add('show');
        setTimeout(() => {
          formSuccess.classList.remove('show');
          contactForm.reset();
        }, 4000);
      } else {
        alert(data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please check your connection and try again.');
      console.error('Form submission error:', err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }
  });
}

// ===== BACK TO TOP =====
if (backTopBtn) {
  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SMOOTH ANCHOR SCROLL =====
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ===== CSS ANIMATION KEYFRAME (injected) =====
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ===== PARALLAX EFFECT ON HERO =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroBgEl = $('#heroBg');
  if (heroBgEl && scrollY < window.innerHeight) {
    heroBgEl.style.backgroundPositionY = (scrollY * 0.3) + 'px';
  }
}, { passive: true });

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const statNums = $$('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const text = entry.target.textContent;
        const match = text.match(/([\d,]+)/);
        if (match) {
          const target = parseInt(match[1].replace(/,/g, ''));
          const suffix = text.replace(match[1], '');
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            entry.target.textContent = Math.floor(current).toLocaleString() + suffix;
          }, 20);
        }
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(num => observer.observe(num));
}
animateCounters();
