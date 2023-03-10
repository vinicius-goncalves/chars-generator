// import { waitTimer } from './utils.js'

// const mainDescription = document.querySelector('.main-description')
// const simpleTutorial = document.querySelector('.simple-tutorial')
// const footerDescription = document.querySelector('.footer-description')

// const settingsBtn = document.querySelector('[data-button="settings"]')

// function handleWithSettingsOptions(element, settingClicked) {
//     if(settingClicked === 'language') {
//         element.onclick = (event) => {
//             const r = event.target.dataset.language === 'PT-BR' ? 'Agora você está vendo em PT_BR!' : 'Agora em EN.'
//             console.log(r)
//         }
//     }
// }

// function handleWithSettingsBtn() {

//     const customMenu = document.querySelector('[data-custom-menu="settings"]')
//     customMenu.style.display = 'block'
//     customMenu.style.right = '10%'
//     customMenu.style.bottom = '15%'
//     customMenu.style.position = 'absolute'

//     customMenu.addEventListener('click', (event) => {

//         event.stopPropagation()
//         document.querySelectorAll(`[data-popup]`).forEach(el => el.style.display = 'none')

//         const targetClicked = event.target
//         const closestPopupTarget = targetClicked.closest('li').dataset.popupTarget
//         const popupFound = document.querySelector(`[data-popup="${closestPopupTarget}"]`)

//         if(!popupFound) {
//             return
//         }
    
//         const customMenuRect = customMenu.getBoundingClientRect()
//         const targetClickedRect = targetClicked.getBoundingClientRect()

//         popupFound.style.display = 'block'
//         popupFound.style.left = targetClickedRect.left - (customMenuRect.width / 2.3) + 'px'
//         popupFound.style.top = targetClickedRect.top - (customMenuRect.height / 2.3) + 'px'
        
//     })
// }

// settingsBtn.addEventListener('click', () => {
//     handleWithSettingsBtn()
// })

// waitTimer(100).then(() => {
    
//     const activeElements = [ mainDescription, simpleTutorial, footerDescription ]
//     activeElements.forEach(element => element.classList.add('show-element'))

// })