const menuMobile = document.querySelector('#menu-mobile');
const overlay = document.querySelector('#overlay');

const show = (element) =>{
    return function (){
        element.classList.add('visible');
        element.classList.remove('hidden');
    }
}

const hide = (element) =>{
    return function (){
        element.classList.add('hidden');
        element.classList.remove('visible');
    }
}

document.querySelector('#toggle-mobile').addEventListener('click', show(overlay));
document.querySelector('#toggle-mobile').addEventListener('click', show(menuMobile));

document.querySelector('#hide-menu').addEventListener('click', hide(overlay));
document.querySelector('#hide-menu').addEventListener('click', hide(menuMobile));