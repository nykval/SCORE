import { renderGameCard, renderGameRow, renderMemberRow, renderProfileCard, renderTeamCard, renderTeamEvent, renderVenueCard } from '../components/cards.js';
import { chip, emptyState, progressBar, searchBar, viewToggle } from '../components/ui.js';
import { escapeAttr, escapeHtml, formatGameDate, formatNumber, formatPrice, getGameStatus, uniqueSports } from '../utils/format.js';

export function renderHome({ state, nextGame, home }) {
  const stats = state.profile.stats || {};
  const hero = home?.hero || {};
  const heroGame = state.games.find((game) => game.id === hero.gameId) || nextGame;
  const quickActions = home?.quickActions || [];
  const activity = home?.activity || [];
  const activityGames = activity
    .filter((item) => item.action === 'game-detail' && item.id)
    .map((item) => ({ game: state.games.find((game) => game.id === item.id), relation: item.label }))
    .filter((item) => item.game);
  const activityGameIds = new Set(activityGames.map((item) => item.game.id));
  const userGames = activityGames.concat(
    state.games
      .filter((game) => game.joined && !activityGameIds.has(game.id))
      .map((game) => ({ game, relation: 'Вы участвуете' }))
  );
  const tasks = home?.tasks || [];
  const news = home?.news || [];
  return `
    <div class="screen-stack">
      ${renderPromoCarousel({ hero, heroGame, state })}

      ${renderUserGamesCarousel(userGames)}

      ${renderActivityGoal({ stats, goal: state.activityGoal })}

      <section class="home-block">
        <div class="section-header compact">
          <h2>Быстрые действия</h2>
        </div>
        <div class="quick-action-grid">
          ${quickActions.map(renderQuickAction).join('')}
        </div>
      </section>

      <section class="section-card">
        <div class="section-header compact">
          <h2>Моя активность</h2>
          <button class="link-action" type="button" data-action="open-notifications">Все ›</button>
        </div>
        <div class="activity-grid">
          ${activity.map(renderActivityCard).join('')}
        </div>
      </section>

      <section class="section-card">
        <div class="section-header compact">
          <h2>Ежедневные задания</h2>
          <span class="result-label">+${formatNumber(tasks.reduce((sum, task) => sum + Number(task.reward || 0), 0))} SCORE</span>
        </div>
        <div class="daily-task-list">
          ${tasks.map(renderDailyTask).join('')}
        </div>
      </section>

      <section class="home-score-card">
        <div>
          <span class="eyebrow">SCORE</span>
          <h2>${formatNumber(stats.scorePoints || 0)}</h2>
          <p>Уровень 4 · до уровня 5 осталось ${Math.max(0, Number(stats.levelTarget || 70) - Number(stats.levelScore || 0))} игр</p>
        </div>
        ${progressBar(stats.levelScore || 0, stats.levelTarget || 70, 'Прогресс уровня')}
      </section>

      <section class="home-block">
        <div class="section-header compact">
          <h2>Новости SCORE</h2>
          <button class="link-action" type="button" data-action="open-notifications">Все ›</button>
        </div>
        <div class="news-strip">
          ${news.map(renderNewsCard).join('')}
        </div>
      </section>
    </div>
  `;
}

function renderPromoCarousel() {
  const slides = [
    {
      title: 'Создай свою первую игру',
      image: './assets/promo/optimized/showcase-create-game.jpg',
      cta: 'Создать игру'
    },
    {
      title: 'Подари игру друзьям',
      image: './assets/promo/optimized/showcase-gift-game-v2.jpg',
      cta: 'Подарить игру'
    },
    {
      title: 'Собери свою команду',
      image: './assets/promo/optimized/showcase-team.jpg',
      cta: 'Собрать команду'
    },
    {
      title: 'Найди площадку рядом',
      image: './assets/promo/optimized/showcase-venues.jpg',
      cta: 'Найти площадку'
    }
  ];

  return `
    <section class="home-promo-carousel" aria-label="Промо SCORE">
      <div class="home-promo-track">
        ${slides.map((slide, index) => `
          <article class="home-promo-card" aria-label="${escapeAttr(slide.title)}" data-promo-image="${escapeAttr(slide.image)}"${index === 0 ? ` style="--promo-image:url('${escapeAttr(slide.image)}')"` : ''}>
            <img class="home-promo-image" src="${escapeAttr(slide.image)}" alt="" aria-hidden="true" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async">
            <button class="home-promo-cta" type="button" data-action="promo-unavailable">${escapeHtml(slide.cta)} <i aria-hidden="true">→</i></button>
          </article>
        `).join('')}
      </div>
      <div class="home-promo-dots" aria-hidden="true">
        ${slides.map((_, index) => `<span class="${index === 0 ? 'is-active' : ''}"></span>`).join('')}
      </div>
    </section>
  `;
}

function renderUserGamesCarousel(items) {
  if (!items.length) return '';
  const countLabel = items.length === 1 ? '1 игра' : items.length < 5 ? `${items.length} игры` : `${items.length} игр`;
  return `
    <section class="home-user-games" aria-label="Мои игры">
      <div class="section-header compact">
        <h2>Мои игры</h2>
        <span class="home-user-games-count">${countLabel}</span>
      </div>
      <div class="home-user-games-track">
        ${items.map(renderUserGameCard).join('')}
        <button class="home-user-games-more" type="button" data-action="open-game-history" aria-label="Просмотреть все игры">
          <span aria-hidden="true">→</span>
          <strong>Просмотреть все</strong>
          <small>Все игры и история</small>
        </button>
      </div>
    </section>
  `;
}

function renderActivityGoal({ stats, goal }) {
  if (!goal?.isSet) {
    return `
      <section class="home-activity-goal" aria-label="Цель активности">
        <button class="activity-goal-prompt" type="button" data-action="open-activity-goal">
          <span class="activity-goal-prompt-visual" aria-hidden="true">
            <img class="activity-goal-prompt-image" src="./assets/activity/goal-flag-3d.png" alt="">
          </span>
          <span class="activity-goal-prompt-copy">
            <strong>Поставь цель активности</strong>
            <span>Выбери свой ритм и начни двигаться к нему</span>
          </span>
        </button>
      </section>
    `;
  }

  const completed = Math.max(0, Number(stats?.week?.minutes || 0));
  const target = Math.max(1, Number(goal?.targetMinutes || 300));
  const progress = Math.min(100, Math.round((completed / target) * 100));
  const title = progress >= 100 ? 'Цель выполнена' : 'Продолжай в том же духе';

  return `
    <section class="home-activity-goal" aria-label="Цель активности">
      <button class="activity-goal-card" type="button" data-action="open-activity-goal" aria-label="Открыть цель активности">
        <span class="activity-goal-ring" style="--goal-progress:${progress}%"></span>
        <span class="activity-goal-copy">
          <strong>${formatNumber(completed)} / ${formatNumber(target)} мин</strong>
          <span>${title}</span>
        </span>
      </button>
    </section>
  `;
}

function renderUserGameCard({ game, relation }) {
  const status = getGameStatus(game);
  const dateLabel = formatGameDate(game).split(' · ')[0];
  const timeParts = String(game.time || '00:00').split(':');
  const startMinutes = Number(timeParts[0]) * 60 + Number(timeParts[1]);
  const endMinutes = startMinutes + Number(game.duration || 60);
  const endTime = `${String(Math.floor(endMinutes / 60) % 24).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`;
  const relationLabel = game.joined ? 'Вы участвуете' : relation === 'Созданная игра' ? 'Вы организатор' : relation;
  const roleClass = relationLabel === 'Вы организатор' ? 'is-organizer' : 'is-participant';
  const slotsLeft = Math.max(0, Number(game.max || 0) - Number(game.current || 0));
  const slotsLabel = slotsLeft === 1 ? '1 место' : slotsLeft < 5 ? `${slotsLeft} места` : `${slotsLeft} мест`;
  const slotsClass = slotsLeft > 0 && slotsLeft <= 2 ? 'is-urgent' : '';
  const occupancy = Math.min(100, Math.round((Number(game.current || 0) / Math.max(1, Number(game.max || 1))) * 100));
  const avatarOffset = Math.max(0, Number.parseInt(String(game.id).replace(/\D/g, ''), 10) || 0);
  const playerAvatars = (game.players || []).slice(0, 3).map((_, index) => `./assets/avatars/avatar-${((avatarOffset + index) % 7) + 1}.svg`);
  return `
    <button class="home-user-game-card ${roleClass}" style="--game-progress:${occupancy}%" type="button" data-action="promo-unavailable" aria-label="${escapeAttr(game.title)}">
      <div class="home-user-game-head">
        <span class="home-user-game-sport" aria-hidden="true"><img src="${escapeAttr(game.image)}" alt=""></span>
        <span class="home-user-game-schedule">
          <span><small>${escapeHtml(dateLabel)}</small><em class="${escapeAttr(status.className)}"><i></i>${escapeHtml(status.label)}</em></span>
          <strong>${escapeHtml(game.time)}–${endTime}</strong>
        </span>
        <strong class="home-user-game-price">${formatPrice(game.price)}</strong>
      </div>
      <div class="home-user-game-info">
        <h3 class="home-user-game-title">${escapeHtml(game.title)}</h3>
        <div class="home-user-game-place">
          <img src="./icons/location.png" alt="" aria-hidden="true">
          <span><b>${escapeHtml(game.place)}</b><small>м. ${escapeHtml(game.metro)}</small></span>
        </div>
        <div class="home-user-game-meta">
          <span>${escapeHtml(game.sport)}</span>
          <span>${escapeHtml(game.format)}</span>
          <span>${escapeHtml(game.level)}</span>
        </div>
      </div>
      <div class="home-user-game-roster">
        <div class="home-user-game-roster-row">
          <div class="home-user-game-avatars" aria-hidden="true">
            ${playerAvatars.map((src) => `<span><img src="${escapeAttr(src)}" alt=""></span>`).join('')}
          </div>
          <span class="home-user-game-player-count"><b>${game.current} из ${game.max}</b><small>игроков в составе</small></span>
          <strong class="home-user-game-slots ${slotsClass}">${slotsLeft > 0 ? `Ещё ${slotsLabel}` : 'Состав собран'}</strong>
        </div>
        <span class="home-user-game-progress" aria-label="Состав заполнен на ${occupancy}%"><i></i></span>
      </div>
      <div class="home-user-game-footer">
        <span><i aria-hidden="true">${roleClass === 'is-organizer' ? '★' : '✓'}</i>${escapeHtml(relationLabel)}</span>
        <b>Подробнее <i aria-hidden="true">→</i></b>
      </div>
    </button>
  `;
}

export function renderGamesScreen({ state, games }) {
  const gameSports = ['Все', ...uniqueSports(state.games)];
  const gameLevels = ['Все', ...Array.from(new Set(state.games.map((game) => game.level).filter(Boolean)))];
  return `
    <div class="screen-stack">
      ${searchBar({ scope: 'games', value: state.filters.games.query, placeholder: 'Поиск игр', buttonLabel: 'Создать', buttonAction: 'create-game' })}
      <div class="toolbar-row">
        <div class="chip-scroll">
          ${chip({ label: 'Все', active: allGameFiltersOff(state.filters.games), action: 'game-filter', value: 'reset' })}
          ${chip({ label: 'Сегодня', active: state.filters.games.today, action: 'game-filter', value: 'today' })}
          ${chip({ label: 'Бесплатно', active: state.filters.games.free, action: 'game-filter', value: 'free' })}
          ${chip({ label: 'С тренером', active: state.filters.games.coach, action: 'game-filter', value: 'coach' })}
          ${chip({ label: 'Рядом', active: state.filters.games.nearby, action: 'game-filter', value: 'nearby' })}
        </div>
      </div>
      <div class="filter-groups">
        <div>
          <span>Вид спорта</span>
          <div class="chip-scroll">${gameSports.map((sport) => chip({ label: sport, active: state.filters.games.sport === sport, action: 'game-filter', value: `sport:${sport}` })).join('')}</div>
        </div>
        <div>
          <span>Дата</span>
          <div class="chip-scroll">
            ${[
              ['any', 'Любая'],
              ['today', 'Сегодня'],
              ['week', 'На неделе']
            ].map(([value, label]) => chip({ label, active: state.filters.games.date === value, action: 'game-filter', value: `date:${value}` })).join('')}
          </div>
        </div>
        <div>
          <span>Время</span>
          <div class="chip-scroll">
            ${[
              ['any', 'Любое'],
              ['morning', 'Утро'],
              ['evening', 'Вечер']
            ].map(([value, label]) => chip({ label, active: state.filters.games.time === value, action: 'game-filter', value: `time:${value}` })).join('')}
          </div>
        </div>
        <div>
          <span>Расстояние</span>
          <div class="chip-scroll">
            ${[
              ['any', 'Любое'],
              ['near', 'До 2 км'],
              ['five', 'До 5 км']
            ].map(([value, label]) => chip({ label, active: state.filters.games.distance === value, action: 'game-filter', value: `distance:${value}` })).join('')}
          </div>
        </div>
        <div>
          <span>Уровень и места</span>
          <div class="chip-scroll">
            ${gameLevels.map((level) => chip({ label: level, active: state.filters.games.level === level, action: 'game-filter', value: `level:${level}` })).join('')}
            ${chip({ label: 'Есть места', active: state.filters.games.slots === 'open', action: 'game-filter', value: 'slots:open' })}
          </div>
        </div>
        <div>
          <span>Цена</span>
          <div class="chip-scroll">
            ${chip({ label: 'Любая', active: state.filters.games.price === 'any', action: 'game-filter', value: 'price:any' })}
            ${chip({ label: 'Бесплатно', active: state.filters.games.price === 'free', action: 'game-filter', value: 'price:free' })}
            ${chip({ label: 'Платные', active: state.filters.games.price === 'paid', action: 'game-filter', value: 'price:paid' })}
          </div>
        </div>
      </div>
      <div class="section-header compact">
        <span class="result-label">Найдено: ${games.length}</span>
        ${viewToggle(state.filters.games.view)}
      </div>
      ${state.filters.games.view === 'map' ? renderMapPreview(games) : ''}
      <div class="list-stack">
        ${games.length ? games.map(renderGameCard).join('') : emptyState('Игр не найдено', 'Попробуйте снять фильтр или создать свою игру.', 'Создать игру', 'create-game')}
      </div>
    </div>
  `;
}

export function renderVenuesScreen({ state, venues }) {
  const sports = ['Все', ...uniqueSports(state.venues)];
  const locations = ['Все', ...Array.from(new Set(state.venues.flatMap((venue) => [venue.district, venue.metro]).filter(Boolean)))];
  const amenities = ['Все', ...Array.from(new Set(state.venues.flatMap((venue) => venue.amenities || [])))];
  const surfaces = ['Все', ...Array.from(new Set(state.venues.map((venue) => venue.surface).filter(Boolean)))];
  const sizes = ['Все', ...Array.from(new Set(state.venues.map((venue) => venue.size).filter(Boolean)))];
  return `
    <div class="screen-stack">
      ${searchBar({ scope: 'venues', value: state.filters.venues.query, placeholder: 'Поиск площадок' })}
      <div class="chip-scroll filter-rail">
        ${chip({ label: 'Все', active: allVenueFiltersOff(state.filters.venues), action: 'venue-filter', value: 'reset' })}
        ${chip({ label: 'Новые', active: state.filters.venues.isNew, action: 'venue-filter', value: 'isNew' })}
        ${chip({ label: 'Бесплатно', active: state.filters.venues.free, action: 'venue-filter', value: 'free' })}
        ${chip({ label: 'Избранное', active: state.filters.venues.favorite, action: 'venue-filter', value: 'favorite' })}
        ${chip({ label: 'В помещении', active: state.filters.venues.indoor, action: 'venue-filter', value: 'indoor' })}
        ${chip({ label: 'Открытая', active: state.filters.venues.open, action: 'venue-filter', value: 'open' })}
      </div>
      <div class="filter-groups">
        <div>
          <span>Вид спорта</span>
          <div class="chip-scroll">${sports.map((sport) => chip({ label: sport, active: state.filters.venues.sport === sport, action: 'venue-filter', value: `sport:${sport}` })).join('')}</div>
        </div>
        <div>
          <span>Стоимость</span>
          <div class="chip-scroll">
            ${[
              ['any', 'Любая'],
              ['free', 'Бесплатно'],
              ['low', 'до 2 500 ₽'],
              ['mid', '2 500-5 000 ₽'],
              ['paid', 'Платные']
            ].map(([value, label]) => chip({ label, active: state.filters.venues.price === value, action: 'venue-filter', value: `price:${value}` })).join('')}
          </div>
        </div>
        <div>
          <span>Расстояние</span>
          <div class="chip-scroll">
            ${[
              ['any', 'Любое'],
              ['near', 'До 2 км'],
              ['five', 'До 5 км']
            ].map(([value, label]) => chip({ label, active: state.filters.venues.distance === value, action: 'venue-filter', value: `distance:${value}` })).join('')}
          </div>
        </div>
        <div>
          <span>Покрытие</span>
          <div class="chip-scroll">${surfaces.map((surface) => chip({ label: surface, active: state.filters.venues.surface === surface, action: 'venue-filter', value: `surface:${surface}` })).join('')}</div>
        </div>
        <div>
          <span>Освещение</span>
          <div class="chip-scroll">
            ${[
              ['any', 'Любое'],
              ['yes', 'Есть свет']
            ].map(([value, label]) => chip({ label, active: state.filters.venues.lighting === value, action: 'venue-filter', value: `lighting:${value}` })).join('')}
          </div>
        </div>
        <div>
          <span>Размер площадки</span>
          <div class="chip-scroll">${sizes.map((size) => chip({ label: size, active: state.filters.venues.size === size, action: 'venue-filter', value: `size:${size}` })).join('')}</div>
        </div>
        <div>
          <span>Рейтинг и оплата</span>
          <div class="chip-scroll">
            ${chip({ label: '4.7+', active: state.filters.venues.rating === 'high', action: 'venue-filter', value: 'rating:high' })}
            ${chip({ label: 'Бесплатные', active: state.filters.venues.paid === 'free', action: 'venue-filter', value: 'paid:free' })}
            ${chip({ label: 'Платные', active: state.filters.venues.paid === 'paid', action: 'venue-filter', value: 'paid:paid' })}
          </div>
        </div>
        <div>
          <span>Расположение</span>
          <div class="chip-scroll">${locations.map((location) => chip({ label: location, active: state.filters.venues.location === location, action: 'venue-filter', value: `location:${location}` })).join('')}</div>
        </div>
        <div>
          <span>Удобства</span>
          <div class="chip-scroll">${amenities.map((amenity) => chip({ label: amenity, active: state.filters.venues.amenity === amenity, action: 'venue-filter', value: `amenity:${amenity}` })).join('')}</div>
        </div>
      </div>
      <div class="section-header compact">
        <span class="result-label">Найдено: ${venues.length}</span>
        ${viewToggle(state.filters.venues.view, 'venue-view')}
      </div>
      ${state.filters.venues.view === 'map' ? renderVenueMapPreview(venues) : ''}
      <div class="list-stack">
        ${venues.length ? venues.map(renderVenueCard).join('') : emptyState('Площадок не найдено', 'Измените фильтры или посмотрите соседний район.', 'Сбросить фильтры', 'venue-filter', 'reset')}
      </div>
    </div>
  `;
}

export function renderProgressScreen({ state, joinedGames }) {
  const achievements = state.profile.achievements || [];
  const series = groupAchievements(achievements);
  return `
    <div class="screen-stack achievements-screen">
      ${series.length ? series.map(renderAchievementSeries).join('') : emptyState('Пока нет ачивок', 'Скоро здесь появятся первые серии SCORE.')}
    </div>
  `;
}

export function renderProfileScreen({ state, teams, joinedGames, favoriteVenues = [], favoriteGames = [] }) {
  const history = state.profile.history || {};
  return `
    <div class="screen-stack">
      ${renderProfileCard(state.profile)}
      <section class="favorites-section">
        <div class="section-header compact"><h2>Сохраненные площадки</h2><span class="result-label">${favoriteVenues.length}</span></div>
        <div class="favorites-strip">
          ${favoriteVenues.length ? favoriteVenues.map(renderFavoriteVenueTile).join('') : emptyState('Площадок пока нет', 'Сохраняйте площадки из каталога, чтобы они появлялись в профиле.')}
        </div>
      </section>
      <section class="section-card">
        <div class="section-header compact"><h2>Избранные игры</h2><span class="result-label">${favoriteGames.length}</span></div>
        ${favoriteGames.length ? `<div class="profile-scroll-row">${favoriteGames.map(renderProfileGameTile).join('')}</div>` : emptyState('Избранных игр пока нет', 'Сохраняйте игры из ленты, чтобы вернуться к ним позже.')}
      </section>
      <section class="section-card">
        <div class="section-header"><h2>Мои игры</h2></div>
        ${joinedGames.length ? `<div class="profile-scroll-row">${joinedGames.map(renderProfileGameTile).join('')}</div>` : emptyState('Вы пока не участвуете в играх', 'Найдите игру рядом или создайте свою.', 'Найти игру', 'nav', 'games')}
      </section>
      <section class="section-card">
        <div class="section-header">
          <h2>Мои команды</h2>
          <button class="small-action" type="button" data-action="create-team">Создать</button>
        </div>
        <div class="mini-team-list profile-scroll-row">
          ${teams.length ? teams.map((team) => renderTeamCard(team, true)).join('') : emptyState('Команд пока нет', 'Создайте команду и пригласите игроков.', 'Создать команду', 'create-team')}
        </div>
      </section>
      <section class="section-card">
        <div class="section-header"><h2>История</h2></div>
        <div class="profile-history-grid">
          ${renderHistoryColumn('История игр', history.games || [])}
          ${renderHistoryColumn('История бронирований', history.bookings || [])}
        </div>
      </section>
      <section class="section-card">
        <div class="section-header"><h2>Настройки</h2></div>
        <div class="settings-list">
          ${['Аккаунт', 'Уведомления', 'Конфиденциальность', 'Поддержка'].map((item) => `
            <button class="settings-row" type="button" data-action="${item === 'Уведомления' ? 'open-notifications' : 'profile-detail'}">
              <span>${escapeHtml(item)}</span>
              <img src="./icons/arrow.png" alt="" aria-hidden="true">
            </button>
          `).join('')}
        </div>
      </section>
      <section class="profile-developer-section" aria-label="Для разраба">
        <div class="section-header compact"><h2>Для разраба</h2></div>
        <button class="profile-developer-action" type="button" data-action="reset-user-activity-goal">
          <span class="profile-developer-icon" aria-hidden="true">↺</span>
          <span class="profile-developer-copy">
            <strong>Сбросить цель пользователя</strong>
            <small>Вернуть призыв и онбординг цели</small>
          </span>
        </button>
      </section>
    </div>
  `;
}

export function renderTeamScreen({ state, team }) {
  return `
    <div class="screen-stack">
      <select class="inline-select full" data-team-switch aria-label="Команда">
        ${state.teams.map((item) => `<option value="${item.id}" ${item.id === team.id ? 'selected' : ''}>${escapeHtml(item.name)}</option>`).join('')}
      </select>
      ${renderTeamCard(team)}
      <section class="section-card">
        <div class="section-header">
          <h2>Состав команды</h2>
          <button class="small-action" type="button" data-action="invite-player">Пригласить</button>
        </div>
        ${team.members.map(renderMemberRow).join('')}
      </section>
      <section class="section-card">
        <div class="section-header">
          <h2>Ближайшие игры команды</h2>
          <button class="small-action" type="button" data-action="create-game">Создать</button>
        </div>
        <div class="list-stack dense">${team.events.map(renderTeamEvent).join('')}</div>
      </section>
      <section class="section-card">
        <div class="section-header">
          <h2>Заявки в команду</h2>
          <button class="small-action" type="button" data-action="open-team-requests">Все</button>
        </div>
        ${team.requests.length ? team.requests.map((request) => renderMemberRow(request, '<button class="small-action is-primary" type="button">Принять</button>')).join('') : emptyState('Новых заявок нет', 'Когда игроки откликнутся, заявки появятся здесь.')}
      </section>
      <section class="section-card">
        <div class="section-header"><h2>Настройки команды</h2></div>
        ${team.settings.map((item) => `<div class="list-row"><strong>${escapeHtml(item)}</strong><span class="meta-pill">Включено</span></div>`).join('')}
      </section>
    </div>
  `;
}

function renderQuickAction(item) {
  const dataValue = item.value ? ` data-value="${escapeHtml(item.value)}"` : '';
  return `
    <button class="quick-action-card card-affordance" type="button" data-action="${escapeHtml(item.action)}"${dataValue}>
      <span><img src="${escapeHtml(item.icon)}" alt="" aria-hidden="true"></span>
      <strong>${escapeHtml(item.title)}</strong>
      <small>${escapeHtml(item.text)}</small>
    </button>
  `;
}

function renderActivityCard(item) {
  const id = item.id ? ` data-id="${escapeHtml(item.id)}"` : '';
  return `
    <button class="activity-card card-affordance" type="button" data-action="${escapeHtml(item.action)}"${id}>
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.title)}</strong>
      <small>${escapeHtml(item.meta)}</small>
    </button>
  `;
}

function renderDailyTask(task) {
  return `
    <article class="daily-task-card">
      <div>
        <strong>${escapeHtml(task.title)}</strong>
        <p>${escapeHtml(task.text)}</p>
      </div>
      <span>+${formatNumber(task.reward)} SCORE</span>
      ${progressBar(task.progress || 0, 100, 'Прогресс задания')}
    </article>
  `;
}

function renderNewsCard(item) {
  return `
    <article class="news-card">
      <span>${escapeHtml(item.type)}</span>
      <strong>${escapeHtml(item.title)}</strong>
      <p>${escapeHtml(item.text)}</p>
    </article>
  `;
}

function renderHistoryColumn(title, items) {
  return `
    <div class="history-column">
      <strong>${escapeHtml(title)}</strong>
      ${items.length ? items.map((item) => `<span>${escapeHtml(item)}</span>`).join('') : '<span>Пока пусто</span>'}
    </div>
  `;
}

function renderMapPreview(games) {
  const pins = games.slice(0, 8).map((game, index) => `<span style="--x:${18 + (index * 11) % 62}%;--y:${24 + (index * 17) % 52}%">${game.price ? `${game.price} ₽` : '0 ₽'}</span>`).join('');
  return `
    <section class="map-preview">
      ${pins}
      <strong>Игры рядом</strong>
    </section>
  `;
}

function renderVenueMapPreview(venues) {
  const pins = venues.slice(0, 8).map((venue, index) => `<span style="--x:${16 + (index * 13) % 64}%;--y:${20 + (index * 19) % 56}%">${venue.price === 0 ? 'Free' : `${formatNumber(venue.price)} ₽`}</span>`).join('');
  return `
    <section class="map-preview venue-map-preview">
      ${pins}
      <strong>Площадки рядом</strong>
    </section>
  `;
}

function allGameFiltersOff(filters) {
  return !filters.today
    && !filters.free
    && !filters.coach
    && !filters.nearby
    && !filters.favorite
    && filters.sport === 'Все'
    && filters.date === 'any'
    && filters.time === 'any'
    && filters.distance === 'any'
    && filters.level === 'Все'
    && filters.price === 'any'
    && filters.slots === 'any';
}

function allVenueFiltersOff(filters) {
  return !filters.free
    && !filters.favorite
    && !filters.indoor
    && !filters.open
    && !filters.isNew
    && filters.sport === 'Все'
    && filters.price === 'any'
    && filters.location === 'Все'
    && filters.amenity === 'Все'
    && filters.distance === 'any'
    && filters.surface === 'Все'
    && filters.lighting === 'any'
    && filters.size === 'Все'
    && filters.rating === 'any'
    && filters.paid === 'any';
}

function renderMiniGameTile(game) {
  return `
    <button class="mini-game-tile" type="button" data-action="game-detail" data-id="${game.id}">
      <img src="${game.image}" alt="">
      <span>${game.isNew ? 'Набор' : 'Матч'}</span>
      <strong>${escapeHtml(game.sport)}</strong>
      <small>${formatGameDate(game)}</small>
      <small>${escapeHtml(game.place)}</small>
      <b>${game.current} из ${game.max}</b>
    </button>
  `;
}

function renderFavoriteVenueTile(venue) {
  return `
    <button class="favorite-tile" type="button" data-action="venue-detail" data-id="${venue.id}">
      <img src="${venue.photo}" alt="">
      <span>${escapeHtml(venue.label)}</span>
      <strong>${escapeHtml(venue.name)}</strong>
      <small>${escapeHtml(venue.district)} · м. ${escapeHtml(venue.metro)}</small>
      <b>${venue.price === 0 ? 'Бесплатно' : `${formatNumber(venue.price)} ₽/ч`}</b>
    </button>
  `;
}

function renderPeriodStat(label, gamesCount, points, minutes) {
  return `
    <article class="period-stat-card">
      <span>${escapeHtml(label)}</span>
      <strong>${formatNumber(gamesCount)}</strong>
      <small>игр сыграно</small>
      <div>
        <b>${formatNumber(points)}</b><small>очков</small>
      </div>
      <div>
        <b>${formatNumber(minutes)}</b><small>минут</small>
      </div>
    </article>
  `;
}

function groupAchievements(achievements) {
  const groups = [];
  achievements.forEach((item) => {
    const title = item.series || 'Достижения';
    let group = groups.find((entry) => entry.title === title);
    if (!group) {
      group = { title, items: [] };
      groups.push(group);
    }
    group.items.push(item);
  });
  return groups;
}

function renderAchievementSeries(series) {
  const unlocked = series.items.filter((item) => item.unlocked).length;
  return `
    <section class="achievement-series-card">
      <div class="achievement-series-header">
        <div>
          <h2>${escapeHtml(series.title)}</h2>
        </div>
        <strong>${unlocked}/${series.items.length}</strong>
      </div>
      <div class="achievement-trophy-grid">
        ${series.items.map(renderAchievement).join('')}
      </div>
    </section>
  `;
}

function renderAchievement(item) {
  const isImageIcon = typeof item.icon === 'string' && /\.(svg|png|jpe?g|webp)$/i.test(item.icon);
  return `
    <button class="achievement-trophy ${item.unlocked ? 'is-earned' : 'is-locked'}" type="button" data-action="achievement-detail" data-id="${escapeAttr(item.id || item.title)}">
      <span class="achievement-medal">
        ${isImageIcon ? `<img src="${escapeAttr(item.icon)}" alt="">` : `<b>${escapeHtml(item.icon || '🏆')}</b>`}
      </span>
      <strong>${escapeHtml(item.title)}</strong>
    </button>
  `;
}

function renderProfileGameTile(game) {
  return `
    <button class="profile-game-tile" type="button" data-action="game-detail" data-id="${game.id}">
      <span>${game.isNew ? 'Набор' : 'Матч'}</span>
      <strong>${escapeHtml(game.title)}</strong>
      <small>${formatGameDate(game)}</small>
      <small>${escapeHtml(game.place)}</small>
      <b>${game.current} из ${game.max}</b>
    </button>
  `;
}

function renderNearbyGame(game) {
  return `
    <button class="nearby-row" type="button" data-action="game-detail" data-id="${game.id}">
      <span>${game.sport === 'Футбол' ? '⚽' : game.sport === 'Баскетбол' ? '🏀' : '🏐'}</span>
      <div><strong>${escapeHtml(game.sport)}</strong><small>${escapeHtml(game.place)}</small></div>
      <b>${game.nearby ? '1.2 км' : '3.5 км'}</b>
      <small>${game.current}/${game.max}</small>
    </button>
  `;
}
