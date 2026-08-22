// SchoolHub app helpers. Official logos can be supplied per app as `logo` URLs.
// If an image fails, the card automatically displays its emoji fallback.
window.SchoolHubLogoFallback = function (img, fallback) {
  img.style.display = 'none';
  if (fallback) fallback.style.display = 'grid';
};
