import {renderThumbnails} from '/js/thumbnail.js';
import {datas} from '/js/api.js';
import {createRandomPosts, debounce} from '/js/util.js';
import { showErrorMessage } from './form-messages.js';

const RERENDER_DELAY = 500;

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
  if (datas !== undefined) {
    randomData = createRandomPosts(datas);
  }
  return randomData;
};
randomData = createRandomData();

// <Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев>
const createDiscussedData = () => {
  if (datas !== undefined) {
    const comparePosts = (postA, postB) => postB.comments.length - postA.comments.length;
    // Показываем сначала посты с большим количеством комметариев
    discussedData = datas.slice().sort(comparePosts);
  }
  return discussedData;
};
discussedData = createDiscussedData();

// Объект с вариантами сортировки постов
const SortOptions = {
  'filter-default': datas,
  'filter-random': randomData,
  'filter-discussed': discussedData,
};

const renderPosts = () => {
  const array = SortOptions[currentFilter];
  try {
    renderThumbnails(array);
  } catch (err) {
    showErrorMessage(err.message);
  }
};

// «устранение дребезга», чтобы при переключении фильтра обновление списка элементов,
// подходящих под фильтры, происходило не чаще, чем один раз в полсекунды.
const renderDebounce = debounce(() => {
  renderPosts();
}, RERENDER_DELAY);

const renderSortedPosts = () => {
  renderPosts(currentFilter);
  if (datas !== undefined) {
    imgFilters.classList.remove('img-filters--inactive');
  }
  imgFilters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    renderDebounce(currentFilter);
  });
};

export {renderSortedPosts};
