const ALLOWED_HASHTAGS = /^#[a-za-яё0-9]{1,19}$/i;
const MAX_COMMENTS_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
}
);
const isValidComment = (comment) => comment.length <= MAX_COMMENTS_LENGTH;

const makeHashtagsArray = (value) =>
  value.trim()
    .toLowerCase()
    .split(' ')
    .filter((item) => item);
const isValidHashtag = (value) => {
  if (!value) {
    return true;
  }
  const hashtagsArray = makeHashtagsArray(value);
  return hashtagsArray.every((test) => ALLOWED_HASHTAGS.test(test));
};
const isValidCount = (value) => {
  const hashtagsArray = makeHashtagsArray(value);
  return hashtagsArray.length <= MAX_HASHTAGS_COUNT;
};
const isUniqueHashtags = (value) => {
  const hashtagsArray = makeHashtagsArray(value);
  const unigueHashtag = new Set(hashtagsArray);
  return unigueHashtag.size === hashtagsArray.length;
};

const addValidator = () => {
  pristine.addValidator(
    textHashtags,
    isValidHashtag,
    'Хэштег должен начинаться с "#", содержать буквы и цифры (не более 20 символов, включая #)',
  );

  pristine.addValidator(
    textHashtags,
    isUniqueHashtags,
    'Хэштеги не долны повторяться',
  );
  pristine.addValidator(
    textHashtags,
    isValidCount,
    'Нельзя указать больше пяти хэштегов',
  );
  pristine.addValidator(
    textHashtags,
    isValidComment,
    'Длина комментария не должна превышать 140 символов',
  );
};

const resetPristine = () => pristine.reset();
const validatePristine = () => pristine.validate();
export {addValidator, resetPristine, validatePristine, pristine, uploadForm};
