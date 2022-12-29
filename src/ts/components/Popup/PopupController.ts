const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href')?.replace('#', '');
      if (popupName !== undefined) {
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
      }
      e.preventDefault();
    })
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    })
  }
}

function popupOpen (currentPopup: HTMLElement | null) {
  if (currentPopup && unlock) {
    const popupActive: HTMLElement | null = document.querySelector('.popup-open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', function (e) {
      if (e.target instanceof Element) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      }
    })
  }
}

function popupClose(popupActive: HTMLElement | null, doUnlock = true) {
  if (unlock) {
    popupActive?.classList.remove('open');
    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyLock () {
  const bodyWrapper: HTMLElement | null = document.querySelector('.body__wrapper');
  if (bodyWrapper !== null) {
    const lockPaddingValue = window.innerWidth - bodyWrapper.offsetWidth + 'px';
    body!.style.paddingRight = lockPaddingValue;
    body?.classList.add('lock');
  }

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock () {
  setTimeout(function () {
    body!.style.paddingRight = '0px';
    body?.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout)
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive: HTMLElement | null = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
})