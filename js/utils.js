export { waitTimer }

function waitTimer(ms, useSeconds = false) {
    return new Promise(resolve => setTimeout(resolve, useSeconds ? ms * 1000 : ms))
} 