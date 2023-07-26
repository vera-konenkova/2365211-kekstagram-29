import { renderThumbnails } from '/js/thumbnail.js';
import { listOfPhotoDescriptions } from './data.js';

renderThumbnails(listOfPhotoDescriptions);

const COMMENT_PORTION = 5;
let comments = [];

const bigPictureElement = document.querySelector('.big-picture');
const commentCount = bigPictureElement.querySelector('.social__comment-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const commentElement = document.querySelector('#comment').content;
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const createComment = ({avatar, name, message}) => {
  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};
let commentsShown = 0;

const renderComments = () => {
  commentListElement.innerHTML = '' ;

  const commentPortion = comments.slice(commentsShown , COMMENT_PORTION + commentsShown);
  commentsShown += COMMENT_PORTION;

  const fragment = document.createDocumentFragment();
  commentPortion.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });
  commentListElement.append(fragment);

  if (comments.length <= COMMENT_PORTION || comments.length <= commentsShown) {
    commentsLoaderElement.classList.add('hidden');
    commentCount.textContent = `${comments.length} из ${comments.length} комментариев `;
  } else {
    commentsLoaderElement.classList.remove('hidden');
    commentCount.textContent = `${commentsShown} из ${comments.length} комментариев `;
  }
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
  commentListElement.innerHTML = '' ;
};

const onCommentsLoadClick = () => renderComments();
const onCancelButtonClick = () => hideBigPicture();

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const renderPictureDetails = ({ url, likes, description}) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};
// const onCommentsLoadClick = () => renderComments(comments);

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPictureDetails(data);
  comments = data.comments;
  commentListElement.innerHTML = '' ;
  commentsShown = 0;

  renderComments();

  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  commentsLoaderElement.removeEventListener('click', onCommentsLoadClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoadClick);
};

// поиск картинки
const container = document.querySelector('.pictures');

const findPicture = (listOfPhoto) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();

    const picture = listOfPhoto.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    commentListElement.innerHTML = '' ;
    //commentsShown = 0;

    showBigPicture(picture);
  });
};

const pictures = listOfPhotoDescriptions;

export { pictures, findPicture};
