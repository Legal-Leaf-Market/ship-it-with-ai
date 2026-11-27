// Time-back calculator on /free-prototype/. Plain arithmetic on what the
// visitor types; nothing is sent anywhere. Adapted from The Tech Therapists.
(function () {
  var form = document.getElementById('calc-form');
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  var WEEKS = 48;
  function num(id, max) { var v = parseFloat($(id).value); return isFinite(v) && v > 0 ? Math.min(v, max) : 0; }
  function update() {
    var hours = num('c-people', 500) * num('c-hours', 60) * WEEKS;
    $('o-hours').textContent = Math.round(hours).toLocaleString('en-US');
    $('o-cost').textContent = '$' + Math.round(hours * num('c-rate', 500)).toLocaleString('en-US');
    $('o-back').textContent = Math.round(hours * (parseFloat($('c-share').value) || 0.5)).toLocaleString('en-US');
  }
  form.addEventListener('input', update);
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  update();
})();
