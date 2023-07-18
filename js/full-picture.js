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
let commentsShown = COMMENT_PORTION;
  const renderComments = (comments) => {
    console.log(comments);

    //for ( let commentsShown = 1; commentsShown < Math.ceil(l/COMMENT_PORTION+1); commentsShown++){

    if (commentsShown > comments.length) {
      commentsLoaderElement.classList.add('hidden');
    } else {
      commentsLoaderElement.classList.remove('hidden');

      commentCount.textContent = COMMENT_PORTION + ' из ' + comments.length + ' комментариев '

        const commentPortion = comments.slice(commentsShown, COMMENT_PORTION + commentsShown);
    commentsShown += COMMENT_PORTION;
     console.log(commentPortion);
     console.log(commentsShown);

        const fragment = document.createDocumentFragment();
        commentListElement.innerHTML = '' ;
          commentPortion.forEach((item) => {
           const comment = createComment(item);
            fragment.append(comment);
           });

      commentListElement.append(fragment);
      commentsLoaderElement.addEventListener('click', onCommentsLoadClick);
      const onCommentsLoadClick = () => renderComments(comments);

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

  const commentPortion1 = comments.slice(0, COMMENT_PORTION);
   console.log(commentPortion1);
  const fragment = document.createDocumentFragment();
  commentListElement.innerHTML = '' ;
    commentPortion1.forEach((item) => {
     const comment = createComment(item);
      fragment.append(comment);
       });
    commentListElement.append(fragment);
    console.log(commentPortion1);

if (comments.length <= COMMENT_PORTION) {
commentCount.textContent = commentPortion1.length + ' из ' + commentPortion1.length + ' комментариев ';

}
    else {
    renderComments(comments);
    // commentsLoaderElement.addEventListener('click', onCommentsLoadClick)

    //onCommentsLoaderClick = () => renderComments(comments);

    };
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
