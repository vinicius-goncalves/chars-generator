export { RandomCharSettings }

import { getSessionStorage, hideElements } from '../utils.js'

function RandomCharsFunctions() {

    const upperCaseLetters = () => Math.floor(Math.random() * 26 + 65)
    const lowerCaseLetters = () => Math.floor(Math.random() * 26 + 97)

    this.randomLetter = function() {
        return String.fromCharCode(Math.random() < .5 
            ? upperCaseLetters() 
            : lowerCaseLetters())
    }

    this.randomNumber = function() {
        return Math.trunc(Math.random() * (9 - 0 + 1) + 0)
    }

    this.randomSymbol = function() {
        const symbols = '!@#$%&*()'
        return symbols.split('')[Math.floor(Math.random() * symbols.length)]
    }
}

function RandomCharSettings() {
        
    RandomCharsFunctions.call(this)

    this.letters = true
    this.numbers = true
    this.symbols = true
    this.length = 5

    RandomCharSettings.prototype.setChars = function (type, booleanValue) {
        
        const validTypes = ['letters', 'numbers', 'symbols']

        if(!validTypes.includes(type)) {
            throw new TypeError('Invalid type.')
        }

        this[type] = booleanValue

        return this
    }

    RandomCharSettings.prototype.getCharsMethods = function() {

        const charsType = getSessionStorage('random-chars') || {
                'letters': this.letters,
                'numbers': this.numbers,
                'symbols': this.symbols
            }
        
        const methodsMap = [
            ['letters', this.randomLetter],
            ['numbers', this.randomNumber],
            ['symbols', this.randomSymbol]
        ].filter(([ method ]) => charsType[method] === true)

        return methodsMap
    }

    RandomCharSettings.prototype.getLength = function() {
        return this.length
    }

    RandomCharSettings.prototype.setLength = function(length) {
        this.length = length
        return this
    }

    RandomCharSettings.prototype.getGeneratorFunction = function* () {
        
        const methods = this.getCharsMethods()
        const methodsLength = Array.isArray(methods)
            ? methods.length
            : Number.MAX_SAFE_INTEGER

        yield methods[Math.floor(Math.random() * methodsLength)][1]()
    }  
}

const generateButton = document.querySelector('[data-button="generate"]')
const outputResult = document.querySelector('.final-result')

const floatPopupMenu = document.querySelector('[js-id="random-chars"]')
const getCustomMenu = (value) => document.querySelector(`[data-custom-menu="${value}"]`)

floatPopupMenu.addEventListener('click', (event) => {

    const closestPopupMenu = event.target.closest('float-popup-menu')
    const customMenuTarget = closestPopupMenu.getAttribute('target-custom-menu')
    
    getCustomMenu(customMenuTarget).onclick = (event) => {
        event.stopPropagation()
    }
    
    // const allCheckboxes = [...closestMenu.querySelectorAll('input[type="checkbox"]')]
    
    // const amountCheckedBoxes = allCheckboxes.count(checkbox => checkbox.checked)

    // if(amountCheckedBoxes >= 2) {
    //     allCheckboxes.forEach(checkbox => checkbox.disabled = false)
    //     return
    // }

    // const lastUncheckedBox = allCheckboxes.find(checkbox => checkbox.checked)
    // lastUncheckedBox.setAttribute('disabled', true)
})

const randomCharSettings = new RandomCharSettings()

document.onclick = () => {
    
    outputResult.innerHTML = ''
    
    const interval = setInterval(() => {
        
        const { value } = randomCharSettings.getGeneratorFunction().next()

        if(outputResult.textContent.length >= randomCharSettings.length) {
            clearInterval(interval)
        }

        outputResult.textContent += value

    }, 10)
}