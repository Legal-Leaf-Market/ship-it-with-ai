const controls = document.querySelector('.demo-controls');
const eventMessage = document.getElementById('demo-event');
const buttons = Object.fromEntries([...controls.querySelectorAll('button')]
  .map(button => [button.dataset.demoAction, button]));
let sent = false;
let signed = false;
let paid = false;

const actions = {
  send() {
    sent = true;
    return 'Sample agreement sent. Record the signature or deposit next.';
  },
  sign() {
    signed = true;
    return 'Sample signature recorded.';
  },
  open() {
    return 'The sample payment link was opened. Deposit status stayed the same.';
  },
  deposit() {
    paid = true;
    return 'Sample deposit marked confirmed.';
  },
  reset() {
    sent = signed = paid = false;
    return 'Demo reset. Ready to send the agreement.';
  },
};

controls.hidden = false;
controls.addEventListener('click', event => {
  const action = event.target.closest('button')?.dataset.demoAction;
  if (!action) return;
  const message = actions[action]();
  document.getElementById('demo-agreement').textContent = signed ? 'Signed' : sent ? 'Sent' : 'Draft';
  document.getElementById('demo-deposit').textContent = paid ? 'Confirmed' : 'Outstanding';
  document.getElementById('demo-booking').textContent = signed && paid ? 'Confirmed' : sent ? 'In progress' : 'Inquiry';
  buttons.send.disabled = sent;
  buttons.sign.disabled = !sent || signed;
  buttons.open.disabled = !sent;
  buttons.deposit.disabled = !sent || paid;
  eventMessage.textContent = message;
});

const goalPlans = {
  inquiries: {
    offer: 'Free estimate for a loose dining chair',
    second: 'Answer a common question about repair turnaround, then invite people to send photos for an estimate.',
    measure: 'Count qualified inquiries and how many become repair bookings.',
  },
  bookings: {
    offer: 'Five available repair appointments',
    second: 'Explain what happens at drop-off, then point to the remaining appointment slots.',
    measure: 'Count confirmed appointments and compare them with available slots.',
  },
  visits: {
    offer: 'Saturday furniture care demonstration',
    second: 'Share the time, address, and parking details. Invite people to stop by.',
    measure: 'Count attendance and ask visitors how they heard about it.',
  },
};
const channelPlans = {
  instagram: { name: 'Instagram', first: 'Show a short before-and-after video. Put the offer in the caption and point to the link in your bio.' },
  facebook: { name: 'Facebook', first: 'Post a before-and-after photo with your service area, the offer, and a direct link.' },
};

const campaign = document.getElementById('campaign-form');
campaign.hidden = false;
campaign.addEventListener('submit', event => {
  event.preventDefault();
  const goal = goalPlans[document.getElementById('campaign-goal').value];
  const channel = channelPlans[document.getElementById('campaign-channel').value];
  const title = document.createElement('h3');
  title.textContent = channel.name + ' plan';
  const rows = [['Offer', goal.offer], ['Week one', channel.first],
    ['Week two', goal.second], ['Review', goal.measure]];
  document.getElementById('campaign-result').replaceChildren(title, ...rows.map(([label, description]) => {
    const paragraph = document.createElement('p');
    const name = document.createElement('strong');
    name.textContent = label + ': ';
    paragraph.append(name, description);
    return paragraph;
  }));
});
