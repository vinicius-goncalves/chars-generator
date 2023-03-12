import { getSessionStorage, setSessionsStorage } from './utils.js'

export { LanguageControl }

async function DOMLanguageChange(language) {
    
    const currPageName = window.location.pathname.split('/').at(-1).split('.html')[0]
    
    const request = await fetch(`../data/languages/${currPageName}.json`)
    const data = await request.json()
    
    const getLanguageMessages = (lang) => Object.entries(data[lang])

    console.log(getLanguageMessages(language))

}

function LanguageControl(currLanguage) {

    currLanguage = getSessionStorage('language') || navigator.language
    
    this.get = function() {
        return currLanguage
    }

    this.define = function(newLanguage) {
        this.language = newLanguage
        DOMLanguageChange(this.get())
    }
}