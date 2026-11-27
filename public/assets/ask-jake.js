const guide = document.querySelector('#jake-help');
const content = document.querySelector('#jake-help-content');
const allQuestions = document.querySelector('#jake-help-topics');

if (guide && content && allQuestions && typeof guide.showModal === 'function') {
  document.querySelectorAll('[data-explain][aria-haspopup]').forEach(button => { button.hidden = false; });

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-explain]');
    if (!button) return;

    const topic = document.getElementById('explain-' + button.dataset.explain);
    if (!(topic instanceof HTMLTemplateElement)) return;

    guide.classList.toggle('jake-dialog-blue', button.dataset.explain === 'police');
    allQuestions.hidden = button.dataset.explain === 'topics';
    content.replaceChildren(topic.content.cloneNode(true));
    if (!guide.open) guide.showModal();
    content.querySelector('h2').focus();
  });
}
