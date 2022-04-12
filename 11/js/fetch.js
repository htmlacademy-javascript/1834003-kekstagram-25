const Urls = {
  GET: 'https://25.javascript.pages.academy/kekstagram/data',
  POST: 'https://25.javascript.pages.academy/kekstagram',
};

const request = (onSuccess, onError, method, formData) => {
  fetch (
    Urls[method],
    {
      method: method,
      body: formData,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    }).catch(() => {
      onError();
    });
};

export {request};
