'use strict';
document.body.classList.remove('no-js');
document.querySelector('.map iframe').removeAttribute('hidden');
const menuBtn = document.querySelector('.menu-control');
const menuIcons = menuBtn.querySelectorAll('.menu-control__icon');
const menuBtnSvg = menuBtn.querySelector('svg');
const navMenu = document.querySelector('.main-header__nav');
const navClosed = 'main-header__nav--closed';
const menuBtnClosed = 'menu-control--close';
const menuIconActive = 'menu-control__icon--active';
navMenu.classList.add(navClosed);

const toggleMenu = () => {
  navMenu.classList.toggle(navClosed);
  menuBtn.classList.toggle(menuBtnClosed);
  menuIcons.forEach((icon) => icon.classList.toggle(menuIconActive));
  const currentWidth = menuBtn.querySelector(`.${menuIconActive}`).getAttribute('width');
  const currentHeight = menuBtn.querySelector(`.${menuIconActive}`).getAttribute('height');
  menuBtnSvg.style.cssText = `width: ${currentWidth}px; height: ${currentHeight}px`;
};

menuBtn.addEventListener('click', toggleMenu);

