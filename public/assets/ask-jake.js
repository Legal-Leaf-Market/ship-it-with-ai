const guide = document.querySelector('#jake-help');
const content = document.querySelector('#jake-help-content');

if (guide && content && typeof guide.showModal === 'function') {
  document.querySelectorAll('[data-explain]').forEach(button => { button.hidden = false; });

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-explain]');
    if (!button) return;

    const topic = document.getElementById('explain-' + button.dataset.explain);
    if (!(topic instanceof HTMLTemplateElement)) return;

    guide.classList.toggle('jake-dialog-blue', button.dataset.explain === 'police');
    content.replaceChildren(topic.content.cloneNode(true));
    if (!guide.open) guide.showModal();
    content.querySelector('h2').focus();
  });
}
