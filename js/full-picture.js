import { renderThumbnails } from '/js/thumbnail.js';
import { listOfPhotoDescriptions } from './data.js';

renderThumbnails(listOfPhotoDescriptions);

let COMMENT_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentCountElement = bigPictureElement.querySelector('.comments-count');
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

  // let comments = [];
  // let comms = [];
  // const fragment = document.createDocumentFragment();

  //     const createComments = (comment) => {
  //   commen.forEach((item) => {
  //     const comment = createComment(item);
  //     fragment.append(comment);
  //       });
  //   return comms = commentListElement.append(fragment);

  //   };

  const renderComments = (comments) => {

    let commentsShown = 0;
    const commentPortion = comments.slice(commentsShown, COMMENT_PORTION + commentsShown);
    commentsShown += COMMENT_PORTION;
     console.log(commentPortion);

        const fragment = document.createDocumentFragment();
        commentListElement.innerHTML = '' ;
        commentsLoaderElement.classList.remove('hidden');
        commentCountElement.textcontent = 23;
          commentPortion.forEach((item) => {
           const comment = createComment(item);
            fragment.append(comment);
           });
      fragment.append(comments);
      console.log(fragment);
      commentListElement.append(fragment);
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

 const onCommentsLoaderClick = () => renderComments();
 const onCancelButtonClick = () => hideBigPicture();

 const renderPictureDetails = ({ url, likes, description}) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
 };

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  commentCountElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data);
  let comments = data.comments;
  //const commentPortion = a.slice(0, 6);
  console.log(comments);

    // let commentsShown = 0;
    // const commentPortion = comments.slice(commentsShown, COMMENT_PORTION + commentsShown);
    // commentsShown += COMMENT_PORTION;
    //  console.log(commentPortion);


  if (data.comments.length > 0){

    renderComments(data.comments);
  }
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

  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { pictures, findPicture};
