// disable-map.js
(() => {
  const style = document.createElement('style');
  style.innerHTML = `
    .leaflet-container,
    .gm-style,
    iframe[src*="google.com/maps"] {
      display: none !important;
    }

    * {
      animation: none !important;
      transition: none !important;
    }
  `;
  document.head.appendChild(style);
})();
