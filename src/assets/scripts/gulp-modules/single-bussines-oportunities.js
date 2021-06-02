function handleFiles(e) {
  // console.log(e);
  // console.log(e.files);
  const list = document.createElement('ul');
  const descrSpan = document.querySelector('.form__file--description');
  list.classList.add('uploaded-files-list');
  descrSpan.innerHTML = '';
  descrSpan.appendChild(list);
  for (file of e.files) {
    const fileSpan = document.createElement('li');
    fileSpan.classList.add('uploaded-file');
    fileSpan.innerHTML = `<span class="file-name text-violet bold" title="${file.name}">${file.name}</span> <span>${parseFloat(file.size / 1000, 1)} Kb</span>`;
    list.appendChild(fileSpan);
  }
}
