import {renderThumbnails} from '/js/thumbnail.js';
import {createRandomPosts, debounce} from '/js/util.js';

const RERENDER_DELAY = 500;
let localData;

// Объект с вариантами сортировки постов
const SortOptions = {
  localData: 'filter-default',
  randomData: 'filter-random',
  discussedData: 'filter-discussed',
};

// Секция с фильтрами

const imgFilters = document.querySelector('.img-filters');
//imgFilters.classList.remove('img-filters--inactive');

const imageFilterDefault = document.querySelector('#filter-default');
// Сортировка по умолчанию(при открытии страницы)
let currentFilter = imageFilterDefault.id;
let discussedData;
let randomData;

// <По умолчанию — фотографии в изначальном порядке с сервера(datas)
// <Случайные — 10 случайных, не повторяющихся фотографий>
const createRandomData = () => {
  if (localData !== undefined) {
    randomData = createRandomPosts(localData);
  }
  return randomData;
};

// <Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев>
const createDiscussedData = () => {
  if (localData !== undefined) {
    const comparePosts = (postA, postB) => postB.comments.length - postA.comments.length;
    // Показываем сначала посты с большим количеством комметариев
    discussedData = localData.slice().sort(comparePosts);
  }
  return discussedData;
};

const renderPosts = () => {
  switch (currentFilter) {
    case SortOptions.localData:
      renderThumbnails(localData);
      break;
    case SortOptions.discussedData:
      createDiscussedData();
      renderThumbnails(discussedData);
      break;
    case SortOptions.randomData:
      createRandomData();
      renderThumbnails(randomData);
      break;
  }
};

// «устранение дребезга», чтобы при переключении фильтра обновление списка элементов,
// подходящих под фильтры, происходило не чаще, чем один раз в полсекунды.
const renderDebounce = debounce(() => {
  renderPosts();
}, RERENDER_DELAY);

const renderSortedPosts = (data) => {
  localData = data;
  renderPosts();
  if (localData !== undefined) {
    imgFilters.classList.remove('img-filters--inactive');
  }
  imgFilters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    renderDebounce();
  });
};

export {renderSortedPosts};
