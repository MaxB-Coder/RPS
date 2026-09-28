// Weapon tiles light up on hover only once a mouse has moved on the current
// screen. Otherwise the tile player 1 just picked stays lit for player 2: under
// a still mouse, or on a phone, where the tapped spot keeps its hover.
addEventListener(
  'pointermove',
  (event) => {
    if (event.pointerType === 'mouse') document.documentElement.dataset.hover = '';
  },
  { passive: true },
);
