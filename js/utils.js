export { waitTimer, scrollToBottom, callPrototype }

function waitTimer(ms, useSeconds = false) {
    return new Promise(resolve => setTimeout(resolve, useSeconds ? ms * 1000 : ms))
} 

function scrollToBottom(element) {
    const interval = setInterval(() => {
        if(element.scrollTop === element.scrollHeight - element.clientHeight) {
            clearInterval(interval)
        }
        element.scrollTop += 10
    }, 1)
}

function callPrototype(prototypeOf, attribute, thisContext, ...args) {
    
    const toString = (object) => Object.prototype.toString.call(object).slice(8, -1)
    const prototypeOfConstructor = prototypeOf.constructor

    if(prototypeOfConstructor === [].constructor) {
        prototypeOf = Array
    }
    
    if(prototypeOfConstructor === ''.constructor) {
        prototypeOf = String
    } 
    
    if(prototypeOfConstructor === {}.constructor) {
        prototypeOf = Object
    } 
    
    if(prototypeOfConstructor === (function (){}).constructor && toString(prototypeOf) === 'Function') {
        return thisContext.call(thisContext, ...args)
    }

    return prototypeOf.prototype[attribute].call(thisContext, ...args)
}

/**
    DOM Manipulation
*/

function hideElements(selector, single = false) {
    
    if(!selector) {
        throw new TypeError('"selector" argument cannot be null or undefined. It must be an DOM element or node.')
    }

    const elements = single
        ? document.querySelector(selector)
        : document.querySelectorAll(selector)
    
    if(!single) {
        
        const elementStyle = elements.style
        if(elementStyle instanceof CSSStyleDeclaration) {
            elementStyle.setProperty('display', 'none')
        }
        return
    }
}

/**
    Storage
*/

export { getSessionStorage, setSessionsStorage }

function getSessionStorage(name) {
    return sessionStorage.getItem(name) === null
        ? {}
        : JSON.parse(sessionStorage.getItem(name))
}

function setSessionsStorage(name, value) {
    sessionStorage.setItem(name, JSON.stringify(value))
    return getSessionStorage(name)

}