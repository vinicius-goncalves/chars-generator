export { CharsGeneratorSettings }
import { getSessionStorage, scrollToBottom } from '../utils.js'

const generateButton = document.querySelector('[data-button="generate"]')

function CharsGeneratorSettings() {
        
    this.letters = true
    this.numbers = true
    this.symbols = true
    this.length = 5

    CharsGeneratorSettings.prototype.setChars = function (type, booleanValue) {
        
        switch(type) {

            case 'letters':
                this.letters = booleanValue
                break
            case 'symbols':
                this.symbols = booleanValue
                break
            case 'numbers':
                this.numbers = booleanValue
                break
            default:
        }

        return this
    }

    CharsGeneratorSettings.prototype.getCharsMethods = function() {

        const upperCaseLetters = () => Math.floor(Math.random() * 26 + 65)
        const lowerCaseLetters = () => Math.floor(Math.random() * 26 + 97)

        const getRandomLetter = () => String.fromCharCode(Math.random() < .5 
            ? upperCaseLetters() 
            : lowerCaseLetters())

        const getRandomNumber = () => Math.trunc(Math.random() * (9 - 0 + 1) + 0)
        const getRandomSymbol = () => ['!', '@', '#', '$'][Math.floor(Math.random() * 4)]

        const charsType = {
            'letters': this.letters,
            'numbers': this.numbers,
            'symbols': this.symbols
        }

        const methodsMap = [
            ['letters', getRandomLetter],
            ['numbers', getRandomNumber],
            ['symbols', getRandomSymbol]
        ].filter(([ method ]) => charsType[method] === true)

        return methodsMap
    }

    CharsGeneratorSettings.prototype.getLength = function() {
        return this.length
    }

    CharsGeneratorSettings.prototype.setLength = function(length) {
        this.length = length
        return this
    }
}

function getRandomCharsSettings() {
    const randomCharsObj = getSessionStorage('random-chars')
    const generatorObject = Object.setPrototypeOf(randomCharsObj, CharsGeneratorSettings.prototype)
    return generatorObject
}

function* randomChar() {
    
    const generatorObject = getRandomCharsSettings()
    const methodsMap = generatorObject.getCharsMethods()

    for(let i = 0; i < generatorObject.length; i++) {
        yield methodsMap[Math.floor(Math.random() * methodsMap.length)][1]()
    }
}

generateButton.addEventListener('click', () => {

    scrollToBottom(document.documentElement)
    
    const output = document.querySelector('output')
    output.textContent = ''

    const wordToWrite = Array.from({ length: 64 }, () => Math.floor(Math.random() * 26 + 65)).map(item => String.fromCharCode(item)).join('')

    let currIndex = 0
    let currChars = ''

    const generator = randomChar()
    const charsSettings = getRandomCharsSettings()

    const int = setInterval(() => {

        if(output.textContent.length >= charsSettings.length) {
            clearInterval(int)
            return
        }

        const value = generator.next().value
        output.textContent += value

    }, 50)
})
