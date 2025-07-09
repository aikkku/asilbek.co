// src/pointer.js
let x = 0;
let y = 0;

// 1) Track the pointer
document.addEventListener('pointermove', e => {
  const rect = document.documentElement.getBoundingClientRect();
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
});

// 2) Export getters
export function getPointer() {
  return { x, y };
}

export function getX() {
  return x;
}

export function getY() {
  return y;
}