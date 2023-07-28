import {renderThumbnails} from '/js/thumbnail.js';
import {datas} from '/js/api.js';
import {createRandomNumberFromRangeGenerator} from '/js/util.js'

renderThumbnails(datas);
const imgFilters = document.querySelector('.img-filters');
imgFilters.classList.remove('img-filters--inactive');

let a = createRandomNumberFromRangeGenerator(0,24);
console.log(a);
