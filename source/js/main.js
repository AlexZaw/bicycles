'use strict';
document.body.classList.remove('no-js');
const mapFrame = document.querySelector('.map iframe');
const menuBtn = document.querySelector('.menu-control');
const menuIcons = menuBtn.querySelectorAll('.menu-control__icon');
const menuBtnSvg = menuBtn.querySelector('svg');
const navMenu = document.querySelector('.main-header__nav');
const navClosed = 'main-header__nav--closed';
const menuBtnClosed = 'menu-control--close';
const menuIconActive = 'menu-control__icon--active';
const phoneField = document.querySelector('#userPhone');
const phoneRegular = /^\+?\d+$/;

const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

if(mapFrame) {
  mapFrame.removeAttribute('hidden');
}

if(navMenu) {
  navMenu.classList.add(navClosed);
}

const changeMenuIcon = () =>{
  menuIcons.forEach((icon) => icon.classList.toggle(menuIconActive));
  const currentWidth = menuBtn.querySelector(`.${menuIconActive}`).getAttribute('width');
  const currentHeight = menuBtn.querySelector(`.${menuIconActive}`).getAttribute('height');
  menuBtnSvg.style.cssText = `width: ${currentWidth}px; height: ${currentHeight}px`;
};

const closeMenu =(evt) =>{
  if((evt.type === 'click' && evt.target.tagName === 'A') || isEscKey(evt)){
    navMenu.classList.add(navClosed);
    menuBtn.classList.remove(menuBtnClosed);
    changeMenuIcon();
    navMenu.removeEventListener('click', closeMenu);
    document.removeEventListener('keydown', closeMenu);
  }
};

const toggleMenu = () => {
  navMenu.classList.toggle(navClosed);
  menuBtn.classList.toggle(menuBtnClosed);
  changeMenuIcon();
  if(!navMenu.classList.contains(navClosed)){
    navMenu.addEventListener('click', closeMenu);
    document.addEventListener('keydown', closeMenu);
  }
};

if(menuBtn && navMenu && menuIcons && menuBtnSvg){
  menuBtn.addEventListener('click', toggleMenu);
}

const checkPhoneField = (field) => {
  if(!phoneRegular.test(field.value)) {
    field.setCustomValidity('Номер должен быть вида +12345678900');
  } else {
    field.setCustomValidity('');
  }
  field.reportValidity();
};

const onPhoneInput = (evt) => {
  checkPhoneField(evt.target);
};

if(phoneField){
  phoneField.addEventListener('input', onPhoneInput);
}
