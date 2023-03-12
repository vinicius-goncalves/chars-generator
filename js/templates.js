import { hideElements } from './utils.js'

const settingsFloatPopupMenu = document.querySelector('[js-id="settings"]')

const getCustomMenu = (value) => document.querySelector(`[data-custom-menu="${value}"]`)
const getPopupTarget = (name) => document.querySelector(`[data-popup="${name}"]`)

function LanguageControl(currLanguage = navigator.language) {

    let language = currLanguage
    
    this.get = function() {
        return language
    }

    this.define = function(newLanguage) {
        return (this.language = newLanguage, this)
    }

    this.updateDOM = function() {
        console.log(this.get())
    }
}

const languageControl = new LanguageControl()

const popupOptionsControl = new Map([
    ['language', function(DOMMenu) {
        if(DOMMenu instanceof Element) {
            DOMMenu.onclick = (event) => {
                
                const closestLanguageTarget = event.target.closest('[data-language]')
                const languageSelected = closestLanguageTarget.dataset.language
                const currPage = window.location.pathname.split('/').at(-1).split('.html')[0]
                
                languageControl.define(languageControl).updateDOM()
            }
        }
    }]
])

function invokePopupMenuOptions(event) {
    
    hideElements({ selector: '[data-popup]', single: false })

    const popup = event.target.closest('[data-popup-target]')
    const popupName = popup.dataset.popupTarget
    const popupMenu = getPopupTarget(popupName)
    
    popupMenu.style.display = 'block'
    popupMenu.style.position = 'absolute'
    
    const popupRect = popup.getBoundingClientRect()
    
    popupMenu.style.left = Math.trunc(popupRect.left - (popupRect.width / 1.5)) + 'px'
    popupMenu.style.top = Math.trunc(popupRect.top - (popupRect.height / 2)) + 'px'

    const handleWithEvent = popupOptionsControl.get(popupName)
    handleWithEvent(popupMenu)

}

settingsFloatPopupMenu.onclick = (event) => {
    
    const closestFloatPopupMenu = event.target.closest('float-popup-menu')
    
    getCustomMenu(closestFloatPopupMenu.getAttribute('target-custom-menu')).onclick = (event) => {
        event.stopPropagation()
        invokePopupMenuOptions(event)
    }
}