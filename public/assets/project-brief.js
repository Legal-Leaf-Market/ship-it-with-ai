const builder = document.getElementById('brief-builder');
const steps = [...builder.querySelectorAll('[data-brief-step]')];
const stepLabel = document.getElementById('brief-step-label');
const progress = document.getElementById('brief-progress');
const next = document.getElementById('brief-next');
const back = document.getElementById('brief-back');
const title = document.getElementById('brief-path-title');
const bottleneck = document.getElementById('brief-bottleneck');
const review = document.getElementById('brief-review');
const message = document.getElementById('message');

const paths = {
  website: {
    label: 'Website and customer inquiries',
    title: 'Follow a customer to your site.',
    choices: ['People struggle to find us', 'Visitors leave without contacting us', 'Customers can’t book or buy easily', 'Updating the site takes too long'],
    example: 'What did the last customer try to do, and what happened?',
    tools: 'What is your website URL or current platform?',
    goal: 'What one action should more visitors take?',
  },
  booking: {
    label: 'Booking and follow-up',
    title: 'Follow a booking from the first message.',
    choices: ['New inquiries get missed', 'Scheduling takes too much back-and-forth', 'Agreements and deposits are hard to track', 'Staff don’t know where a booking stands'],
    example: 'Walk me through the last booking that took more effort than it should have.',
    tools: 'Where do the messages, calendars, agreements, and payments live today?',
    goal: 'What should be easier at the end of a good booking?',
  },
  workflow: {
    label: 'Repeat work and handoffs',
    title: 'Follow a task from start to finish.',
    choices: ['We enter the same thing twice', 'The next person doesn’t get the update', 'We chase approvals or replies', 'The steps change depending on who does it'],
    example: 'What kicks off the task, who touches it, and where did it get stuck last time?',
    tools: 'What apps, sheets, forms, or inboxes are involved?',
    goal: 'Which step should the first version make faster or easier?',
  },
  reporting: {
    label: 'Reporting and reconciliation',
    title: 'Follow the numbers back to the source.',
    choices: ['Payouts and deposits don’t match', 'Reports live in too many places', 'Month-end takes too long', 'We catch mistakes too late'],
    example: 'Think of the last mismatch. What were you comparing and how did you resolve it?',
    tools: 'Which payment, accounting, or reporting tools produce the numbers?',
    goal: 'What should you be able to check or reconcile, and how quickly?',
  },
  other: {
    label: 'Another business problem',
    title: 'Start with the last time it happened.',
    choices: ['It takes longer than it should', 'It’s easy to miss something', 'We rely on one person to do it', 'We don’t have a good process yet'],
    example: 'What were you trying to do, and what happened instead?',
    tools: 'What do you use to handle it today?',
    goal: 'What would tell you the first version was worth using?',
  },
};

const drafts = new Map();
const pathFields = ['bottleneck', 'example', 'tools', 'frequency', 'goal'];
let route;
let step = 0;
let lastApplied = '';

function choosePath() {
  const chosen = builder.elements.path.value;
  if (route === chosen) return;
  if (route) drafts.set(route, pathFields.map(name => builder.elements[name].value));
  route = chosen;
  const path = paths[route];
  title.textContent = path.title;
  bottleneck.replaceChildren(new Option('Choose if one fits', ''), ...path.choices.map(option => new Option(option)));
  for (const name of ['example', 'tools', 'goal']) {
    document.getElementById('brief-' + name + '-label').textContent = path[name];
  }
  const prior = drafts.get(route) ?? [];
  pathFields.forEach((name, index) => {
    builder.elements[name].value = prior[index] ?? '';
  });
}

function makeBrief() {
  const values = new FormData(builder);
  const entries = [
    ['Where it gets stuck', 'bottleneck'],
    ['A recent example', 'example'],
    ['Tools in use', 'tools'],
    ['How often it happens', 'frequency'],
    ['What success looks like', 'goal'],
    ['Who uses it', 'users'],
    ['Constraints', 'limits'],
    ['Timing', 'timing'],
  ];
  return ['Project brief', paths[route].label, ...entries.flatMap(([label, name]) => {
    const value = values.get(name).trim();
    return value ? [label + '\n' + value] : [];
  })].join('\n\n');
}

function showStep(index) {
  step = index;
  steps.forEach((panel, i) => { panel.hidden = i !== step; });
  progress.value = step + 1;
  stepLabel.textContent = 'Step ' + (step + 1) + ' of ' + steps.length;
  back.hidden = step === 0;
  next.textContent = step === steps.length - 1 ? 'Continue to inquiry' : 'Next';
  if (step === steps.length - 1) review.value = makeBrief();
  steps[step].querySelector('h3').focus();
}

builder.addEventListener('submit', event => {
  event.preventDefault();
  if (step === 0) choosePath();
  if (step < steps.length - 1) {
    showStep(step + 1);
    return;
  }
  const previous = message.value;
  const extra = lastApplied && previous.startsWith(lastApplied) ? previous.slice(lastApplied.length).trim() : previous.trim();
  const updates = document.getElementById('brief-updates').checked ? '\n\nAlso interested in updates about demos and workshops.' : '';
  lastApplied = review.value + updates;
  message.value = extra ? lastApplied + '\n\nAdditional note\n' + extra.replace(/^Additional note\n/, '') : lastApplied;
  window.location.hash = 'book';
  document.getElementById('name').focus({ preventScroll: true });
});
back.addEventListener('click', () => showStep(step - 1));
builder.hidden = false;
