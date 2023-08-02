import './form-messages.js';
import './uploading-photo.js';

import { showAlert } from './util.js';
import { renderSortedPosts } from './photo-filter.js';
import { findPicture } from '/js/full-picture.js';
import { addFormChange, resetScale } from '/js/form.js';
import { getData } from './api.js';

addFormChange();
resetScale();

try {
  const data = await getData();
  renderSortedPosts(data);
  findPicture(data);
} catch (e) {
  showAlert(e);
}
