const DEFAULT_SITE_SETTINGS = {
  companyName: 'A New Era Developers',
  companyTagline: 'Crafting legacy through visionary land and construction.',
  phone: '+917208324505',
  email: 'aneweradevelopers@gmail.com',
  address: 'Shanti Enclave, B-603, near Mira Road, Shanti Vihar, Mira Road East, Thane, Mira Bhayandar, Maharashtra 401107',
  mapLink: 'https://maps.app.goo.gl/8gdfFF9iGdgBigTX6',
  reraNo: 'Applied',
  heroLabel: '--- DHOLERA SIR · MIRA ROAD ---',
  heroTitle: "Building Tomorrow's Legacy",
  heroSubtitle: 'Premium Land & Architectural Construction Across India',
  heroStat1: '12+ Years',
  heroStat2: '500+ Plots',
  heroStat3: '3 Landmark Projects',
  heroStat4: '₹500Cr+ Assets',
  heroImage1: 'public/images/s1.jpg',
  heroImage2: 'public/images/s2.jpg',
  heroImage3: 'public/images/s3.jpg',
  whatsappNumber: '917208324505'
};

document.addEventListener('DOMContentLoaded', () => {
  const settings = getSiteSettings();
  const whatsappNumber = normalizeWaNumber(settings.whatsappNumber || settings.phone);

  applySiteSettings(settings);

  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const revealTargets = document.querySelectorAll('[data-reveal]');
  if (revealTargets.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.18 });
    revealTargets.forEach((target) => revealObserver.observe(target));
  }

  document.querySelectorAll('[data-wa-message]').forEach((button) => {
    button.addEventListener('click', () => {
      const message = button.getAttribute('data-wa-message') || 'Hello A New Era Developers, I would like to know more.';
      openWhatsApp(whatsappNumber, message);
    });
  });

  document.querySelectorAll('form[data-wa-form]').forEach((form) => {
    const trigger = form.querySelector('[data-wa-submit]');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const name = form.querySelector('[name="name"]')?.value?.trim() || 'Not shared';
      const phone = form.querySelector('[name="phone"]')?.value?.trim() || 'Not shared';
      const email = form.querySelector('[name="email"]')?.value?.trim() || 'Not shared';
      const note = form.querySelector('[name="message"]')?.value?.trim() || 'No message provided';
      const page = form.getAttribute('data-wa-form');
      const message = `New enquiry (${page})\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nNotes: ${note}`;
      openWhatsApp(whatsappNumber, message);
    });
  });
});

function openWhatsApp(number, message) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${number}?text=${encoded}`, '_blank', 'noopener,noreferrer');
}

function getSiteSettings() {
  const raw = localStorage.getItem('aneweraSiteSettings');
  if (!raw) return { ...DEFAULT_SITE_SETTINGS };
  try {
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SITE_SETTINGS, ...parsed };
  } catch (error) {
    return { ...DEFAULT_SITE_SETTINGS };
  }
}

function applySiteSettings(settings) {
  document.querySelectorAll('[data-site-text]').forEach((element) => {
    const key = element.getAttribute('data-site-text');
    if (!key || !(key in settings)) return;
    element.textContent = settings[key];
  });

  document.querySelectorAll('[data-site-phone-link]').forEach((element) => {
    element.setAttribute('href', `tel:${settings.phone}`);
    if (!element.hasAttribute('data-site-text')) {
      element.textContent = humanPhone(settings.phone);
    }
  });

  document.querySelectorAll('[data-site-email-link]').forEach((element) => {
    element.setAttribute('href', `mailto:${settings.email}`);
    if (!element.hasAttribute('data-site-text')) {
      element.textContent = settings.email;
    }
  });

  document.querySelectorAll('[data-site-map-link]').forEach((element) => {
    element.setAttribute('href', settings.mapLink);
  });

  document.querySelectorAll('[data-site-whatsapp-link]').forEach((element) => {
    const msg = element.getAttribute('data-site-wa-default') || `Hello ${settings.companyName}, I would like to know more.`;
    const encoded = encodeURIComponent(msg);
    element.setAttribute('href', `https://wa.me/${normalizeWaNumber(settings.whatsappNumber || settings.phone)}?text=${encoded}`);
  });

  document.querySelectorAll('[data-hero-slide]').forEach((element) => {
    const idx = element.getAttribute('data-hero-slide');
    const key = `heroImage${idx}`;
    if (!settings[key]) return;
    element.style.backgroundImage = `url('${settings[key]}')`;
  });

  const dynamicMap = document.querySelector('[data-site-map-embed]');
  if (dynamicMap) {
    const encodedAddress = encodeURIComponent(settings.address);
    dynamicMap.setAttribute('src', `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`);
  }
}

function humanPhone(phone) {
  if (!phone.startsWith('+91')) return phone;
  const raw = phone.replace(/\s+/g, '');
  if (raw.length !== 13) return phone;
  return `+91 ${raw.slice(3, 8)} ${raw.slice(8)}`;
}

function normalizeWaNumber(value) {
  return String(value || '').replace(/[^\d]/g, '');
}

