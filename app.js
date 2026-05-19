/* ============ FG ARTROMEDICA — interactions ============ */

// ---------- Active nav link ----------
(() => {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ---------- Sticky nav ----------
(() => {
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ---------- Catalog filter ----------
(() => {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;
  const chips = document.querySelectorAll('#filters .chip');
  const cards = grid.querySelectorAll('.cat-card');

  // Update counts
  const counts = { all: cards.length };
  cards.forEach(c => {
    const cat = c.dataset.cat;
    counts[cat] = (counts[cat] || 0) + 1;
  });
  document.querySelectorAll('[data-count]').forEach(el => {
    const k = el.getAttribute('data-count');
    el.textContent = ' · ' + (counts[k] || 0);
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const f = chip.dataset.filter;
      cards.forEach(card => {
        const show = f === 'all' || card.dataset.cat === f;
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();

// ---------- Scroll reveal ----------
(() => {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -80px 0px' });
  els.forEach(el => io.observe(el));

  // Fallback: if for any reason an element stays hidden after page load + 2s, reveal it.
  setTimeout(() => {
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 200) el.classList.add('in');
    });
  }, 2500);
})();

// ---------- Form handler (demo) ----------
(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const original = btn.innerHTML;
    btn.innerHTML = '✓ Solicitud enviada';
    btn.style.background = '#10A56C';
    btn.style.color = '#fff';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      form.reset();
    }, 2800);
  });
})();

// ---------- Smooth scroll for nav anchors (offset for sticky nav) ----------
(() => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length <= 1) return;
      const t = document.querySelector(href);
      if (!t) return;
      e.preventDefault();
      const offset = 70;
      const y = t.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();

// ---------- Mobile nav ----------
(() => {
  const btn = document.getElementById('mobile-toggle');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    if (open) {
      links.style.display = '';
    } else {
      links.style.display = 'flex';
      links.style.position = 'absolute';
      links.style.top = '100%';
      links.style.left = '16px';
      links.style.right = '16px';
      links.style.background = '#fff';
      links.style.flexDirection = 'column';
      links.style.padding = '12px';
      links.style.borderRadius = '14px';
      links.style.boxShadow = '0 12px 32px rgba(11, 31, 63, 0.18)';
      links.style.border = '1px solid var(--c-line)';
      links.style.marginTop = '8px';
    }
  });
})();

