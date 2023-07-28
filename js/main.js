import { findPicture, pictures } from '/js/full-picture.js';
import { addFormChange } from '/js/form.js';
import { resetScale } from '/js/scale.js';

//import './form.js';
import './form-messages.js';

const imgFilters = document.querySelector('.img-filters');
imgFilters.classList.remove('img-filters--inactive');
findPicture(pictures);


addFormChange();

resetScale();
