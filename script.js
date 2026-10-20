const box = document.getElementById('textBox');
const sizeLabel = document.getElementById('sizeLabel');
const themeBtn = document.getElementById('theme');

const ORIGINAL_TEXT = box.textContent;
const DEFAULT_SIZE = 20;
let size = DEFAULT_SIZE;
const decorations = new Set();

// Text color
document.querySelectorAll('[data-color]').forEach(b =>
  b.addEventListener('click', () => { box.style.color = b.dataset.color; }));

// Background color of the text area
document.querySelectorAll('[data-bg]').forEach(b =>
  b.addEventListener('click', () => {
    box.style.backgroundColor = b.dataset.bg;
    // keep the text readable on the dark swatch
    if (b.dataset.bg === '#2c3e50' && !box.style.color) box.style.color = '#ffffff';
  }));

// Font size
function setSize(n) {
  size = Math.min(60, Math.max(10, n));
  box.style.fontSize = size + 'px';
  sizeLabel.textContent = size + 'px';
}
document.getElementById('bigger').addEventListener('click', () => setSize(size + 2));
document.getElementById('smaller').addEventListener('click', () => setSize(size - 2));

// Font family
document.querySelectorAll('[data-font]').forEach(b =>
  b.addEventListener('click', () => { box.style.fontFamily = b.dataset.font; }));

// Toggle buttons: bold and italic
function toggle(btn, prop, on, off) {
  const active = btn.getAttribute('aria-pressed') !== 'true';
  btn.setAttribute('aria-pressed', active);
  box.style[prop] = active ? on : off;
}
document.getElementById('bold').addEventListener('click', e => toggle(e.currentTarget, 'fontWeight', 'bold', 'normal'));
document.getElementById('italic').addEventListener('click', e => toggle(e.currentTarget, 'fontStyle', 'italic', 'normal'));

// Text decoration: underline, overline, line-through (can be combined)
document.querySelectorAll('[data-deco]').forEach(b =>
  b.addEventListener('click', () => {
    const d = b.dataset.deco;
    if (decorations.has(d)) decorations.delete(d); else decorations.add(d);
    b.setAttribute('aria-pressed', decorations.has(d));
    box.style.textDecoration = decorations.size ? [...decorations].join(' ') : 'none';
  }));

// Alignment
const alignBtns = document.querySelectorAll('[data-align]');
alignBtns.forEach(b =>
  b.addEventListener('click', () => {
    box.style.textAlign = b.dataset.align;
    alignBtns.forEach(x => x.classList.toggle('on', x === b));
  }));

// Uppercase / lowercase (click the active one again to go back to normal)
const caseBtns = document.querySelectorAll('[data-case]');
caseBtns.forEach(b =>
  b.addEventListener('click', () => {
    const turnOff = b.classList.contains('on');
    box.style.textTransform = turnOff ? 'none' : b.dataset.case;
    caseBtns.forEach(x => x.classList.toggle('on', x === b && !turnOff));
  }));

// Dark / light mode
themeBtn.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  themeBtn.textContent = dark ? 'Light mode' : 'Dark mode';
});

// Reset everything
document.getElementById('reset').addEventListener('click', () => {
  box.removeAttribute('style');
  box.textContent = ORIGINAL_TEXT;
  size = DEFAULT_SIZE;
  sizeLabel.textContent = DEFAULT_SIZE + 'px';
  decorations.clear();
  document.querySelectorAll('[aria-pressed]').forEach(b => b.setAttribute('aria-pressed', 'false'));
  document.querySelectorAll('.on').forEach(b => b.classList.remove('on'));
  document.body.classList.remove('dark');
  themeBtn.textContent = 'Dark mode';
});
