/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* Form handler */
const submitList = document.querySelectorAll('.submit-js');
const SEND_URL = '/webroot/forms/application.php';
const WP_ACTION = {
  keyname: 'action',
  keyValue: 'app',
};

// eslint-disable-next-line no-underscore-dangle
let _counter = 0;

/** Можно добавить дата аттрибут pattern для проверки по регулярному выражению */
function checkFieldWithPatter(input) {
  if (input.pattern === undefined || input.pattern === null || input.pattern === false) {
    return true;
  }
  if (new RegExp(input.dataset.pattern, 'g').test(input.value)) {
    return true;
  }
  return false;
}

function checkRequiredFields(form) {
  const inputs = form.querySelectorAll('input[type="email"],input[type="text"],textarea');
  const sendObject = {};
  // sendObject.form_name = form.dataset.name || '';
  sendObject.metka = window.location.href || '';
  inputs.forEach((input) => {
    const inputGroup = input.closest('.input-group');

    if (input.dataset.required === 'true' && input.value.length === 0) {
      inputGroup.classList.add('unfilled');
    } else if (!checkFieldWithPatter(input)) {
      inputGroup.classList.add('unfilled');
    } else {
      inputGroup.classList.remove('unfilled');
    }
    sendObject[input.name] = input.value;
  });
  form.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    sendObject[checkbox.name] = checkbox.checked;
  });
  if (form.querySelector('.unfilled') === null) {
    // console.log(sendObject);
    return sendObject;
  }
  return false;

  // //console.log(form.querySelector('.unfilled'));
}

function counterHandler(input) {
  input.addEventListener('keypress', () => {
    _counter += 1;
  });
}

const loadIcon = `
<svg class="load-indication" style="position:absolute; bottom:20px; right:20px; /*transform:translate(-100%,-100%);*/" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="20px" height="20px" viewBox="0 0 128 128" xml:space="preserve"><path fill="#000000" fill-opacity="1" id="ball1" class="cls-1" d="M67.712,108.82a10.121,10.121,0,1,1-1.26,14.258A10.121,10.121,0,0,1,67.712,108.82Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;4 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;" dur="800ms" repeatCount="indefinite"></animateTransform></path><path fill="#000000" fill-opacity="1" id="ball2" class="cls-1" d="M51.864,106.715a10.125,10.125,0,1,1-8.031,11.855A10.125,10.125,0,0,1,51.864,106.715Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;10 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;" dur="800ms" repeatCount="indefinite"></animateTransform></path><path fill="#000000" fill-opacity="1" id="ball3" class="cls-1" d="M33.649,97.646a10.121,10.121,0,1,1-11.872,8A10.121,10.121,0,0,1,33.649,97.646Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;20 64 64;40 64 64;65 64 64;85 64 64;100 64 64;120 64 64;140 64 64;160 64 64;185 64 64;215 64 64;255 64 64;300 64 64;" dur="800ms" repeatCount="indefinite"></animateTransform></path></svg>
`;


function loadIndication(form, icon, switchStatus) {
  if (form.querySelector('.load-indication') === undefined || form.querySelector('.load-indication') === null) {
    // console.log('ЕСТЬ');
    form.insertAdjacentHTML('beforeEnd', icon);
  }
  // eslint-disable-next-line no-unused-expressions
  switchStatus === 'on'
    ? form.querySelector('.load-indication').style.opacity = '1'
    : form.querySelector('.load-indication').style.opacity = '0';
}


function sendMessageStatus(form, status) {
  const element = document.createElement('span');
  element.style.cssText = `
    
            color:var(--color-violet); position:absolute; 
            padding:10px 20px; 
            background:var(--color-gray);
            left:50%;
            top:50%;
            font-size:24px; 
            text-align:center;
            transform:translateX(-50%) translateY(-50%) `;
  element.innerHTML = status;
  element.classList.add('send-message');
  form.append(element);
  setTimeout(() => {
    form.querySelector('.send-message').remove();
  }, 5000);
}

function resetForm(form) {
  form.querySelectorAll('input, textarea').forEach((input) => {
    input.value = '';
  });
  form.querySelectorAll('input[type="checkbox"').forEach((el) => {
    el.checked = false;
  });
}

function send(object, url, form, callback = function defaultCallback() {}) {
  const data = new FormData();
  form.querySelector('button[type="submit"]').setAttribute('disabled', '');
  // eslint-disable-next-line guard-for-in
  for (const key in object) {
    data.append(key, object[key]);
  }
  data.append(WP_ACTION.keyname, WP_ACTION.keyValue);
  data.append('count', _counter);
  loadIndication(form, loadIcon, 'on');
  console.log(object);

  fetch(url, {
    method: 'POST',
    body: new FormData(form),
    headers: { enctype: 'multipart/form-data' },
  }).catch((res) => {
    sendMessageStatus(form, 'Помилка відправки');
    loadIndication(form, loadIcon, 'off');
  }).then(res => res.text()).then((res) => {
    loadIndication(form, loadIcon, 'off');
    // eslint-disable-next-line eqeqeq
    if (res.error == '0') {
      callback();
      sendMessageStatus(form, 'Ваше повідомлення відправлено');
      resetForm(form);
    } else {
      sendMessageStatus(form, 'Помилка відправки');
    }
    setTimeout(() => {
      form.querySelector('button[type=submit]').removeAttribute('disabled');
    }, 2000);
  });
}

function pageRedirect() {
  window.location.href = 'message';
}


// $('.callback-form').magnificPopup();


function putCallbackFormInPopup(selector) {
  return document.querySelector(selector);
}
/* Form handler END */

function handleFiles(e) {
  // console.log(e);
  // console.log(e.files);
  const list = document.createElement('ul');
  const descrSpan = document.querySelector('.form__file--description');
  list.classList.add('uploaded-files-list');
  descrSpan.innerHTML = '';
  descrSpan.appendChild(list);
  // eslint-disable-next-line no-undef
  for (file of e.files) {
    const fileSpan = document.createElement('li');
    fileSpan.classList.add('uploaded-file');
    fileSpan.innerHTML = `<span class="file-name text-violet bold" title="${file.name}">${file.name}</span> <span>${parseFloat(file.size / 1000, 1)} Kb</span>`;
    list.appendChild(fileSpan);
  }
}

submitList.forEach((el) => {
  const inputs = el.closest('form').querySelectorAll('input');
  inputs.forEach(counterHandler);
  el.addEventListener('click', (evt) => {
    evt.preventDefault();
    const status = checkRequiredFields(el.closest('form'));
    if (typeof status === 'object') {
      send(status, SEND_URL, el.closest('form'));
    }
  });
});
