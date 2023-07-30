import './photo-filter.js';
import './form.js';
import './form-messages.js';
import './uploading-photo.js';

import { renderSortedPosts } from './photo-filter.js';
import { findPicture, pictures } from '/js/full-picture.js';
import { addFormChange } from '/js/form.js';
import { resetScale } from '/js/scale.js';

renderSortedPosts();
findPicture(pictures);
addFormChange();
resetScale();
