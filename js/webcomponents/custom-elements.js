import { setSessionsStorage, hideElements, loadPrototypesMethods } from '../utils.js'
import { RandomCharSettings } from '../methods/random-chars.js'

class FloatPopup extends HTMLElement {
    constructor() {
        super()
    
        const i = document.createElement('i')
        i.classList.add('material-icons')
        i.textContent = 'settings'
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

function hideAllPopups() {
    hideElements({ selector: '[data-popup]', single: false })
    hideElements({ selector: '[data-custom-menu', single: false })
} 

window.addEventListener('DOMContentLoaded', async () => {
    
    await loadPrototypesMethods()

    ;(async () => {

        customElements.define('float-popup-menu', FloatPopup)

        const undefinedElements = document.querySelectorAll(':not(:defined)')
        undefinedElements.forEach(element => element.style.setProperty('display', 'none'))

        const promises = [].map.call(undefinedElements, el => customElements.whenDefined(el.localName))
        
        await Promise.all(promises)

        undefinedElements.forEach(element => element.style.removeProperty('display'))

    })()

    const selectDOMElement = (element, matchAll = false) => matchAll
        ? document.querySelectorAll(element)
        : document.querySelector(element)

    const getCustomMenu = (target) => document.querySelector(`[data-custom-menu="${target}"]`)

    const getDiffXFloatMenu = (rectFloatMenu) => rectFloatMenu.left - rectFloatMenu.width * 4
    const getDiffYFloatMenu = (rectFloatMenu) => (rectFloatMenu.top + window.scrollY) - rectFloatMenu.height

    function handleWithClickFloatPopupMenu(event) {

        event.stopPropagation()
        hideAllPopups()

        const targetClicked = event.target.closest('float-popup-menu')
        const targetClickedAttrs = targetClicked?.attributes
        const targetCustomMenu = targetClickedAttrs.getNamedItem('target-custom-menu').value
        const customMenuFound = getCustomMenu(targetCustomMenu)

        if(!customMenuFound) {
            return
        }
        
        const rectFloatMenu = targetClicked.getBoundingClientRect()

        customMenuFound.style.display = 'block'
        customMenuFound.style.position = 'absolute'
        customMenuFound.style.left = `${getDiffXFloatMenu(rectFloatMenu)}px`
        customMenuFound.style.top = `${getDiffYFloatMenu(rectFloatMenu)}px`

        // switch(targetCustomMenu) {
        //     case 'tune':
        //         customMenuFound.onclick = (event) => handleWithPopupCheckboxOptions(event)
        //         break
        //     case 'settings':
        //         customMenuFound.onclick = (event) => handleWithPopupMenuOptions(event)
        //         break
        //     default:
        // }
    }

    const floatPopupMenu = document.querySelectorAll('float-popup-menu')
    floatPopupMenu.forEach(menu => menu.addEventListener('click', handleWithClickFloatPopupMenu))
    
    window.onresize = () => hideAllPopups()
    window.onscroll = () => hideAllPopups()
    window.onclick = () => hideAllPopups()

})