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
const feedbackForm = document.forms.feedback;
const userNameField = feedbackForm['user-name'];
const userPhoneField = feedbackForm['user-phone'];
const phoneRegular = /^\+?[\d()\- ]+$/;

const userData = {
  name: '',
  phone: '',
};

const isStorage = () => {
  try{
    userData.name = localStorage.getItem('userName');
    userData.phone = localStorage.getItem('userPhone');
    return true;
  } catch (err) {
    return false;
  }
};
const isStorageSupport = isStorage();

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
    bodyUnfixPosition();
    navMenu.removeEventListener('click', closeMenu);
    document.removeEventListener('keydown', closeMenu);
  }
};

const toggleMenu = () => {
  navMenu.classList.toggle(navClosed);
  menuBtn.classList.toggle(menuBtnClosed);
  changeMenuIcon();
  if(navMenu.classList.contains(navClosed)){
    menuBtn.setAttribute('aria-expanded', false);
    bodyUnfixPosition();
  } else {
    menuBtn.setAttribute('aria-expanded', true);
    navMenu.addEventListener('click', closeMenu);
    document.addEventListener('keydown', closeMenu);
    bodyFixPosition();
  }
};

if(menuBtn && navMenu && menuIcons && menuBtnSvg){
  menuBtn.addEventListener('click', toggleMenu);
}

const checkPhoneField = (field) => {
  if(!phoneRegular.test(field.value)) {
    field.setCustomValidity(
      '?????????? ?????????? ?????????????????? ???????????? ??????????, ????????????, ?????????????? ` - ( ) ` ?? ???????????? ` + ` ?? ???????????? ????????????');
  } else {
    field.setCustomValidity('');
  }
  field.reportValidity();
};

const onPhoneInput = (evt) => {
  checkPhoneField(evt.target);
};

if(userPhoneField){
  userPhoneField.addEventListener('input', onPhoneInput);
}


const fillForm = () => {
  isStorage();
  if(userData.name){
    userNameField.value = userData.name;
  }
  if(userData.phone){
    userPhoneField.value = userData.phone;
  }
};

const onFormSubmit = () => {
  if (isStorageSupport) {
    localStorage.setItem('userName', userNameField.value);
    localStorage.setItem('userPhone', userPhoneField.value);
  }
};

if(feedbackForm){
  feedbackForm.addEventListener('submit', onFormSubmit);
  fillForm();
}

function bodyFixPosition() {

  setTimeout( () => {
    if ( !document.body.hasAttribute('data-body-scroll-fix') ) {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      document.body.setAttribute('data-body-scroll-fix', scrollPosition);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${  scrollPosition  }px`;
      document.body.style.left = '0';
      document.body.style.width = '100%';
    }
  }, 15 );
}

function bodyUnfixPosition() {
  if ( document.body.hasAttribute('data-body-scroll-fix') ) {
    const scrollPosition = document.body.getAttribute('data-body-scroll-fix');
    document.body.removeAttribute('data-body-scroll-fix');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    window.scroll(0, scrollPosition);
  }
}
