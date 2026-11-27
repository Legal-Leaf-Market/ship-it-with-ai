const form = document.getElementById('builder-form');
const canvas = document.querySelector('.builder-canvas');
const modes = document.querySelector('.builder-modes');
const statusMessage = document.getElementById('builder-status');
const fields = {
  business: document.getElementById('preview-name'),
  headline: document.getElementById('preview-headline'),
  services: document.getElementById('preview-services'),
  action: document.getElementById('preview-action'),
};

function updatePreview() {
  for (const [key, preview] of Object.entries(fields)) {
    const field = form.elements.namedItem(key);
    preview.textContent = field.value.trim() || field.defaultValue;
  }
  statusMessage.textContent = '';
}

function downloadWebsite() {
  const output = document.implementation.createHTMLDocument(fields.business.textContent);
  const charset = output.createElement('meta');
  charset.setAttribute('charset', 'utf-8');
  output.head.prepend(charset);
  const viewport = output.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = 'width=device-width, initial-scale=1';
  output.head.append(viewport);
  const style = output.createElement('style');
  style.textContent = 'body{margin:0;background:#fcf7ed;color:#2e231d;font:1rem/1.6 system-ui,sans-serif}main{max-width:42rem;margin:auto;padding:clamp(1.5rem,7vw,5rem);overflow-wrap:anywhere}h1{line-height:1.1}a{display:inline-block;background:#674333;color:#fff7ee;padding:.65em 1em;border-radius:.2em}';
  output.head.append(style);
  output.documentElement.lang = 'en';

  const main = output.createElement('main');
  const email = form.elements.email.value.trim();
  const at = email.lastIndexOf('@');
  for (const [tag, key] of [['p', 'business'], ['h1', 'headline'], ['p', 'services'], ['a', 'action']]) {
    const element = output.createElement(tag);
    element.textContent = fields[key].textContent;
    if (tag === 'a') element.href = 'mailto:' + encodeURIComponent(email.slice(0, at)) + email.slice(at);
    main.append(element);
  }
  output.body.append(main);
  const file = new Blob(['<!doctype html>\n', output.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'index.html';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
  statusMessage.textContent = 'Downloaded index.html. Open it in your browser to check the page and email link.';
}

form.hidden = false;
modes.hidden = false;
form.addEventListener('input', updatePreview);
form.addEventListener('reset', () => setTimeout(updatePreview, 0));
form.addEventListener('submit', event => {
  event.preventDefault();
  updatePreview();
  downloadWebsite();
});
modes.addEventListener('click', event => {
  const button = event.target.closest('button[data-preview]');
  if (!button) return;
  canvas.dataset.preview = button.dataset.preview;
  for (const option of modes.querySelectorAll('button')) {
    option.setAttribute('aria-pressed', String(option === button));
  }
});
