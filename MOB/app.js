import { defaultProfile, games, homeMvp, notifications, sports, teams, venues } from './data/mock.js';
import { achievementDetailSheet, avatarChangeSheet, avatarViewSheet, createGameSheet, gameDetailSheet, notificationsSheet, profileDetailSheet, teamRequestsSheet, venueDetailSheet } from './components/sheets.js';
import { renderGamesScreen, renderHome, renderProfileScreen, renderProgressScreen, renderTeamScreen, renderVenuesScreen } from './screens/index.js';
import { addDays, escapeAttr, escapeHtml, formatGameDate, formatNumber, formatPrice, getAvatarSrc, getSportImage, normalize, startOfToday, toInputDate, withGameDate } from './utils/format.js';

const STORAGE_KEY = 'scoreplay_mob_state';
const LOGIN = 'SCORE';
const PASSWORD = 'SCORE123';

const screenTitles = {
  home: 'Главная',
  venues: 'Площадки',
  games: 'Игры',
  progress: 'Прогресс',
  team: 'Команда',
  profile: 'Профиль'
};

const dom = {
  appLoader: document.querySelector('#app-loader'),
  loginScreen: document.querySelector('#login-screen'),
  loginForm: document.querySelector('#login-form'),
  loginInput: document.querySelector('#login-input'),
  passwordInput: document.querySelector('#password-input'),
  loginError: document.querySelector('#login-error'),
  mobileApp: document.querySelector('#mobile-app'),
  screenTitle: document.querySelector('#screen-title'),
  screenLocation: document.querySelector('#screen-location'),
  greeting: document.querySelector('#greeting'),
  screens: Array.from(document.querySelectorAll('.app-screen')),
  navButtons: Array.from(document.querySelectorAll('[data-nav]')),
  profileShortcut: document.querySelector('#profile-shortcut'),
  notificationsShortcut: document.querySelector('#notifications-shortcut'),
  sheet: document.querySelector('#sheet'),
  sheetPanel: document.querySelector('.sheet-panel'),
  sheetContent: document.querySelector('#sheet-content'),
  toast: document.querySelector('#toast')
};

const state = hydrateState();
const SHEET_CLOSE_ANIMATION_MS = 320;
const PROMO_CAROUSEL_RUN_DELAYS_MS = [5000, 7000, 10000];
const APP_PRELOAD_MIN_MS = 1400;
const APP_PRELOAD_TIMEOUT_MS = 5200;
const APP_LOADER_MIN_STEP_MS = 190;
const APP_LOADER_MAX_STEP_MS = 760;
const APP_PRELOAD_ASSETS = [
  '../assets/logo-objects/object-1.svg',
  '../assets/logo-objects/object-2.svg',
  '../assets/logo-objects/object-3.svg',
  '../assets/logo-objects/object-4.svg',
  '../assets/logo-objects/object-5.svg',
  './assets/promo/optimized/showcase-create-game.jpg',
  './assets/promo/optimized/showcase-gift-game-v2.jpg',
  './assets/promo/optimized/showcase-team.jpg',
  './assets/promo/optimized/showcase-venues.jpg',
  './assets/activity/optimized/goal-onboarding-v2.jpg',
  './assets/activity/goal-flag-3d.png',
  './icons/home.png',
  './icons/venues.png',
  './icons/games.png',
  './icons/profile.png',
  './icons/notifications.png',
  './icons/app-icon-192.png',
  './icons/buicons/football.png',
  './icons/buicons/basketball.png',
  './icons/buicons/volleyball.png',
  './icons/buicons/tennis.png',
  './icons/buicons/hockey.png'
];
let activityGoalDraftTarget = 180;
let appPreloadPromise = null;
let appPreloadStartedAt = Date.now();
let isAppLoaderHidden = false;
let appLoaderTimer = 0;
let appLoaderLoadedCount = 0;
let appLoaderTotalCount = 0;
let appLoaderCurrentIndex = 0;
let appLoaderAllObjectsResolve = null;
const appLoaderShownIndexes = new Set([0]);

function sheetHeader(label, title = '', text = '') {
  return `
    <div class="filter-sheet-header sheet-standard-header">
      <span>${escapeHtml(label)}</span>
      ${title ? `<h2>${escapeHtml(title)}</h2>` : ''}
      ${text ? `<p>${escapeHtml(text)}</p>` : ''}
    </div>
  `;
}
let sheetCloseTimer = 0;
let promoCarouselTimer = 0;

init();

function init() {
  initTelegramViewport();
  appPreloadStartedAt = Date.now();
  appPreloadPromise = preloadAppAssets();

  bindLogin();
  bindNavigation();
  bindGlobalEvents();
  updateGreeting();

  if (state.authorized) {
    showApp();
  } else {
    finishAppPreload();
  }
}

function preloadAppAssets() {
  const fontLoaders = document.fonts
    ? [
        () => document.fonts.load('700 16px Raleway'),
        () => document.fonts.load('900 32px Raleway')
      ]
    : [];
  appLoaderTotalCount = APP_PRELOAD_ASSETS.length + fontLoaders.length;
  setAppLoaderObject(0);
  scheduleAppLoaderTick();
  const imagePromises = APP_PRELOAD_ASSETS.map((src) => preloadImage(src).then(registerAppPreloadProgress));
  const fontPromises = fontLoaders.map((loadFont) => loadFont().catch(() => null).then(registerAppPreloadProgress));
  return Promise.allSettled([...imagePromises, ...fontPromises]);
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    const timer = window.setTimeout(resolve, APP_PRELOAD_TIMEOUT_MS);
    image.decoding = 'async';
    image.onload = image.onerror = () => {
      window.clearTimeout(timer);
      resolve();
    };
    image.src = src;
  });
}

function finishAppPreload() {
  if (isAppLoaderHidden) return;
  const waitForMinimum = new Promise((resolve) => {
    const elapsed = Date.now() - appPreloadStartedAt;
    window.setTimeout(resolve, Math.max(0, APP_PRELOAD_MIN_MS - elapsed));
  });

  Promise.allSettled([appPreloadPromise || Promise.resolve(), waitForMinimum, waitForAllAppLoaderObjects()]).then(hideAppLoader);
}

function hideAppLoader() {
  if (isAppLoaderHidden) return;
  isAppLoaderHidden = true;
  window.clearTimeout(appLoaderTimer);
  if (!dom.appLoader) return;
  dom.appLoader.classList.add('is-leaving');
  window.setTimeout(() => {
    dom.appLoader.hidden = true;
  }, 420);
}

function registerAppPreloadProgress() {
  appLoaderLoadedCount += 1;
  scheduleAppLoaderTick(true);
}

function getAppLoaderStepDelay() {
  const progress = appLoaderTotalCount > 0 ? appLoaderLoadedCount / appLoaderTotalCount : 0;
  return Math.round(APP_LOADER_MAX_STEP_MS - (APP_LOADER_MAX_STEP_MS - APP_LOADER_MIN_STEP_MS) * Math.min(1, progress));
}

function scheduleAppLoaderTick(reset = false) {
  if (isAppLoaderHidden) return;
  if (reset) window.clearTimeout(appLoaderTimer);
  if (appLoaderTimer && !reset) return;
  appLoaderTimer = window.setTimeout(() => {
    appLoaderTimer = 0;
    advanceAppLoaderObject();
    scheduleAppLoaderTick();
  }, getAppLoaderStepDelay());
}

function advanceAppLoaderObject() {
  const images = getAppLoaderImages();
  if (!images.length) return;
  appLoaderCurrentIndex = (appLoaderCurrentIndex + 1) % images.length;
  setAppLoaderObject(appLoaderCurrentIndex);
}

function setAppLoaderObject(index) {
  const images = getAppLoaderImages();
  if (!images.length) return;
  images.forEach((image, imageIndex) => {
    image.classList.toggle('is-active', imageIndex === index);
  });
  appLoaderShownIndexes.add(index);
  if (appLoaderShownIndexes.size >= images.length && appLoaderAllObjectsResolve) {
    appLoaderAllObjectsResolve();
    appLoaderAllObjectsResolve = null;
  }
}

function getAppLoaderImages() {
  return Array.from(dom.appLoader?.querySelectorAll('.app-loader-object img') || []);
}

function waitForAllAppLoaderObjects() {
  const images = getAppLoaderImages();
  if (!images.length || appLoaderShownIndexes.size >= images.length) return Promise.resolve();
  return new Promise((resolve) => {
    appLoaderAllObjectsResolve = resolve;
    scheduleAppLoaderTick(true);
  });
}

function initTelegramViewport() {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) {
    setTelegramViewportVars();
    window.addEventListener('resize', setTelegramViewportVars);
    return;
  }

  webApp.ready();
  webApp.expand();

  if (typeof webApp.requestFullscreen === 'function') {
    try {
      webApp.requestFullscreen();
    } catch (_) {}
  }

  if (typeof webApp.disableVerticalSwipes === 'function') {
    try {
      webApp.disableVerticalSwipes();
    } catch (_) {}
  }

  if (typeof webApp.setHeaderColor === 'function') {
    try {
      webApp.setHeaderColor('#E7EDFC');
    } catch (_) {}
  }

  if (typeof webApp.setBackgroundColor === 'function') {
    try {
      webApp.setBackgroundColor('#E7EDFC');
    } catch (_) {}
  }

  setTelegramViewportVars();
  webApp.onEvent?.('viewportChanged', setTelegramViewportVars);
  webApp.onEvent?.('fullscreenChanged', setTelegramViewportVars);
  window.addEventListener('resize', setTelegramViewportVars);
}

function setTelegramViewportVars() {
  const root = document.documentElement;
  const webApp = window.Telegram?.WebApp;
  const viewportHeight = Number(webApp?.viewportStableHeight || webApp?.viewportHeight || window.innerHeight || 0);
  if (viewportHeight > 0) {
    root.style.setProperty('--tg-viewport-height', `${viewportHeight}px`);
  }
  const safeTop = Math.max(
    0,
    Number(webApp?.safeAreaInset?.top || 0),
    Number(webApp?.contentSafeAreaInset?.top || 0)
  );
  const isTelegramEmbedded = Boolean(
    webApp?.initData ||
    (webApp?.initDataUnsafe && Object.keys(webApp.initDataUnsafe).length) ||
    new URLSearchParams(window.location.search).has('tgWebAppPlatform') ||
    /Telegram/i.test(navigator.userAgent)
  );
  const telegramChromeOffset = isTelegramEmbedded ? Math.max(safeTop, webApp.isFullscreen ? 0 : 88) : 0;
  root.style.setProperty('--tg-top-offset', `${telegramChromeOffset}px`);
}

function hydrateState() {
  const fallback = {
    authorized: false,
    activeScreen: 'home',
    profile: clone(defaultProfile),
    notifications: clone(notifications),
    home: clone(homeMvp),
    activityGoal: {
      targetMinutes: 180,
      isSet: false
    },
    venues: clone(venues),
    games: games.map(withGameDate),
    teams: clone(teams),
    selectedTeamId: 't1',
    filters: {
      venues: {
        query: '',
        sport: 'Все',
        price: 'any',
        location: 'Все',
        amenity: 'Все',
        distance: 'any',
        surface: 'Все',
        lighting: 'any',
        size: 'Все',
        rating: 'any',
        paid: 'any',
        view: 'list',
        free: false,
        favorite: false,
        indoor: false,
        open: false,
        isNew: false
      },
      games: {
        query: '',
        sport: 'Все',
        date: 'any',
        time: 'any',
        distance: 'any',
        level: 'Все',
        price: 'any',
        slots: 'any',
        today: false,
        free: false,
        coach: false,
        nearby: false,
        favorite: false,
        view: 'list'
      }
    }
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!saved) return fallback;
    return {
      ...fallback,
      ...saved,
      activeScreen: saved.activeScreen === 'favorites' ? 'progress' : saved.activeScreen,
      profile: mergeProfile(saved.profile),
      notifications: Array.isArray(saved.notifications) ? saved.notifications : fallback.notifications,
      home: { ...fallback.home, ...(saved.home || {}), quickActions: fallback.home.quickActions },
      activityGoal: { ...fallback.activityGoal, ...(saved.activityGoal || {}) },
      venues: mergeById(fallback.venues, saved.venues),
      games: mergeById(fallback.games, saved.games).map(withGameDate),
      teams: mergeById(fallback.teams, saved.teams),
      filters: mergeFilters(fallback.filters, saved.filters)
    };
  } catch {
    return fallback;
  }
}

function mergeProfile(profile = {}) {
  const mergedStats = {
    ...clone(defaultProfile.stats),
    ...(profile.stats || {}),
    week: { ...defaultProfile.stats.week, ...((profile.stats || {}).week || {}) },
    month: { ...defaultProfile.stats.month, ...((profile.stats || {}).month || {}) }
  };
  const savedAchievements = Array.isArray(profile.achievements) ? profile.achievements : [];
  return {
    ...clone(defaultProfile),
    ...profile,
    nickname: String(profile.nickname || defaultProfile.nickname || '#77777'),
    phone: String(profile.phone || defaultProfile.phone || ''),
    email: String(profile.email || defaultProfile.email || ''),
    social: String(profile.social || defaultProfile.social || ''),
    avatarDataUrl: String(profile.avatarDataUrl || ''),
    preferences: { ...defaultProfile.preferences, ...(profile.preferences || {}) },
    stats: mergedStats,
    sports: Array.isArray(profile.sports) ? profile.sports : clone(defaultProfile.sports),
    achievements: (defaultProfile.achievements || []).map((item) => {
      const saved = savedAchievements.find((saved) => saved.title === item.title || saved.id === item.id) || {};
      return {
        ...item,
        unlocked: saved.unlocked ?? item.unlocked,
        progress: saved.progress ?? item.progress,
        status: saved.status ?? item.status,
        rarity: saved.rarity ?? item.rarity,
        date: saved.date ?? item.date
      };
    }),
    history: { ...clone(defaultProfile.history || {}), ...(profile.history || {}) }
  };
}

function mergeById(base, saved) {
  if (!Array.isArray(saved)) return clone(base);
  return base.map((item) => ({ ...item, ...(saved.find((savedItem) => savedItem.id === item.id) || {}) }))
    .concat(saved.filter((item) => !base.some((baseItem) => baseItem.id === item.id)));
}

function mergeFilters(fallback, saved = {}) {
  return {
    venues: { ...fallback.venues, ...(saved.venues || {}) },
    games: { ...fallback.games, ...(saved.games || {}) }
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function bindLogin() {
  dom.loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const login = normalize(dom.loginInput.value).toUpperCase();
    const password = dom.passwordInput.value.trim();
    if (login !== LOGIN || password !== PASSWORD) {
      dom.loginError.textContent = 'Неверный логин или пароль';
      dom.loginForm.classList.add('is-shaking');
      setTimeout(() => dom.loginForm.classList.remove('is-shaking'), 320);
      return;
    }

    state.authorized = true;
    state.activeScreen = 'home';
    dom.loginError.textContent = '';
    saveState();
    showApp();
  });
}

function bindNavigation() {
  dom.navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      navigate(button.dataset.nav);
    });
  });

  dom.profileShortcut.addEventListener('click', () => navigate('profile'));
}

function bindGlobalEvents() {
  document.addEventListener('click', handleClick);
  document.addEventListener('input', handleInput);
  document.addEventListener('change', handleChange);
  dom.sheetContent?.addEventListener('scroll', updateProfileStickyTitle, { passive: true });
  document.querySelectorAll('[data-close-sheet]').forEach((button) => button.addEventListener('click', closeSheet));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSheet();
    if ((event.key === 'Enter' || event.key === ' ') && event.target instanceof HTMLElement && event.target.matches('[role="button"][tabindex="0"]')) {
      event.preventDefault();
      event.target.click();
    }
  });
  bindSheetDrag();
}

function handleClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (target.closest('[data-close-sheet]')) {
    closeSheet();
    return;
  }
  const action = target.closest('[data-action]');
  if (!action) return;

  const { action: actionName, id, value } = action.dataset;

  if (actionName === 'promo-unavailable') {
    openPromoUnavailableSheet();
    return;
  }
  if (actionName === 'open-game-history') {
    openGameHistorySheet();
    return;
  }
  if (actionName === 'open-activity-goal') {
    openActivityGoalSheet();
    return;
  }
  if (actionName === 'activity-goal-onboarding-next') {
    replaceActivityGoalSheet(activityGoalSetupMarkup());
    return;
  }
  if (actionName === 'activity-goal-back-to-onboarding') {
    replaceActivityGoalSheet(activityGoalOnboardingMarkup());
    return;
  }
  if (actionName === 'edit-activity-goal') {
    activityGoalDraftTarget = Number(state.activityGoal?.targetMinutes || 180);
    replaceActivityGoalSheet(activityGoalSetupMarkup());
    return;
  }
  if (actionName === 'select-activity-goal' && value) {
    const targetMinutes = Number(value);
    if ([120, 180, 240, 300].includes(targetMinutes)) {
      activityGoalDraftTarget = targetMinutes;
      replaceActivityGoalSheet(activityGoalSetupMarkup());
    }
    return;
  }
  if (actionName === 'confirm-activity-goal') {
    state.activityGoal = {
      ...(state.activityGoal || {}),
      targetMinutes: activityGoalDraftTarget,
      isSet: true
    };
    saveState();
    renderHomeOnly();
    closeSheet();
    showToast('Цель активности поставлена');
    return;
  }
  if (actionName === 'reset-user-activity-goal') {
    state.activityGoal = {
      targetMinutes: 180,
      isSet: false
    };
    activityGoalDraftTarget = 180;
    saveState();
    renderHomeOnly();
    showToast('Цель пользователя сброшена');
    return;
  }
  if (actionName === 'nav' && value) navigate(value);
  if (actionName === 'profile-shortcut') navigate('profile');
  if (actionName === 'game-filter') {
    const railScrollLeft = action.closest('.filter-rail')?.scrollLeft;
    toggleFilter('games', value);
    saveState();
    renderGamesOnly();
    if (typeof railScrollLeft === 'number') restoreFilterRailScroll('games', railScrollLeft);
    return;
  }
  if (actionName === 'venue-filter') {
    const railScrollLeft = action.closest('.filter-rail')?.scrollLeft;
    toggleFilter('venues', value);
    saveState();
    renderVenuesOnly();
    if (typeof railScrollLeft === 'number') restoreFilterRailScroll('venues', railScrollLeft);
    return;
  }
  if (actionName === 'game-view') state.filters.games.view = value || 'list';
  if (actionName === 'venue-view') state.filters.venues.view = value || 'list';
  if (actionName === 'find-game') navigate('games');
  if (actionName === 'find-venue') navigate('venues');
  if (actionName === 'book-venue') navigate('venues');
  if (actionName === 'invite-friends') showToast('Ссылка приглашения подготовлена');
  if (actionName === 'book-selected-venue') showToast('Окно бронирования подготовлено');
  if (actionName === 'open-game-chat') showToast('Чат игры будет доступен после подключения backend');
  if (actionName === 'create-game') openCreateGameSheet();
  if (actionName === 'open-notifications') openNotificationsSheet();
  if (actionName === 'save-game') saveGameFromSheet(action);
  if (actionName === 'game-detail') openGameSheet(id);
  if (actionName === 'venue-detail') openVenueSheet(id);
  if (actionName === 'favorite-game') toggleFavorite('games', id);
  if (actionName === 'favorite-venue') toggleFavorite('venues', id);
  if (actionName === 'join-game') toggleJoinGame(id);
  if (actionName === 'team-event') openTeamEventSheet(id);
  if (actionName === 'open-team-requests') openSheet(teamRequestsSheet(getSelectedTeam()));
  if (actionName === 'achievement-detail') openAchievementSheet(id);
  if (actionName === 'share-achievement') shareAchievement(id);
  if (actionName === 'invite-player') showToast('Ссылка приглашения подготовлена');
  if (actionName === 'create-team') showToast('Создание команды будет следующим шагом MVP');
  if (actionName === 'profile-detail') openSheet(profileDetailSheet(state.profile));
  if (actionName === 'share-profile') shareProfile();
  if (actionName === 'view-avatar') openSheet(avatarViewSheet(state.profile));
  if (actionName === 'change-avatar') openSheet(avatarChangeSheet(state.profile));
  if (actionName === 'select-avatar') selectProfileAvatar(value);
  if (actionName === 'edit-profile') openSheet(profileDetailSheet(state.profile, true));
  if (actionName === 'save-profile') saveProfileFromSheet();
  if (actionName === 'add-sport') addProfileSport();
  if (actionName === 'remove-sport') removeProfileSport(value);
  if (actionName === 'logout') logout();

  if (actionName !== 'save-game') {
    saveState();
    renderApp();
  }
}

function handleInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.matches('[data-search="games"]')) {
    state.filters.games.query = target.value;
    saveState();
    renderGamesOnly();
  }

  if (target.matches('[data-search="venues"]')) {
    state.filters.venues.query = target.value;
    saveState();
    renderVenuesOnly();
  }

  if (target.closest('#create-game-form')) {
    updateCreateGameValidation();
  }
}

function handleChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.matches('input[name="avatar"]')) {
    previewAvatarFile(target);
    if (target.closest('.avatar-change-card')) saveAvatarFileFromInput(target);
  }

  if (target.matches('[data-select="venue-sport"]')) {
    state.filters.venues.sport = target.value;
    saveState();
    renderVenuesOnly();
  }

  if (target.matches('[data-team-switch]')) {
    state.selectedTeamId = target.value;
    saveState();
    renderTeamOnly();
  }

  if (target.closest('#create-game-form')) {
    updateCreateGameValidation();
  }
}

function showApp() {
  dom.loginScreen.hidden = true;
  dom.mobileApp.hidden = false;
  renderApp();
  finishAppPreload();
}

function logout() {
  state.authorized = false;
  state.activeScreen = 'home';
  saveState();
  closeSheet();
  dom.mobileApp.hidden = true;
  dom.loginScreen.hidden = false;
}

function navigate(screen) {
  if (screen === 'favorites') screen = 'progress';
  if (!screenTitles[screen]) return;
  state.activeScreen = screen;
  saveState();
  renderApp();
}

function renderApp() {
  dom.mobileApp?.classList.toggle('is-home-screen', state.activeScreen === 'home');
  dom.screens.forEach((screen) => screen.classList.toggle('is-active', screen.dataset.screen === state.activeScreen));
  dom.navButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.nav === state.activeScreen));
  if (dom.screenTitle) dom.screenTitle.textContent = screenTitles[state.activeScreen] || 'SCORE PLAY';
  if (dom.screenLocation) dom.screenLocation.textContent = state.profile.city || 'Москва';
  const avatarImage = dom.profileShortcut?.querySelector('img');
  if (avatarImage) avatarImage.src = getAvatarSrc(state.profile.avatarId, state.profile.avatarDataUrl);
  renderHomeOnly();
  renderVenuesOnly();
  renderGamesOnly();
  renderProgressOnly();
  renderTeamOnly();
  renderProfileOnly();
  bindHomePromoCarousel();
  bindHomeUserGamesCarousel();
}

function renderHomeOnly() {
  const screen = document.querySelector('#screen-home');
  const nextGame = state.games.find((game) => game.joined) || state.games[0];
  screen.innerHTML = renderHome({ state, nextGame, home: state.home });
}

function renderGamesOnly() {
  document.querySelector('#screen-games').innerHTML = renderGamesScreen({ state, games: getFilteredGames() });
}

function renderProgressOnly() {
  document.querySelector('#screen-progress').innerHTML = renderProgressScreen({
    state,
    joinedGames: state.games.filter((game) => game.joined)
  });
}

function renderVenuesOnly() {
  document.querySelector('#screen-venues').innerHTML = renderVenuesScreen({ state, venues: getFilteredVenues() });
}

function restoreFilterRailScroll(scope, scrollLeft) {
  requestAnimationFrame(() => {
    const rail = document.querySelector(`#screen-${scope} .filter-rail`);
    if (rail) rail.scrollLeft = scrollLeft;
  });
}

function renderTeamOnly() {
  document.querySelector('#screen-team').innerHTML = renderTeamScreen({ state, team: getSelectedTeam() });
}

function renderProfileOnly() {
  document.querySelector('#screen-profile').innerHTML = renderProfileScreen({
    state,
    teams: state.teams,
    joinedGames: state.games.filter((game) => game.joined),
    favoriteVenues: state.venues.filter((venue) => venue.favorite),
    favoriteGames: state.games.filter((game) => game.favorite)
  });
}

function bindHomePromoCarousel() {
  clearTimeout(promoCarouselTimer);
  promoCarouselTimer = 0;
  if (state.activeScreen !== 'home') return;

  const track = document.querySelector('.home-promo-track');
  const cards = Array.from(document.querySelectorAll('.home-promo-card'));
  const dots = Array.from(document.querySelectorAll('.home-promo-dots span'));
  if (!track || cards.length <= 1) return;
  let runIndex = 0;

  const loadPromoImage = (card) => {
    const image = card?.dataset?.promoImage;
    if (!card || !image || card.dataset.imageLoaded === 'true') return;
    card.style.setProperty('--promo-image', `url('${image}')`);
    card.dataset.imageLoaded = 'true';
  };

  const getStep = () => {
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0') || 0;
    return cards[0].getBoundingClientRect().width + gap;
  };

  const syncDots = () => {
    const index = Math.max(0, Math.min(cards.length - 1, Math.round(track.scrollLeft / Math.max(1, getStep()))));
    dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
    loadPromoImage(cards[index]);
    loadPromoImage(cards[Math.min(cards.length - 1, index + 1)]);
  };

  const scheduleAutoScroll = () => {
    clearTimeout(promoCarouselTimer);
    const delay = PROMO_CAROUSEL_RUN_DELAYS_MS[runIndex];
    promoCarouselTimer = window.setTimeout(() => {
      const step = getStep();
      const activeIndex = Math.max(0, Math.min(cards.length - 1, Math.round(track.scrollLeft / Math.max(1, step))));
      const nextIndex = (activeIndex + 1) % cards.length;
      if (activeIndex === cards.length - 1) {
        runIndex = Math.min(runIndex + 1, PROMO_CAROUSEL_RUN_DELAYS_MS.length - 1);
      }
      loadPromoImage(cards[nextIndex]);
      track.dataset.autoScrolling = 'true';
      track.scrollTo({ left: nextIndex * step, behavior: 'smooth' });
      window.setTimeout(() => {
        track.dataset.autoScrolling = 'false';
        syncDots();
        scheduleAutoScroll();
      }, 650);
    }, delay);
  };

  loadPromoImage(cards[0]);
  loadPromoImage(cards[1]);
  track.addEventListener('scroll', () => {
    syncDots();
    if (track.dataset.autoScrolling === 'true') return;
    scheduleAutoScroll();
  }, { passive: true });
  scheduleAutoScroll();
  syncDots();
}

function bindHomeUserGamesCarousel() {
  if (state.activeScreen !== 'home') return;
  const track = document.querySelector('.home-user-games-track');
  if (!track) return;

  let startX = 0;
  let pullStartedAtEnd = false;
  let historyOpened = false;
  const isAtEnd = () => track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  const startsOnMoreCard = (target) => target instanceof Element && Boolean(target.closest('.home-user-games-more'));
  const openHistoryAfterPull = (currentX) => {
    if (!pullStartedAtEnd || historyOpened || startX - currentX < 10) return;
    historyOpened = true;
    openGameHistorySheet();
  };

  track.addEventListener('touchstart', (event) => {
    startX = event.touches[0]?.clientX || 0;
    pullStartedAtEnd = isAtEnd() || startsOnMoreCard(event.target);
    historyOpened = false;
  }, { passive: true });

  track.addEventListener('touchmove', (event) => {
    openHistoryAfterPull(event.touches[0]?.clientX || startX);
  }, { passive: true });

  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse') return;
    startX = event.clientX;
    pullStartedAtEnd = isAtEnd() || startsOnMoreCard(event.target);
    historyOpened = false;
  });

  track.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'mouse' && event.buttons === 1) openHistoryAfterPull(event.clientX);
  });
}

function openAchievementSheet(id) {
  const achievement = state.profile.achievements.find((item) => String(item.id || item.title) === String(id));
  if (!achievement) return;
  openSheet(achievementDetailSheet(achievement));
}

function getAppShareUrl() {
  if (window.location.protocol === 'file:') return 'https://t.me/score_app';
  return window.location.href.split(/[?#]/)[0];
}

function buildAchievementSharePayload(achievement) {
  const appUrl = getAppShareUrl();
  const messageLines = [
    `Я получил достижение «${achievement.title}» в SCORE.`,
    achievement.text ? `Задание: ${achievement.text}` : '',
    'Залетай в SCORE: найди игру рядом, собери команду и открой свои достижения.'
  ].filter(Boolean);
  const text = [...messageLines, `Открыть приложение: ${appUrl}`].join('\n\n');

  return {
    title: `SCORE: ${achievement.title}`,
    text,
    telegramText: messageLines.join('\n\n'),
    url: appUrl
  };
}

function resolveAssetUrl(src) {
  if (!src) return '';
  if (String(src).startsWith('data:')) return src;
  return new URL(src, document.baseURI).href;
}

function loadCanvasImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    if (/^https?:/i.test(src)) image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = resolveAssetUrl(src);
  });
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawContainedImage(ctx, image, x, y, size) {
  const ratio = Math.min(size / image.width, size / image.height);
  const width = image.width * ratio;
  const height = image.height * ratio;
  ctx.drawImage(image, x + (size - width) / 2, y + (size - height) / 2, width, height);
}

function getWrappedLines(ctx, text, maxWidth) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth || !current) {
      current = next;
      return;
    }
    lines.push(current);
    current = word;
  });
  if (current) lines.push(current);
  return lines;
}

function drawCenteredLines(ctx, lines, centerX, y, lineHeight) {
  lines.forEach((line, index) => {
    ctx.fillText(line, centerX, y + index * lineHeight);
  });
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 0.96));
}

async function createAchievementShareFile(achievement) {
  const canvas = document.createElement('canvas');
  const width = 1080;
  const height = 1350;
  const scale = 2;
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.scale(scale, scale);

  const isGamesSeries = achievement.series === 'Игры';
  const logoSrc = isGamesSeries ? './icons/logo-green.png' : './icons/logo-blue.png';
  const [medal, logo] = await Promise.all([
    loadCanvasImage(achievement.icon),
    loadCanvasImage(logoSrc).catch(() => null)
  ]);

  ctx.fillStyle = '#E4F0FF';
  roundedRect(ctx, 0, 0, width, height, 72);
  ctx.fill();
  ctx.strokeStyle = '#BFD4FF';
  ctx.lineWidth = 4;
  roundedRect(ctx, 18, 18, width - 36, height - 36, 64);
  ctx.stroke();

  drawContainedImage(ctx, medal, 360, 170, 360);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#101318';
  ctx.font = '800 68px "Raleway", Arial, sans-serif';
  const titleLines = getWrappedLines(ctx, achievement.title, 920).slice(0, 3);
  drawCenteredLines(ctx, titleLines, width / 2, 620, 82);

  ctx.fillStyle = '#5D6F94';
  ctx.font = '800 38px "Raleway", Arial, sans-serif';
  const descriptionLines = getWrappedLines(ctx, achievement.text, 820).slice(0, 2);
  drawCenteredLines(ctx, descriptionLines, width / 2, 620 + titleLines.length * 82 + 34, 50);

  if (logo) drawContainedImage(ctx, logo, 420, 1150, 240);

  const blob = await canvasToBlob(canvas);
  if (!blob) return null;
  const fileName = `score-${String(achievement.id || 'achievement').replace(/[^a-z0-9_-]/gi, '-')}.png`;
  return new File([blob], fileName, { type: 'image/png' });
}

function openTelegramAchievementShare(payload) {
  const webApp = window.Telegram?.WebApp;
  if (!webApp || typeof webApp.openTelegramLink !== 'function') return false;

  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(payload.url)}&text=${encodeURIComponent(payload.telegramText || payload.text)}`;
  webApp.openTelegramLink(shareUrl);
  return true;
}

async function shareAchievement(id) {
  const achievement = state.profile.achievements.find((item) => String(item.id || item.title) === String(id));
  if (!achievement || achievement.unlocked === false) return;
  const payload = buildAchievementSharePayload(achievement);

  if (navigator.share && typeof File !== 'undefined') {
    try {
      const file = await createAchievementShareFile(achievement);
      if (file && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ files: [file], text: payload.text });
        return;
      }
    } catch (_) {}
  }

  if (navigator.share) {
    navigator.share({ title: payload.title, text: payload.text, url: payload.url }).catch(() => {});
    return;
  }

  if (openTelegramAchievementShare(payload)) return;

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(payload.text)
      .then(() => showToast('Текст ачивки скопирован'))
      .catch(() => showToast('Ачивка готова к отправке'));
    return;
  }

  showToast('Ачивка готова к отправке');
}

function getFilteredGames() {
  const filters = state.filters.games;
  const query = normalize(filters.query);
  return state.games
    .filter((game) => {
      if (query && !normalize([game.title, game.sport, game.place, game.metro, game.district].join(' ')).includes(query)) return false;
      if (filters.sport !== 'Все' && game.sport !== filters.sport) return false;
      if (filters.date === 'today' && game.dateOffset !== 0) return false;
      if (filters.date === 'week' && game.dateOffset > 7) return false;
      if (filters.time === 'morning' && Number(game.time.slice(0, 2)) >= 12) return false;
      if (filters.time === 'evening' && Number(game.time.slice(0, 2)) < 18) return false;
      if (filters.distance === 'near' && parseDistance(game.distance) > 2) return false;
      if (filters.distance === 'five' && parseDistance(game.distance) > 5) return false;
      if (filters.level !== 'Все' && game.level !== filters.level) return false;
      if (filters.price === 'free' && game.price > 0) return false;
      if (filters.price === 'paid' && game.price === 0) return false;
      if (filters.slots === 'open' && game.current >= game.max) return false;
      if (filters.today && game.dateOffset !== 0) return false;
      if (filters.free && game.price > 0) return false;
      if (filters.coach && !game.coach) return false;
      if (filters.nearby && !game.nearby) return false;
      if (filters.favorite && !game.favorite) return false;
      return true;
    })
    .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));
}

function getFilteredVenues() {
  const filters = state.filters.venues;
  const query = normalize(filters.query);
  return state.venues.filter((venue) => {
    if (query && !normalize([venue.name, venue.sport, venue.district, venue.metro, venue.address].join(' ')).includes(query)) return false;
    if (filters.sport !== 'Все' && venue.sport !== filters.sport) return false;
    if (filters.price === 'free' && venue.price > 0) return false;
    if (filters.price === 'low' && venue.price > 2500) return false;
    if (filters.price === 'mid' && (venue.price < 2500 || venue.price > 5000)) return false;
    if (filters.price === 'paid' && venue.price === 0) return false;
    if (filters.distance === 'near' && parseDistance(venue.distance) > 2) return false;
    if (filters.distance === 'five' && parseDistance(venue.distance) > 5) return false;
    if (filters.surface !== 'Все' && venue.surface !== filters.surface) return false;
    if (filters.lighting === 'yes' && !(venue.amenities || []).includes('Освещение')) return false;
    if (filters.size !== 'Все' && venue.size !== filters.size) return false;
    if (filters.rating === 'high' && Number(venue.rating || 0) < 4.7) return false;
    if (filters.paid === 'free' && venue.price > 0) return false;
    if (filters.paid === 'paid' && venue.price === 0) return false;
    if (filters.location !== 'Все' && venue.district !== filters.location && venue.metro !== filters.location) return false;
    if (filters.amenity !== 'Все' && !venue.amenities.includes(filters.amenity)) return false;
    if (filters.isNew && venue.label !== 'Новая') return false;
    if (filters.free && !venue.free && venue.price > 0) return false;
    if (filters.favorite && !venue.favorite) return false;
    if (filters.indoor && !venue.indoor) return false;
    if (filters.open && venue.indoor) return false;
    return true;
  });
}

function parseDistance(value = '') {
  return Number(String(value).replace(',', '.').match(/\d+(\.\d+)?/)?.[0] || 99);
}

function toggleFilter(scope, value) {
  const filters = state.filters[scope];
  if (!filters) return;
  if (value === 'reset') {
    Object.keys(filters).forEach((key) => {
      if (typeof filters[key] === 'boolean') filters[key] = false;
      if (key === 'query') filters[key] = '';
      if (key === 'sport') filters[key] = 'Все';
      if (key === 'price') filters[key] = 'any';
      if (key === 'location') filters[key] = 'Все';
      if (key === 'amenity') filters[key] = 'Все';
      if (key === 'distance') filters[key] = 'any';
      if (key === 'surface') filters[key] = 'Все';
      if (key === 'lighting') filters[key] = 'any';
      if (key === 'size') filters[key] = 'Все';
      if (key === 'rating') filters[key] = 'any';
      if (key === 'paid') filters[key] = 'any';
      if (key === 'date') filters[key] = 'any';
      if (key === 'time') filters[key] = 'any';
      if (key === 'level') filters[key] = 'Все';
      if (key === 'slots') filters[key] = 'any';
    });
    return;
  }
  if (typeof filters[value] === 'boolean') filters[value] = !filters[value];
  if (scope === 'venues' && value?.startsWith('sport:')) filters.sport = filters.sport === value.slice(6) ? 'Все' : value.slice(6);
  if (scope === 'venues' && value?.startsWith('price:')) filters.price = filters.price === value.slice(6) ? 'any' : value.slice(6);
  if (scope === 'venues' && value?.startsWith('location:')) filters.location = filters.location === value.slice(9) ? 'Все' : value.slice(9);
  if (scope === 'venues' && value?.startsWith('amenity:')) filters.amenity = filters.amenity === value.slice(8) ? 'Все' : value.slice(8);
  if (scope === 'venues' && value?.startsWith('distance:')) filters.distance = filters.distance === value.slice(9) ? 'any' : value.slice(9);
  if (scope === 'venues' && value?.startsWith('surface:')) filters.surface = filters.surface === value.slice(8) ? 'Все' : value.slice(8);
  if (scope === 'venues' && value?.startsWith('lighting:')) filters.lighting = filters.lighting === value.slice(9) ? 'any' : value.slice(9);
  if (scope === 'venues' && value?.startsWith('size:')) filters.size = filters.size === value.slice(5) ? 'Все' : value.slice(5);
  if (scope === 'venues' && value?.startsWith('rating:')) filters.rating = filters.rating === value.slice(7) ? 'any' : value.slice(7);
  if (scope === 'venues' && value?.startsWith('paid:')) filters.paid = filters.paid === value.slice(5) ? 'any' : value.slice(5);
  if (scope === 'games' && value?.startsWith('sport:')) filters.sport = filters.sport === value.slice(6) ? 'Все' : value.slice(6);
  if (scope === 'games' && value?.startsWith('date:')) filters.date = filters.date === value.slice(5) ? 'any' : value.slice(5);
  if (scope === 'games' && value?.startsWith('time:')) filters.time = filters.time === value.slice(5) ? 'any' : value.slice(5);
  if (scope === 'games' && value?.startsWith('distance:')) filters.distance = filters.distance === value.slice(9) ? 'any' : value.slice(9);
  if (scope === 'games' && value?.startsWith('level:')) filters.level = filters.level === value.slice(6) ? 'Все' : value.slice(6);
  if (scope === 'games' && value?.startsWith('price:')) filters.price = filters.price === value.slice(6) ? 'any' : value.slice(6);
  if (scope === 'games' && value?.startsWith('slots:')) filters.slots = filters.slots === value.slice(6) ? 'any' : value.slice(6);
}

function openCreateGameSheet() {
  openSheet(createGameSheet({ state, defaultDate: addDays(1) }));
  updateCreateGameValidation(false);
}

function openNotificationsSheet() {
  openSheet(notificationsSheet(state.notifications));
}

function saveGameFromSheet(button) {
  const form = document.querySelector('#create-game-form');
  if (!(form instanceof HTMLFormElement)) return;
  const validation = validateCreateGameForm(form);
  renderCreateGameErrors(validation.errors);
  if (!validation.valid) return;

  button.disabled = true;
  button.classList.add('is-loading');
  button.textContent = 'Публикуем...';

  window.setTimeout(() => {
    const data = new FormData(form);
    const date = String(data.get('date'));
    const time = String(data.get('time'));
    const sport = String(data.get('sport'));
    const max = Number(data.get('max'));
    const current = Number(data.get('current'));
    const price = Number(data.get('price'));

    state.games.unshift({
      id: `g${Date.now()}`,
      title: String(data.get('title')).trim(),
      sport,
      format: String(data.get('format')),
      level: state.profile.level,
      dateOffset: Math.round((new Date(`${date}T00:00:00`) - startOfToday()) / 86400000),
      time,
      duration: 90,
      place: String(data.get('place')).trim(),
      metro: 'Уточнить',
      district: state.profile.district,
      price,
      current,
      max,
      organizer: state.profile.name,
      rating: 5,
      coach: false,
      isNew: true,
      favorite: false,
      joined: true,
      nearby: true,
      image: getSportImage(sport),
      description: String(data.get('description') || 'Открытая игра в комфортном темпе.').trim(),
      startDateTime: `${date}T${time}:00`
    });

    state.activeScreen = 'games';
    saveState();
    renderApp();
    const formState = document.querySelector('[data-sheet-state="form"]');
    const successState = document.querySelector('[data-sheet-state="success"]');
    if (formState) formState.hidden = true;
    if (successState) successState.hidden = false;
  }, 450);
}

function validateCreateGameForm(form) {
  const data = new FormData(form);
  const title = String(data.get('title') || '').trim();
  const sport = String(data.get('sport') || '').trim();
  const format = String(data.get('format') || '').trim();
  const date = String(data.get('date') || '').trim();
  const time = String(data.get('time') || '').trim();
  const place = String(data.get('place') || '').trim();
  const max = Number(data.get('max'));
  const current = Number(data.get('current'));
  const price = Number(data.get('price'));
  const errors = [];

  if (!title || !sport || !format || !date || !time || !place) errors.push('Заполните обязательные поля.');
  if (!Number.isFinite(max) || max <= 0) errors.push('Мест всего должно быть больше 0.');
  if (!Number.isFinite(current) || current < 0) errors.push('Уже есть не может быть меньше 0.');
  if (current > max) errors.push('Уже есть не должно быть больше общего количества мест.');
  if (!Number.isFinite(price) || price < 0) errors.push('Цена не может быть меньше 0.');

  return { valid: errors.length === 0, errors };
}

function updateCreateGameValidation(showErrors = true) {
  const form = document.querySelector('#create-game-form');
  const submit = document.querySelector('[data-create-game-submit]');
  if (!(form instanceof HTMLFormElement) || !(submit instanceof HTMLButtonElement)) return;
  const validation = validateCreateGameForm(form);
  submit.disabled = !validation.valid;
  renderCreateGameErrors(showErrors ? validation.errors : []);
}

function renderCreateGameErrors(errors) {
  const container = document.querySelector('#create-game-errors');
  if (!container) return;
  container.innerHTML = errors.map((error) => `<p>${error}</p>`).join('');
}

function openGameSheet(id) {
  const game = state.games.find((item) => item.id === id);
  if (game) openSheet(gameDetailSheet(game, state));
}

function openVenueSheet(id) {
  const venue = state.venues.find((item) => item.id === id);
  if (venue) openSheet(venueDetailSheet(venue, state));
}

function openTeamEventSheet(id) {
  const event = getSelectedTeam().events.find((item) => item.id === id);
  if (!event) return;
  openSheet(`
    ${sheetHeader(event.type, event.title, `${event.time} · ${event.place}`)}
    <section class="section-card flat"><strong>${event.note}</strong></section>
    <button class="button button-primary button-full" type="button" data-action="create-game">Создать похожую игру</button>
  `);
}

function openPromoUnavailableSheet() {
  openSheet(`
    <div class="promo-unavailable-sheet">
      <span aria-hidden="true">!</span>
      <h2>СЦЕНАРИЙ НЕ ПРОРАБОТАН</h2>
      <p>Этот сценарий пока находится в разработке.</p>
      <button class="button button-primary button-full" type="button" data-close-sheet>Понятно</button>
    </div>
  `);
}

function openActivityGoalSheet() {
  if (state.activityGoal?.isSet) {
    openSheet(activityGoalActiveMarkup());
    return;
  }
  activityGoalDraftTarget = 180;
  openSheet(activityGoalOnboardingMarkup());
}

function replaceActivityGoalSheet(markup) {
  dom.sheetContent.innerHTML = markup;
  dom.sheetContent.scrollTop = 0;
  dom.sheetPanel?.classList.toggle('is-activity-onboarding-sheet', markup.includes('activity-goal-onboarding') || markup.includes('activity-goal-setup'));
  dom.sheet?.classList.toggle('is-activity-onboarding-root', markup.includes('activity-goal-onboarding') || markup.includes('activity-goal-setup'));
}

function activityGoalOnboardingMarkup() {
  return `
    <div class="activity-goal-sheet activity-goal-onboarding">
      <header class="activity-goal-onboarding-header">
        <button type="button" data-close-sheet aria-label="Закрыть"><img src="./assets/activity/goal-close-v2.png" alt="" aria-hidden="true"></button>
        <h2><span>Цель</span> по времени</h2>
        <p>Ставь цель на неделю и набирай минуты в играх SCORE</p>
      </header>
      <div class="activity-goal-onboarding-visual" aria-hidden="true">
        <img src="./assets/activity/optimized/goal-onboarding-v2.jpg" alt="">
      </div>
      <div class="activity-goal-onboarding-steps">
        <div><b>1</b><span><strong>Выбери темп</strong><small>От лёгкого старта до максимальной недели</small></span></div>
        <div><b>2</b><span><strong>Играй в SCORE</strong><small>Каждая завершённая игра добавит минуты</small></span></div>
        <div><b>3</b><span><strong>Следи за прогрессом</strong><small>Цель всегда будет на главном экране</small></span></div>
      </div>
      <footer class="activity-goal-onboarding-footer">
        <button class="button button-primary button-full" type="button" data-action="activity-goal-onboarding-next">Поставить цель</button>
      </footer>
    </div>
  `;
}

function activityGoalSetupMarkup() {
  const options = [
    { minutes: 120, label: 'Лёгкий старт', text: 'Около двух коротких игр' },
    { minutes: 180, label: 'Активный', text: 'Оптимальный темп недели' },
    { minutes: 240, label: 'Супер активный', text: 'Для регулярных игроков' },
    { minutes: 300, label: 'В огне', text: 'Пять часов в движении' }
  ];

  return `
    <div class="activity-goal-sheet activity-goal-setup">
      <header class="activity-goal-setup-header">
        <div class="activity-goal-setup-actions">
          <button class="activity-goal-setup-close" type="button" data-close-sheet aria-label="Закрыть"><img src="./assets/activity/goal-close-v2.png" alt="" aria-hidden="true"></button>
        </div>
        <h2>Выбери свой ритм</h2>
      </header>
      <section class="activity-goal-setup-intro">
        <h3>Сколько времени ты хочешь провести в игре?</h3>
        <p>Цель можно изменить в любой момент</p>
      </section>
      <section class="activity-goal-options">
        ${options.map((option) => `
          <button class="${option.minutes === activityGoalDraftTarget ? 'is-selected' : ''}" type="button" data-action="select-activity-goal" data-value="${option.minutes}" aria-pressed="${option.minutes === activityGoalDraftTarget}">
            <span><strong>${option.minutes === 300 ? '&gt;300' : option.minutes}</strong> мин / неделя</span>
            <small>${option.label}</small>
          </button>
        `).join('')}
      </section>
      <footer class="activity-goal-setup-footer">
        <button class="button button-primary button-full" type="button" data-action="confirm-activity-goal">Поставить цель</button>
      </footer>
    </div>
  `;
}

function activityGoalActiveMarkup() {
  const completed = Math.max(0, Number(state.profile.stats?.week?.minutes || 0));
  const target = Math.max(1, Number(state.activityGoal?.targetMinutes || 180));
  const progress = Math.min(100, Math.round((completed / target) * 100));
  const remaining = Math.max(0, target - completed);
  const gamesCount = Math.max(0, Number(state.profile.stats?.week?.games || 0));
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const formatDate = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' });
  const weekRange = `${formatDate.format(monday)} — ${formatDate.format(sunday)}`;

  return `
    <div class="activity-goal-sheet activity-goal-active">
      <header class="activity-goal-sheet-header">
        <button type="button" data-close-sheet aria-label="Закрыть">×</button>
        <div><span>${weekRange}</span><h2>Цель активности</h2></div>
      </header>
      <section class="activity-goal-sheet-summary">
        <span class="activity-goal-ring is-large" style="--goal-progress:${progress}%">
          <strong>${progress}%</strong>
          <small>готово</small>
        </span>
        <div>
          <span>${formatNumber(completed)} из ${formatNumber(target)} минут</span>
          <h3>${remaining ? `Осталось ${formatNumber(remaining)} минут` : 'Цель выполнена'}</h3>
          <p>${remaining ? 'Прогресс обновляется после каждой завершённой игры.' : 'Отличная неделя. Можно выбрать цель выше.'}</p>
        </div>
      </section>
      <div class="activity-goal-active-stats">
        <span><strong>${gamesCount}</strong><small>игры</small></span>
        <span><strong>${formatNumber(completed)}</strong><small>минут</small></span>
        <span><strong>${progress}%</strong><small>цели</small></span>
      </div>
      <div class="activity-goal-source">
        <span aria-hidden="true">S</span>
        <div><strong>Прогресс из SCORE</strong><p>Берём длительность сыгранных матчей, поэтому ничего подключать не нужно.</p></div>
      </div>
      <button class="button button-primary button-full" type="button" data-action="edit-activity-goal">Изменить цель</button>
    </div>
  `;
}

function openGameHistorySheet() {
  const activity = state.home?.activity || [];
  const activityGames = activity
    .filter((item) => item.action === 'game-detail' && item.id)
    .map((item) => ({ game: state.games.find((game) => game.id === item.id), relation: item.label }))
    .filter((item) => item.game);
  const activityGameIds = new Set(activityGames.map((item) => item.game.id));
  const activeGames = activityGames.concat(
    state.games
      .filter((game) => game.joined && !activityGameIds.has(game.id))
      .map((game) => ({ game, relation: 'Вы участвуете' }))
  );
  const pastGames = state.profile.history?.games || [];

  openSheet(`
    <div class="game-history-sheet">
      <header class="game-history-header">
        <button type="button" data-close-sheet aria-label="Закрыть">←</button>
        <div><span>Мои игры</span><h2>История игр</h2></div>
        <b>${activeGames.length + pastGames.length}</b>
      </header>
      <section class="game-history-section">
        <div class="section-header compact"><h3>Активные и ближайшие</h3><span>${activeGames.length}</span></div>
        <div class="game-history-list">
          ${activeGames.map(renderGameHistoryActiveRow).join('')}
        </div>
      </section>
      <section class="game-history-section">
        <div class="section-header compact"><h3>Прошедшие</h3><span>${pastGames.length}</span></div>
        <div class="game-history-list">
          ${pastGames.map((title, index) => renderGameHistoryPastRow(title, index)).join('')}
        </div>
      </section>
    </div>
  `);
}

function renderGameHistoryActiveRow({ game, relation }) {
  const role = game.joined ? 'Вы участвуете' : relation === 'Созданная игра' ? 'Вы организатор' : relation;
  return `
    <button class="game-history-row" type="button" data-action="game-detail" data-id="${escapeAttr(game.id)}">
      <span class="game-history-icon"><img src="${escapeAttr(game.image)}" alt=""></span>
      <span class="game-history-copy">
        <small>${escapeHtml(formatGameDate(game))} · ${escapeHtml(role)}</small>
        <strong>${escapeHtml(game.title)}</strong>
        <em>${escapeHtml(game.place)} · ${game.current}/${game.max} игроков</em>
      </span>
      <span class="game-history-side"><b>${formatPrice(game.price)}</b><i aria-hidden="true">→</i></span>
    </button>
  `;
}

function renderGameHistoryPastRow(title, index) {
  const date = new Date();
  date.setDate(date.getDate() - 3 - index * 4);
  const dateLabel = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(date);
  return `
    <article class="game-history-row is-past">
      <span class="game-history-icon"><img src="./icons/games.png" alt=""></span>
      <span class="game-history-copy">
        <small>${escapeHtml(dateLabel)} · Завершена</small>
        <strong>${escapeHtml(title)}</strong>
        <em>Игра засчитана в вашу статистику</em>
      </span>
      <span class="game-history-complete" aria-label="Завершена">✓</span>
    </article>
  `;
}

async function saveProfileFromSheet() {
  const form = document.querySelector('#profile-form');
  if (!(form instanceof HTMLFormElement)) return;
  const data = new FormData(form);
  const avatarFile = data.get('avatar');
  state.profile.name = String(data.get('name') || state.profile.name).trim();
  state.profile.nickname = String(data.get('nickname') || state.profile.nickname || '#77777').trim();
  state.profile.district = String(data.get('district') || state.profile.district).trim();
  state.profile.phone = String(data.get('phone') || state.profile.phone || '').trim();
  state.profile.email = String(data.get('email') || state.profile.email || '').trim();
  state.profile.social = String(data.get('social') || state.profile.social || '').trim();
  state.profile.about = String(data.get('about') || state.profile.about).trim();
  if (avatarFile instanceof File && avatarFile.size > 0) {
    try {
      state.profile.avatarDataUrl = await readImageFile(avatarFile);
    } catch {
      showToast('Не удалось загрузить аватарку');
      return;
    }
  }
  saveState();
  renderApp();
  openSheet(profileDetailSheet(state.profile));
  showToast('Профиль обновлен');
}

function updateProfileStickyTitle() {
  const title = dom.sheetContent?.querySelector('[data-profile-sticky-title]');
  if (!title) return;
  title.classList.toggle('is-visible', dom.sheetContent.scrollTop > 96);
}

function shareProfile() {
  const nickname = state.profile.nickname || '#77777';
  const text = `SCORE профиль: ${state.profile.name} ${nickname}`;
  if (navigator.share) {
    navigator.share({ title: 'SCORE профиль', text }).catch(() => {});
    return;
  }

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast('Профиль скопирован'))
      .catch(() => showToast('Профиль готов к отправке'));
    return;
  }

  showToast('Профиль готов к отправке');
}

function selectProfileAvatar(value) {
  const avatarId = Number(value);
  if (!Number.isFinite(avatarId)) return;
  state.profile.avatarId = avatarId;
  state.profile.avatarDataUrl = '';
  saveState();
  renderApp();
  openSheet(avatarChangeSheet(state.profile));
  showToast('Аватар обновлен');
}

async function saveAvatarFileFromInput(input) {
  if (!(input instanceof HTMLInputElement) || !input.files?.[0]) return;
  try {
    state.profile.avatarDataUrl = await readImageFile(input.files[0]);
    saveState();
    renderApp();
    showToast('Аватар обновлен');
  } catch {
    showToast('Не удалось загрузить аватарку');
  }
}

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(String(reader.result || '')));
    reader.addEventListener('error', () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

function previewAvatarFile(input) {
  if (!(input instanceof HTMLInputElement) || !input.files?.[0]) return;
  const file = input.files[0];
  const label = document.querySelector('[data-avatar-file-label]');
  const preview = document.querySelector('[data-avatar-preview]');
  if (label) label.textContent = file.name;
  if (!(preview instanceof HTMLImageElement)) return;
  readImageFile(file)
    .then((src) => {
      preview.src = src;
    })
    .catch(() => {
      showToast('Не удалось показать фото');
    });
}

function addProfileSport() {
  const next = sports.find((sport) => !state.profile.sports.some((item) => item.type === sport));
  if (!next) return showToast('Все виды спорта уже добавлены');
  state.profile.sports.push({ type: next, level: state.profile.level, position: 'Игрок' });
  showToast(`${next} добавлен`);
}

function removeProfileSport(type) {
  if (state.profile.sports.length <= 1) return showToast('Оставьте хотя бы один спорт');
  state.profile.sports = state.profile.sports.filter((sport) => sport.type !== type);
}

function toggleFavorite(collection, id) {
  const item = state[collection].find((entry) => entry.id === id);
  if (!item) return;
  item.favorite = !item.favorite;
  const action = collection === 'games' ? 'favorite-game' : 'favorite-venue';
  const button = document.querySelector(`[data-action="${action}"][data-id="${escapeAttr(id)}"]`);
  button?.classList.toggle('is-active', item.favorite);
  button?.setAttribute('aria-label', item.favorite ? 'Убрать из избранного' : 'Добавить в избранное');
  showToast(item.favorite ? 'Сохранено' : 'Убрано из сохраненных');
}

function toggleJoinGame(id) {
  const game = state.games.find((item) => item.id === id);
  if (!game) return;
  if (game.joined) {
    game.joined = false;
    game.current = Math.max(0, game.current - 1);
    showToast('Вы вышли из игры');
  } else if (game.current < game.max) {
    game.joined = true;
    game.current += 1;
    showToast('Вы участвуете');
  } else {
    showToast('Игра уже собрана');
  }
  closeSheet();
}

function openSheet(markup) {
  clearTimeout(sheetCloseTimer);
  dom.sheetContent.innerHTML = markup;
  dom.sheetContent.scrollTop = 0;
  bindDetailPhotoSliders();
  dom.sheetPanel?.classList.toggle('is-achievement-sheet', markup.includes('achievement-detail-sheet'));
  dom.sheetPanel?.classList.toggle('is-detail-sheet', markup.includes('class="detail-sheet'));
  dom.sheetPanel?.classList.toggle('is-promo-notice-sheet', markup.includes('promo-unavailable-sheet'));
  dom.sheetPanel?.classList.toggle('is-game-history-sheet', markup.includes('game-history-sheet'));
  dom.sheetPanel?.classList.toggle('is-activity-goal-sheet', markup.includes('activity-goal-sheet'));
  dom.sheetPanel?.classList.toggle('is-activity-onboarding-sheet', markup.includes('activity-goal-onboarding') || markup.includes('activity-goal-setup'));
  dom.sheet?.classList.toggle('is-activity-onboarding-root', markup.includes('activity-goal-onboarding') || markup.includes('activity-goal-setup'));
  updateProfileStickyTitle();
  dom.sheet.hidden = false;
  dom.sheet.setAttribute('aria-hidden', 'false');
  dom.sheet.classList.remove('is-open', 'is-closing', 'is-dragging');
  document.body.classList.add('has-open-sheet');
  if (dom.sheetPanel) {
    dom.sheetPanel.style.transform = 'translate3d(0, 105%, 0)';
  }
  dom.sheet.offsetHeight;
  requestAnimationFrame(() => {
    dom.sheet.classList.add('is-open');
    if (dom.sheetPanel) dom.sheetPanel.style.transform = '';
  });
}

function closeSheet() {
  if (!dom.sheet || dom.sheet.hidden || dom.sheet.classList.contains('is-closing')) return;
  clearTimeout(sheetCloseTimer);
  dom.sheet.setAttribute('aria-hidden', 'true');
  dom.sheet.classList.remove('is-open', 'is-dragging');
  dom.sheet.classList.add('is-closing');
  if (dom.sheetPanel) {
    dom.sheetPanel.style.transform = 'translate3d(0, 105%, 0)';
  }
  sheetCloseTimer = setTimeout(() => {
    dom.sheet.hidden = true;
    dom.sheet.classList.remove('is-closing');
    dom.sheetContent.innerHTML = '';
    dom.sheetPanel?.classList.remove('is-achievement-sheet');
    dom.sheetPanel?.classList.remove('is-detail-sheet');
    dom.sheetPanel?.classList.remove('is-promo-notice-sheet');
    dom.sheetPanel?.classList.remove('is-game-history-sheet');
    dom.sheetPanel?.classList.remove('is-activity-goal-sheet');
    dom.sheetPanel?.classList.remove('is-activity-onboarding-sheet');
    dom.sheet?.classList.remove('is-activity-onboarding-root');
    if (dom.sheetPanel) dom.sheetPanel.style.transform = '';
    document.body.classList.remove('has-open-sheet');
  }, SHEET_CLOSE_ANIMATION_MS);
}

function bindDetailPhotoSliders() {
  document.querySelectorAll('.detail-photo-slider').forEach((slider) => {
    const track = slider.querySelector('.detail-photo-track');
    const dots = Array.from(slider.querySelectorAll('.detail-photo-dots span'));
    if (!track || !dots.length) return;
    let frame = 0;
    const syncDots = () => {
      frame = 0;
      const index = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
    };
    track.addEventListener('scroll', () => {
      if (frame) return;
      frame = requestAnimationFrame(syncDots);
    }, { passive: true });
    syncDots();
  });
}

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    dom.toast.hidden = true;
  }, 1800);
}

function getSelectedTeam() {
  return state.teams.find((team) => team.id === state.selectedTeamId) || state.teams[0];
}

function updateGreeting() {
  const hour = new Date().getHours();
  if (dom.greeting) dom.greeting.textContent = hour < 12 ? 'Доброе утро.' : hour < 18 ? 'Добрый день.' : 'Добрый вечер.';
}

function bindSheetDrag() {
  if (!dom.sheetPanel) return;
  let startY = 0;
  let currentY = 0;
  let lastY = 0;
  let lastTime = 0;
  let velocity = 0;
  let dragging = false;

  dom.sheetPanel.addEventListener('pointerdown', (event) => {
    if (dom.sheet?.classList.contains('is-closing')) return;
    if (event.target.closest('input, textarea, select, button')) return;
    const rect = dom.sheetPanel.getBoundingClientRect();
    if (!event.target.closest('.sheet-handle') && event.clientY - rect.top > 72) return;
    startY = event.clientY;
    currentY = 0;
    lastY = event.clientY;
    lastTime = performance.now();
    velocity = 0;
    dragging = true;
    dom.sheet?.classList.add('is-dragging');
    dom.sheetPanel.setPointerCapture(event.pointerId);
  });

  dom.sheetPanel.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const now = performance.now();
    currentY = Math.max(0, event.clientY - startY);
    velocity = (event.clientY - lastY) / Math.max(1, now - lastTime);
    lastY = event.clientY;
    lastTime = now;
    dom.sheetPanel.style.transform = `translate3d(0, ${currentY}px, 0)`;
  });

  function finishDrag() {
    if (!dragging) return;
    dragging = false;
    dom.sheet?.classList.remove('is-dragging');
    if (currentY > 92 || (currentY > 36 && velocity > 0.7)) {
      closeSheet();
      return;
    }
    dom.sheetPanel.style.transform = '';
  }

  dom.sheetPanel.addEventListener('pointerup', finishDrag);
  dom.sheetPanel.addEventListener('pointercancel', finishDrag);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
