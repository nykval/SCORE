const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.8 }
);

document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

const logoObject = document.querySelector('[data-logo-object]');

if (logoObject) {
  const logoItems = [
    { src: './assets/logo-objects/object-1.png', alt: 'Футбольный мяч' },
    { src: './assets/logo-objects/object-2.png', alt: 'Баскетбольный мяч' },
    { src: './assets/logo-objects/object-3.png', alt: 'Теннисный мяч' },
    { src: './assets/logo-objects/object-4.png', alt: 'Волейбольный мяч' },
    { src: './assets/logo-objects/object-5.png', alt: 'Хоккейная шайба' }
  ];

  const layers = logoObject.querySelectorAll('.score-object-img');
  let activeLayer = layers[0];
  let passiveLayer = layers[1];
  let currentIndex = 0;
  let rotateTimer = null;
  let isAnimating = false;

  if (activeLayer && passiveLayer) {
    activeLayer.src = logoItems[currentIndex].src;
    activeLayer.alt = logoItems[currentIndex].alt;
    passiveLayer.src = logoItems[(currentIndex + 1) % logoItems.length].src;
    passiveLayer.alt = '';
  }

  function scheduleRotation() {
    window.clearInterval(rotateTimer);
    rotateTimer = window.setInterval(() => {
      switchToNextObject();
    }, 5000);
  }

  function switchToNextObject(instant = false) {
    if (isAnimating || !activeLayer || !passiveLayer) return;

    const nextIndex = (currentIndex + 1) % logoItems.length;
    isAnimating = true;

    passiveLayer.src = logoItems[nextIndex].src;
    passiveLayer.alt = logoItems[nextIndex].alt;

    if (instant) {
      logoObject.classList.add('is-instant');
      activeLayer.classList.remove('is-active', 'is-exit', 'is-enter');
      activeLayer.classList.add('is-hidden-now');
      passiveLayer.classList.remove('is-exit', 'is-enter', 'is-hidden-now');
      passiveLayer.classList.add('is-active');

      const prevLayer = activeLayer;
      activeLayer = passiveLayer;
      passiveLayer = prevLayer;
      passiveLayer.classList.remove('is-active', 'is-enter', 'is-exit');
      passiveLayer.alt = '';

      currentIndex = nextIndex;
      isAnimating = false;
      requestAnimationFrame(() => {
        logoObject.classList.remove('is-instant');
      });
      return;
    }

    requestAnimationFrame(() => {
      activeLayer.classList.add('is-hidden-now');
      activeLayer.classList.remove('is-active', 'is-enter', 'is-exit');
      passiveLayer.classList.remove('is-hidden-now', 'is-exit');
      passiveLayer.classList.add('is-enter');
    });

    const onFinish = (event) => {
      if (event.target !== passiveLayer || event.propertyName !== 'opacity') return;
      passiveLayer.removeEventListener('transitionend', onFinish);

      activeLayer.classList.remove('is-active', 'is-exit', 'is-hidden-now', 'is-enter');
      passiveLayer.classList.remove('is-enter');
      passiveLayer.classList.add('is-active');

      const prevLayer = activeLayer;
      activeLayer = passiveLayer;
      passiveLayer = prevLayer;
      passiveLayer.classList.remove('is-active', 'is-enter', 'is-exit', 'is-hidden-now');
      passiveLayer.alt = '';

      currentIndex = nextIndex;
      isAnimating = false;
    };

    passiveLayer.addEventListener('transitionend', onFinish);
  }

  logoObject.addEventListener('mouseenter', () => {
    switchToNextObject(true);
    scheduleRotation();
  });

  logoObject.addEventListener('click', () => {
    switchToNextObject(true);
    scheduleRotation();
  });

  scheduleRotation();
}

const heroTitle = document.querySelector('.hero-title');

if (heroTitle) {
  const palette = ['#3a85fd', '#e82644', '#74eb89', '#fcc005'];
  const lineChunks = heroTitle.innerHTML.split('<br>');
  const letters = [];

  heroTitle.innerHTML = '';

  lineChunks.forEach((chunk, lineIndex) => {
    for (const ch of chunk) {
      if (ch === ' ') {
        heroTitle.appendChild(document.createTextNode(' '));
        continue;
      }

      const span = document.createElement('span');
      span.className = 'hero-letter';
      span.textContent = ch;
      span.dataset.idx = String(letters.length);
      span.dataset.cooling = '0';
      span.dataset.activeColor = '';
      letters.push(span);
      heroTitle.appendChild(span);
    }

    if (lineIndex < lineChunks.length - 1) {
      heroTitle.appendChild(document.createElement('br'));
    }
  });

  function colorAt(index) {
    if (index < 0 || index >= letters.length) return '';
    return letters[index].dataset.activeColor || '';
  }

  function createsTriple(index, color) {
    return (
      (colorAt(index - 2) === color && colorAt(index - 1) === color) ||
      (colorAt(index - 1) === color && colorAt(index + 1) === color) ||
      (colorAt(index + 1) === color && colorAt(index + 2) === color)
    );
  }

  function pickColor(index) {
    const shuffled = [...palette].sort(() => Math.random() - 0.5);
    for (const candidate of shuffled) {
      if (!createsTriple(index, candidate)) {
        return candidate;
      }
    }
    return shuffled[0];
  }

  letters.forEach((letter) => {
    letter.addEventListener('mouseenter', () => {
      if (letter.dataset.cooling === '1') return;
      letter.classList.remove('is-cooling');
      const index = Number(letter.dataset.idx);
      const nextColor = pickColor(index);
      letter.style.color = nextColor;
      letter.dataset.activeColor = nextColor;
    });

    letter.addEventListener('mouseleave', () => {
      if (!letter.dataset.activeColor) return;
      letter.dataset.cooling = '1';
      letter.classList.add('is-cooling');
      letter.style.color = '';

      const onEnd = (event) => {
        if (event.propertyName !== 'color') return;
        letter.removeEventListener('transitionend', onEnd);
        letter.dataset.activeColor = '';
        letter.dataset.cooling = '0';
        letter.classList.remove('is-cooling');
      };

      letter.addEventListener('transitionend', onEnd);
    });
  });
}

const howSteps = document.querySelectorAll('#how .step');
const howSection = document.querySelector('#how');

if (howSection && howSteps.length) {
  let flipPlayed = false;
  const stepFlipObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || flipPlayed) return;
        flipPlayed = true;
        howSteps.forEach((step, index) => {
          window.setTimeout(() => {
            step.classList.add('is-flipping');
            const clearFlipClass = () => {
              step.classList.remove('is-flipping');
            };
            step.addEventListener('animationend', clearFlipClass, { once: true });
          }, index * 180);
        });
        stepFlipObserver.unobserve(howSection);
      });
    },
    { threshold: 0.72, rootMargin: "0px 0px -8% 0px" }
  );
  stepFlipObserver.observe(howSection);
}

function animateCount(node) {
  const target = Number(node.dataset.count || 0);
  const duration = 1100;
  const start = performance.now();

  function frame(time) {
    const p = Math.min(1, (time - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    node.textContent = Math.floor(target * eased);
    if (p < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

const tiltCards = document.querySelectorAll('.tilt');

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const dx = (event.clientX - rect.left) / rect.width - 0.5;
    const dy = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateX = -dy * 6;
    const rotateY = dx * 6;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
