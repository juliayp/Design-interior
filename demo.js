const dialog = document.getElementById('demo-dialog');
const openButton = document.querySelector('.button-nav[data-w-id]');
openButton.addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('demo-result').textContent = '';
  dialog.showModal();
});
dialog.querySelector('.demo-close').addEventListener('click', () => dialog.close());
document.getElementById('demo-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('demo-result').textContent = 'Demo complete. Nothing was sent or saved, and no account was created.';
});
