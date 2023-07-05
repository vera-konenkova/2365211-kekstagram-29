const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThubmnail = ({ comments, description, likes, url }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__img').src = url;

  return thumbnail;
}

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
  const thumbnail = createThubmnail(picture);
  console.log(thumbnail);
  fragment.appendChild(thumbnail);

});

container.append(fragment);
};
export {renderThumbnails};
