import { renderThumbnails } from '/js/thumbnail.js';
import { listOfPhotoDescriptions } from './data.js';

renderThumbnails(listOfPhotoDescriptions);

let COMMENT_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
//const commentCountElement = bigPictureElement.querySelector('.comments-count');
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

  const renderComments = (comments) => {
    console.log(comments);

    const comShown = comments.length - Math.ceil(comments.length/COMMENT_PORTION - 1)*COMMENT_PORTION;
    console.log(comShown)
    if ((comShown + commentsShown) > comments.length) {
      commentsLoaderElement.classList.add('hidden');
    } else {
      commentsLoaderElement.classList.remove('hidden');

      if (comShown + commentsShown === comments.length) {
       // commentsShown = comments.length - comShown;
        commentCount.textContent = comments.length + ' из ' + comments.length + ' комментариев ';
        commentsLoaderElement.classList.add('hidden');
      }
        const commentPortion = comments.slice(commentsShown , COMMENT_PORTION + commentsShown);
        console.log(commentPortion);
        console.log(commentsShown);

        const fragment = document.createDocumentFragment();
        commentListElement.innerHTML = '' ;
          commentPortion.forEach((item) => {
           const comment = createComment(item);
            fragment.append(comment);
           });
           commentsShown += COMMENT_PORTION;
           commentListElement.append(fragment);
      commentCount.textContent = commentsShown + ' из ' + comments.length + ' комментариев ';

      const onCommentsLoadClick = () => renderComments(comments);
      commentsLoaderElement.addEventListener('click', onCommentsLoadClick);

    };
  //};
    };

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

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

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data);
  let comments = data.comments;

      commentsShown = 0;

    renderComments(comments);


    const onCancelButtonClick = () => hideBigPicture();

  cancelButtonElement.addEventListener('click', onCancelButtonClick);
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
    showBigPicture(picture);
   });
 };

 const pictures = listOfPhotoDescriptions;



export { pictures, findPicture};
