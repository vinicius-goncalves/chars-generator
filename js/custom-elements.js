import { setSessionsStorage } from './utils.js'
import { CharsGeneratorSettings } from './methods/random-chars.js'

class FloatPopup extends HTMLElement {
    constructor() {
        super()
        
        const i = document.createElement('i')
        i.classList.add('material-icons')
        this.appendChild(i)
        
    }

    connectedCallback() {
        
        const attributes = this.attributes
        const floatPopup = this
        
        const icon = attributes.getNamedItem('name-icon').value
        const title = attributes.getNamedItem('external-text').value
    
        const i = floatPopup.querySelector('i')
        i.textContent = icon
        i.title = title

    }
}

const generator = new CharsGeneratorSettings()

customElements.define('float-popup-menu', FloatPopup)

customElements.whenDefined('float-popup-menu').then(() => {

    const floatPopupMenu = document.querySelectorAll('float-popup-menu')

    const selectDOMElement = (element, matchAll = false) => matchAll
        ? document.querySelectorAll(element)
        : document.querySelector(element)

    const hideAllPopups = () => selectDOMElement('[data-popup]')
        .forEach(popup => popup.style.display = 'none')

    function handleWithPopupMenuOptions(event) {
        
        event.stopPropagation()

        const getPopupTarget = (name) => selectDOMElement(`[data-popup="${name}"]`)
    
        hideAllPopups()
        
        const targetClicked = event.target.closest('[data-popup-target]')
        const popupName = targetClicked.dataset.popupTarget
        const popupMenu = getPopupTarget(popupName)
        
        const targetClickedRect = targetClicked.getBoundingClientRect()
        const popupMenuRect = popupMenu.getBoundingClientRect()

        popupMenu.style.display = 'block'
        popupMenu.style.left = targetClickedRect.left - (popupMenuRect.width / 1.5) + 'px'
        popupMenu.style.top = targetClickedRect.top - (popupMenuRect.height / 1.5) + 'px'

    }

    function handleWithPopupCheckboxOptions(event) {
        
        event.stopPropagation()
        
        let targetClicked = event.target

        if(targetClicked.matches('li.textbox-wrapper') || targetClicked.closest('li.textbox-wrapper')) {
            targetClicked.oninput = (event) => {
                const obj = generator.setLength(+event.target.value)
                setSessionsStorage('random-chars', obj)
            }
            return
        }
        
        if(!targetClicked.matches('input[type="checkbox"]') || !targetClicked.closest('li.checkbox-wrapper')) {
            
            targetClicked = targetClicked.matches('li.checkbox-wrapper')
                ? targetClicked.querySelector('input[type="checkbox"]')
                : targetClicked.closest('li.checkbox-wrapper').querySelector('input[type="checkbox"]')

            if(targetClicked.disabled) {
                return
            }

            targetClicked.checked = !targetClicked.checked

        }

        const obj = generator.setChars(targetClicked.dataset.tuneSettings, targetClicked.checked)
        setSessionsStorage('random-chars', obj)

        const closestMenu = targetClicked.closest('menu')
        const allCheckboxes = closestMenu.querySelectorAll('input[type="checkbox"]')
        
        const areAllBoxesChecked = Array.prototype.every.call(allCheckboxes, (checkbox) => checkbox.checked)


        if(!areAllBoxesChecked) {

            const checkboxesNotChecked = Array.prototype.reduce.call(allCheckboxes, (acc, checkbox) => checkbox.checked ? ++acc : acc, 0)

            if(checkboxesNotChecked >= 2) {
                Array.prototype.forEach.call(allCheckboxes, (checkbox) => checkbox.removeAttribute('disabled'))
                return
            }
            
            const lastBoxChecked = Array.prototype.find.call(allCheckboxes, (checkbox) => checkbox.checked)
            lastBoxChecked.disabled = true
        }
    }

    const hideAllCustomMenu = () => document
        .querySelectorAll('[data-custom-menu]').forEach(item => item.style.display = 'none')

    floatPopupMenu.forEach(menu => {
        menu.addEventListener('click', (event) => {

            hideAllCustomMenu()
            event.stopPropagation()

            const getCustomMenu = (target) => document.querySelector(`[data-custom-menu="${target}"]`)

            const targetClicked = event.target
            const floatMenu = targetClicked.closest('float-popup-menu')

            const { value } = floatMenu.attributes.getNamedItem('target-custom-menu')
            const customMenu = getCustomMenu(value)
            
            const rect = floatMenu.getBoundingClientRect()

            const diffX = rect.left - floatMenu.offsetWidth * 2.5
            const diffY = (rect.top + window.pageYOffset || window.scrollY) - (floatMenu.offsetHeight * 3)

            customMenu.style.left = diffX + 'px'
            customMenu.style.top = diffY + 'px'
            customMenu.style.position = 'absolute'
            customMenu.style.display = 'block'
            
            if(value === 'tune') {
                customMenu.onclick = (event) => handleWithPopupCheckboxOptions(event)
                return
            }

            if(value === 'settings') {
                customMenu.onclick = (event) => handleWithPopupMenuOptions(event)
                return
            }
        })
    })
    

    window.onscroll = () => hideAllCustomMenu()
    window.onclick = () => hideAllCustomMenu()

})