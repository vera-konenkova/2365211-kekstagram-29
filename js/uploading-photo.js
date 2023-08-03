// Загрузка изображения пользователя
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const scaleImage = document.querySelector('.img-upload__preview');
const preview = scaleImage.querySelector('img');
const smallPreviews = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if (matches) {
    preview.src = URL.createObjectURL(file);
    smallPreviews.forEach((smallPreview) => {
      smallPreview.style.backgroundImage = `url('${preview.src}')`;
    });
  }
});

