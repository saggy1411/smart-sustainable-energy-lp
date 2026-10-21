function hbar(label,val,max){const pct=(val/max*100).toFixed(1);return `<div class="hbar-row"><span>${label}</span><div class="hbar-track"><div class="hbar-fill" style="width:${pct}%"></div></div><span>${val}M</span></div>`;}

const metabEl = document.getElementById('metab');
if (metabEl) {
  const metab=[["Abdominal obesity",351],["Hypertension",315],["Generalised obesity",254],["High cholesterol",213],["Prediabetes",136],["Diabetes",101]];
  metabEl.innerHTML=metab.map(m=>hbar(m[0],m[1],351)).join('');
}

const marketEl = document.getElementById('market');
if (marketEl) {
  const market=[8.9,9.9,11.0,12.2,13.6,15.1,16.7,18.6,20.7,23.1];
  const years=['25','26','27','28','29','30','31','32','33','34']; const mMax=23.1;
  marketEl.innerHTML=market.map((v,i)=>`<div class="vbar" style="height:${(v/mMax*100)}%">${(i===0||i===5||i===9)?`<span>${v}</span>`:''}<em>'${years[i]}</em></div>`).join('');
}

function range(label,entry,senior,scaleMax,showMark){
  const l=(entry/scaleMax*100), w=((senior-entry)/scaleMax*100);
  const mark=showMark?`<div class="pathway-mark" style="left:${32/scaleMax*100}%;background:#e31e24;"></div>`:'';
  return `<div class="pathway-row"><span>${label}</span><div class="pathway-track"><div class="pathway-fill" style="left:${l}%;width:${w}%"></div>${mark}</div><span>₹${entry}–${senior}L</span></div>`;
}

const pathwaysEl = document.getElementById('pathways');
if (pathwaysEl) {
  const paths=[["Freelance / Private Practice",1,30],["Corporate Wellness",4,18],["Clinical Nutritionist",3,18],["Food Safety Officer (FSSAI)",5.4,17.1],["Private Hospitals",3,15],["Sports Nutritionist",3.5,14],["Government Hospitals",2.5,9]];
  pathwaysEl.innerHTML='<p style="font-size:11.5px;color:rgba(255,255,255,.65);margin-bottom:14px;">Red marker = SSPU top placement package of 32 LPA benchmark</p>'+paths.map(p=>range(p[0],p[1],p[2],32,true)).join('');
}

const expEl = document.getElementById('experience');
if (expEl) {
  const exp=[["0-2 yrs",2.8],["3-5 yrs",4.5],["6-10 yrs",10.8],["10+ yrs",13]]; const eMax=13;
  expEl.innerHTML=exp.map(e=>`<div class="vbar" style="height:${(e[1]/eMax*100)}%;background:#e31e24;"><span style="color:#ffffff;font-weight:700;">₹${e[1]}L</span><em style="color:rgba(255,255,255,.8);">${e[0]}</em></div>`).join('');
}

const citytierEl = document.getElementById('citytier');
if (citytierEl) {
  const city=[["Metro — Mumbai, Delhi, Bengaluru",6,12],["Tier 2 — Pune, Hyderabad (SSPU here)",5,9],["Smaller cities — Jaipur, Lucknow",3,5.5]];
  citytierEl.innerHTML=city.map(c=>range(c[0],c[1],c[2],14,false)).join('');
}

// STAT STRIP IS STATIC (ANIMATIONS REMOVED)

// UNIFIED MARKET & CAREERS ON-SCROLL RISING ANIMATION & FILTER CONTROLLER
(function initScrollRiseCards() {
  const riseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.scroll-rise-card').forEach(card => {
    riseObserver.observe(card);
  });

  // METRIC DASHBOARD FILTER INTERACTION
  document.querySelectorAll('.m-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.m-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.metric-card-wrap').forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          const riseCard = card.querySelector('.scroll-rise-card');
          if (riseCard) {
            riseCard.classList.remove('in-view');
            void riseCard.offsetWidth;
            riseCard.classList.add('in-view');
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

// CAREER ROLES CAROUSEL LOGIC
(function initRolesCarousel() {
  const track = document.getElementById('rolesTrack');
  const prevBtn = document.getElementById('rolesPrevBtn');
  const nextBtn = document.getElementById('rolesNextBtn');
  const dotsContainer = document.getElementById('rolesDots');

  if (!track || !prevBtn || !nextBtn) return;

  const items = track.querySelectorAll('.roles-carousel-item');
  const totalItems = items.length;
  let currentIndex = 0;

  function getItemsPerPage() {
    if (window.innerWidth <= 576) return 1;
    if (window.innerWidth <= 991) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, totalItems - getItemsPerPage());
  }

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const pages = maxIndex() + 1;
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('div');
      dot.className = `roles-dot ${i === currentIndex ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateCarousel() {
    const itemWidth = items[0].getBoundingClientRect().width;
    const gap = 16;
    const offset = currentIndex * (itemWidth + gap);
    
    track.style.transform = `translateX(-${offset}px)`;

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.roles-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
  }

  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex()));
    updateCarousel();
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex();
    }
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex()) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    if (currentIndex > maxIndex()) {
      currentIndex = maxIndex();
    }
    createDots();
    updateCarousel();
  });

  createDots();
  updateCarousel();
})();

// AUTOMATIC PLACEMENT POSTER CAROUSEL (2 ITEMS DESKTOP, 1 ITEM MOBILE)
(function initPlacementCarousel() {
  const viewport = document.getElementById('placementCarousel');
  const track = document.getElementById('placementTrack');
  const dotsContainer = document.getElementById('placementDots');
  if (!viewport || !track || !dotsContainer) return;

  const slides = track.querySelectorAll('.placement-slide');
  const slideCount = slides.length;
  let currentIndex = 0;
  let autoTimer = null;

  function getItemsPerPage() {
    return window.innerWidth >= 768 ? 2 : 1;
  }

  function getMaxIndex() {
    return Math.max(0, slideCount - getItemsPerPage());
  }

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const totalPages = getMaxIndex() + 1;
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = `placement-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    const maxIdx = getMaxIndex();
    if (index > maxIdx) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = maxIdx;
    } else {
      currentIndex = index;
    }

    const itemsPerPage = getItemsPerPage();
    const stepPct = 100 / itemsPerPage;
    track.style.transform = `translateX(-${currentIndex * stepPct}%)`;

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.placement-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
  }

  function startAutoplay() {
    stopAutoplay();
    autoTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 3500);
  }

  function stopAutoplay() {
    if (autoTimer) clearInterval(autoTimer);
  }

  window.addEventListener('resize', () => {
    if (currentIndex > getMaxIndex()) {
      currentIndex = getMaxIndex();
    }
    createDots();
    goToSlide(currentIndex);
  });

  viewport.addEventListener('mouseenter', stopAutoplay);
  viewport.addEventListener('mouseleave', startAutoplay);

  // Touch Swipe Support for Mobile Screens
  let touchStartX = 0;
  let touchCurrentX = 0;
  let isSwiping = false;

  viewport.addEventListener('touchstart', (e) => {
    stopAutoplay();
    touchStartX = e.touches[0].clientX;
    touchCurrentX = touchStartX;
    isSwiping = true;
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    touchCurrentX = e.touches[0].clientX;
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    if (!isSwiping) return;
    isSwiping = false;
    const diffX = touchStartX - touchCurrentX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }
    touchStartX = 0;
    touchCurrentX = 0;
    startAutoplay();
  });

  createDots();
  goToSlide(0);
  startAutoplay();
})();

// GLOBAL APPLY NOW TRIGGER CONTROLLER: ALL APPLY NOW BUTTONS SCROLL DIRECTLY TO THE FORM
(function initApplyNowTriggers() {
  function scrollToForm() {
    const formContainer = document.getElementById('get-in-touch-form') || document.querySelector('.card-get-in-touch');
    if (formContainer) {
      const rect = formContainer.getBoundingClientRect();
      const offsetTop = window.pageYOffset + rect.top - 80;
      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth'
      });
      const nameInput = formContainer.querySelector('input');
      if (nameInput) {
        setTimeout(() => nameInput.focus({ preventScroll: true }), 450);
      }
    }
  }

  document.addEventListener('click', function(e) {
    const trigger = e.target.closest('a[href*="get-in-touch-form"], a[href="#"], .navcta, .sticky-apply-btn, .pri');
    if (!trigger) return;

    const text = (trigger.innerText || trigger.textContent || '').toUpperCase();
    const isApplyBtn = text.includes('APPLY') || text.includes('BROCHURE') || trigger.classList.contains('navcta') || trigger.classList.contains('sticky-apply-btn') || trigger.id === 'stickyApplyBtn' || trigger.classList.contains('pri');

    if (isApplyBtn) {
      e.preventDefault();
      scrollToForm();
    }
  });

  const stickyBtn = document.getElementById('stickyApplyBtn');
  if (stickyBtn) {
    stickyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      scrollToForm();
    });
  }
})();
