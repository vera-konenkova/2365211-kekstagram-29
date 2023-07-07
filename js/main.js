import { createPhotoDescriptions } from '/js/data.js';
import { renderThumbnails } from '/js/thumbnail.js';
import { popup } from '/js/popup.js';
renderThumbnails(createPhotoDescriptions());
popup();



