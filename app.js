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

const topbar = document.querySelector('.topbar');
const menuToggleButton = document.querySelector('[data-menu-toggle]');
const topbarMenuLinks = document.querySelectorAll('.topbar .menu a');
const mobileMenuQuery = window.matchMedia('(max-width: 760px)');

function closeTopbarMenu() {
  if (!topbar || !menuToggleButton) return;
  topbar.classList.remove('is-menu-open');
  menuToggleButton.setAttribute('aria-expanded', 'false');
}

if (topbar && menuToggleButton) {
  menuToggleButton.addEventListener('click', () => {
    const isOpen = topbar.classList.toggle('is-menu-open');
    menuToggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  topbarMenuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeTopbarMenu();
    });
  });

  const onViewportChange = (event) => {
    if (!event.matches) {
      closeTopbarMenu();
    }
  };

  if (typeof mobileMenuQuery.addEventListener === 'function') {
    mobileMenuQuery.addEventListener('change', onViewportChange);
  } else if (typeof mobileMenuQuery.addListener === 'function') {
    mobileMenuQuery.addListener(onViewportChange);
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenuQuery.matches && topbar.classList.contains('is-menu-open')) {
      closeTopbarMenu();
    }
  });
}

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
      activeLayer.classList.remove('is-active', 'is-enter', 'is-exit');
      activeLayer.classList.add('is-hidden-now');
      passiveLayer.classList.remove('is-enter', 'is-exit', 'is-hidden-now');
      passiveLayer.classList.add('is-active');

      const prevLayer = activeLayer;
      activeLayer = passiveLayer;
      passiveLayer = prevLayer;
      passiveLayer.classList.remove('is-active', 'is-enter', 'is-exit');
      passiveLayer.classList.add('is-hidden-now');
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

      activeLayer.classList.remove('is-active', 'is-enter', 'is-exit', 'is-hidden-now');
      passiveLayer.classList.remove('is-enter');
      passiveLayer.classList.add('is-active');

      const prevLayer = activeLayer;
      activeLayer = passiveLayer;
      passiveLayer = prevLayer;
      passiveLayer.classList.remove('is-active', 'is-enter', 'is-exit');
      passiveLayer.classList.add('is-hidden-now');
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

const palette = ['#3a85fd', '#e82644', '#74eb89', '#fcc005'];
const interactiveGroups = document.querySelectorAll('.hero-title-main, .hero-title-accent');
const allInteractiveLetters = [];

interactiveGroups.forEach((group) => {
  const original = group.innerHTML;
  const chunks = original.split('<br>');
  group.innerHTML = '';

  chunks.forEach((chunk, chunkIndex) => {
    const line = document.createElement('span');
    line.className = 'hero-line';

    for (const char of chunk) {
      if (char === ' ') {
        line.appendChild(document.createTextNode(' '));
        continue;
      }
      const span = document.createElement('span');
      span.className = 'hero-letter';
      span.textContent = char;
      span.dataset.idx = String(allInteractiveLetters.length);
      span.dataset.activeColor = '';
      allInteractiveLetters.push(span);
      line.appendChild(span);
    }
    group.appendChild(line);

    if (chunkIndex < chunks.length - 1) {
      group.appendChild(document.createElement('br'));
    }
  });
});

function colorAt(index) {
  if (index < 0 || index >= allInteractiveLetters.length) return '';
  return allInteractiveLetters[index].dataset.activeColor || '';
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
    if (!createsTriple(index, candidate)) return candidate;
  }
  return shuffled[0];
}

const letterResetTimers = new WeakMap();
let easterBallNode = null;
let easterBallRunning = false;
let easterBallLastRun = 0;

function getEasterBallNode() {
  if (easterBallNode) return easterBallNode;
  const ball = document.createElement('div');
  ball.className = 'easter-ball';
  ball.setAttribute('aria-hidden', 'true');
  ball.innerHTML = '<img src="./assets/logo-objects/object-1.png" alt="">';
  document.body.appendChild(ball);
  easterBallNode = ball;
  return easterBallNode;
}

function triggerEasterBall() {
  const now = Date.now();
  if (easterBallRunning || now - easterBallLastRun < 1800) return;

  const ball = getEasterBallNode();
  easterBallRunning = true;
  easterBallLastRun = now;
  ball.classList.remove('is-running');
  void ball.offsetWidth;
  ball.classList.add('is-running');

  const finish = () => {
    ball.classList.remove('is-running');
    easterBallRunning = false;
    ball.removeEventListener('animationend', finish);
  };

  ball.addEventListener('animationend', finish);
}

allInteractiveLetters.forEach((letter) => {
  letter.addEventListener('mouseenter', () => {
    if (letter.classList.contains('is-lit')) return;

    const oldTimer = letterResetTimers.get(letter);
    if (oldTimer) {
      window.clearTimeout(oldTimer);
      letterResetTimers.delete(letter);
    }

    letter.classList.remove('is-resetting');
    const index = Number(letter.dataset.idx);
    const nextColor = pickColor(index);
    letter.style.color = nextColor;
    letter.dataset.activeColor = nextColor;
    letter.classList.add('is-lit');

    const isAllPainted = allInteractiveLetters.length > 0
      && allInteractiveLetters.every((item) => item.dataset.activeColor);
    if (isAllPainted) {
      triggerEasterBall();
    }

    const timerId = window.setTimeout(() => {
      letter.classList.add('is-resetting');
      letter.classList.remove('is-lit');
      letter.style.color = '';
      letter.dataset.activeColor = '';
      window.setTimeout(() => {
        letter.classList.remove('is-resetting');
      }, 0);
      letterResetTimers.delete(letter);
    }, 7000);

    letterResetTimers.set(letter, timerId);
  });
});

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
            step.addEventListener('animationend', () => step.classList.remove('is-flipping'), { once: true });
          }, index * 180);
        });
        stepFlipObserver.unobserve(howSection);
      });
    },
    { threshold: 0.72, rootMargin: '0px 0px -8% 0px' }
  );
  stepFlipObserver.observe(howSection);
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

const productSwitch = document.querySelector('.product-switch');
const productTabs = document.querySelectorAll('[data-product-tab]');
const productViews = document.querySelectorAll('[data-product-view]');

function setProductView(viewName) {
  productTabs.forEach((tab) => {
    const isActive = tab.dataset.productTab === viewName;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  productViews.forEach((view) => {
    const isActive = view.dataset.productView === viewName;
    view.classList.toggle('is-active', isActive);
  });

  if (productSwitch) {
    productSwitch.classList.toggle('is-crm', viewName === 'crm');
  }
}

productTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.productTab || 'play';
    setProductView(target);
  });
});

const modal = document.querySelector('[data-form-modal]');
const openFormButtons = document.querySelectorAll('[data-open-form]');
const closeFormButtons = document.querySelectorAll('[data-close-form]');
const form = document.querySelector('[data-join-form]');
const roleInput = document.querySelector('[data-role-input]');
const roleOptions = document.querySelectorAll('[data-role-option]');
const formFields = document.querySelector('[data-form-fields]');
const formSuccess = document.querySelector('[data-form-success]');
const statusLine = document.querySelector('[data-form-status]');

const TELEGRAM_TOKEN = '8894708408:AAHPDAjuOHEIBTSvFJzG8821pT4vGwTGhOA';
const TELEGRAM_CHAT_ID = '1066193932';

function setRole(roleValue) {
  if (roleInput) roleInput.value = roleValue;
  roleOptions.forEach((option) => {
    option.classList.toggle('is-active', option.dataset.roleOption === roleValue);
  });
}

function resetFormView() {
  if (formFields) formFields.hidden = false;
  if (formSuccess) formSuccess.hidden = true;
  if (statusLine) statusLine.textContent = '';
}

function openForm(role = '') {
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  resetFormView();
  setRole(role || 'Игрок');
}

function closeForm() {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
}

openFormButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openForm(button.dataset.openForm || 'Игрок');
  });
});

closeFormButtons.forEach((button) => {
  button.addEventListener('click', closeForm);
});

roleOptions.forEach((option) => {
  option.addEventListener('click', () => {
    setRole(option.dataset.roleOption || 'Игрок');
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && !modal.hidden) {
    closeForm();
  }
});

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const role = String(formData.get('role') || '').trim();
    const name = String(formData.get('name') || '').trim();
    const contact = String(formData.get('contact') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (statusLine) statusLine.textContent = 'Отправляем форму...';
    if (submitButton) submitButton.disabled = true;

    const text = [
      'Новая заявка SCORE',
      '',
      `Кто вы: ${role || 'Не указано'}`,
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      `Сообщение: ${message || '-'}`
    ].join('\n');

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text
        })
      });

      if (!response.ok) {
        throw new Error(`Telegram response: ${response.status}`);
      }

      if (formFields) formFields.hidden = true;
      if (formSuccess) formSuccess.hidden = false;
      if (statusLine) statusLine.textContent = '';

      window.setTimeout(() => {
        closeForm();
        form.reset();
        setRole('Игрок');
        resetFormView();
      }, 2000);
    } catch (error) {
      if (statusLine) {
        statusLine.textContent = 'Не удалось отправить форму. Попробуйте еще раз.';
      }
      console.error(error);
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
