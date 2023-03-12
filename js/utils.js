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
    } else if(prototypeOfConstructor === ''.constructor) {
        prototypeOf = String
    } else if(prototypeOfConstructor === {}.constructor) {
        prototypeOf = Object
    }
    
    return prototypeOf.prototype[attribute].call(thisContext, ...args)
}

/**
    DOM Manipulation
*/

export { hideElements, clearChildren }

function hideElements(options) {
    
    const { selector, single } = options

    if(!selector) {
        throw new TypeError('"selector" cannot be null or undefined. It must be an DOM element or node.')
    }

    const elements = single
        ? document.querySelector(selector)
        : document.querySelectorAll(selector)
    
    if(!single) {
        elements.forEach(el => el.style.setProperty('display', 'none'))
        return
    }

    const elementStyle = elements.style
    if(elementStyle instanceof CSSStyleDeclaration) {
        elementStyle.setProperty('display', 'none')
    }
}

function clearChildren(root) {
    while(root.firstChild) {
        root.firstChild.remove()
    }
}

/**
    Storage
*/

export { getSessionStorage, setSessionsStorage }

function getSessionStorage(name) {
    return sessionStorage.getItem(name) === null
        ? undefined
        : JSON.parse(sessionStorage.getItem(name))
}

function setSessionsStorage(name, value) {
    sessionStorage.setItem(name, JSON.stringify(value))
    return getSessionStorage(name)

}

/**
    Prototype Methods
*/

export { loadPrototypesMethods }

async function loadPrototypesMethods() {

    
    function getPromises() {
        
        const arrayCount = new Promise(resolve => {

            if(Array.prototype.count) {
                return
            }

            Array.prototype.count = function(callbackFn) {

                const arrayReference = Array.isArray(this)
                    ? this
                    : []

                return arrayReference.reduce.call(this, 
                        (acc, item, self) => callbackFn.call(self, item) ? ++acc : acc, 0)
            }

            resolve({ done: true })
        })

        return [ arrayCount ]
    }

    return Promise.all(getPromises()).then(methods => methods.every(method => method.done))

}