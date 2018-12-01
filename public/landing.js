let id = document.querySelector('#id');
let go = document.querySelector('#go');

go.addEventListener('click', function() {
  window.location.href = '/map/' + id.value;
});
