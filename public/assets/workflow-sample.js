const consolePanel = document.querySelector('.workflow-console');
const choices = [...consolePanel.querySelectorAll('[data-workflow]')];
const recordTitle = document.getElementById('workflow-record-title');
const recordDetail = document.getElementById('workflow-record-detail');
const workflowStatus = document.getElementById('workflow-state');
const result = document.getElementById('workflow-result');
const action = document.getElementById('workflow-action');

const workflows = {
  repair: {
    title: 'Vacuum repair #184',
    detail: 'Molly dropped off her vacuum on Tuesday. The new belt is fitted and the vacuum passed its test.',
    action: 'Draft pickup message',
    pending: 'Pickup message needed',
    before: 'The repair is done. Molly is still waiting for an update.',
    complete: 'Pickup message drafted',
    after: 'Hi Molly, your vacuum is ready for pickup. We replaced the belt and tested it. Call the shop if you need to arrange a pickup time.',
  },
  booking: {
    title: 'Saturday wedding inquiry',
    detail: 'Riverside Hall · 120 guests · Ceremony audio and reception DJ',
    action: 'Build agreement draft',
    pending: 'Inquiry received',
    before: 'The event details are in. An agreement still needs to be prepared.',
    complete: 'Agreement ready to review',
    after: 'Saturday at Riverside Hall, 120 guests. Services include ceremony audio and a reception DJ. Payment terms are still to be filled in.',
  },
  payout: {
    title: 'Friday card payout',
    detail: '$480.00 in card sales · $14.40 in fees · $465.60 bank deposit',
    action: 'Match the payout',
    pending: 'Deposit to reconcile',
    before: 'The sales report and bank deposit show different amounts.',
    complete: 'Matched with $0.00 difference',
    after: '$480.00 in sales minus $14.40 in fees equals the $465.60 bank deposit.',
  },
};

let selected;
let finished = false;

function showResult() {
  workflowStatus.textContent = finished ? selected.complete : selected.pending;
  result.textContent = finished ? selected.after : selected.before;
  action.textContent = finished ? 'Reset example' : selected.action;
}

function showWorkflow(choice) {
  selected = workflows[choice.dataset.workflow];
  finished = false;
  choices.forEach(button => button.setAttribute('aria-pressed', String(button === choice)));
  recordTitle.textContent = selected.title;
  recordDetail.textContent = selected.detail;
  showResult();
}

choices.forEach(choice => choice.addEventListener('click', () => {
  if (choice.getAttribute('aria-pressed') !== 'true') showWorkflow(choice);
}));
action.addEventListener('click', () => {
  finished = !finished;
  showResult();
});
showWorkflow(choices[0]);
consolePanel.hidden = false;
