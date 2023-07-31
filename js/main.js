import './photo-filter.js';
import './form.js';
import './form-messages.js';
import './uploading-photo.js';

import { renderSortedPosts } from './photo-filter.js';
import { findPicture, pictures } from '/js/full-picture.js';
import { addFormChange, resetScale } from '/js/form.js';

renderSortedPosts();
findPicture(pictures);
addFormChange();
resetScale();
