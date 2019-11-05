const body = document.querySelector('BODY')
const { height, width } = body.getBoundingClientRect()

const canvas: HTMLCanvasElement = document.createElement('CANVAS') as HTMLCanvasElement
canvas.setAttribute('height', height.toString())
canvas.setAttribute('width', width.toString())
body.appendChild(canvas)

const context = canvas.getContext('2d')

const duration = 400

const EasingFunctions = {
    // no easing, no acceleration
    linear: function (t) { return t },
    // accelerating from zero velocity
    easeInQuad: function (t) { return t * t },
    // decelerating to zero velocity
    easeOutQuad: function (t) { return t * (2 - t) },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
    // accelerating from zero velocity 
    easeInCubic: function (t) { return t * t * t },
    // decelerating to zero velocity 
    easeOutCubic: function (t) { return (--t) * t * t + 1 },
    // acceleration until halfway, then deceleration 
    easeInOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
    // accelerating from zero velocity 
    easeInQuart: function (t) { return t * t * t * t },
    // decelerating to zero velocity 
    easeOutQuart: function (t) { return 1 - (--t) * t * t * t },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
    // accelerating from zero velocity
    easeInQuint: function (t) { return t * t * t * t * t },
    // decelerating to zero velocity
    easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t },
    // acceleration until halfway, then deceleration 
    easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t },
    // elastic bounce effect at the beginning
    easeInElastic: function (t) { return (.04 - .04 / t) * Math.sin(25 * t) + 1 },
    // elastic bounce effect at the end
    easeOutElastic: function (t) { return .04 * t / (--t) * Math.sin(25 * t) },
    // elastic bounce effect at the beginning and end
    easeInOutElastic: function (t) { return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1 },
    easeInSin: function (t) {
        return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2);
    },
    easeOutSin: function (t) {
        return Math.sin(Math.PI / 2 * t);
    },
    easeInOutSin: function (t) {
        return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
    }
}


const render = () => {
    const centerX = width / 2
    const centerY = height / 2

    const now = performance.now()
    const period = (now % duration) / duration

    let startRadius = now % (height)

    if (startRadius > (height / 2)) {
        startRadius = height / 2 - (startRadius % (height / 2))
    }

    let factor

    if (period > 0.5) {
        factor = (EasingFunctions.easeInOutSin(period))
    } else {
        factor = 1 - (EasingFunctions.easeInOutSin(period))
    }

    startRadius = height / 2 * factor

    const innerX = width / 2
    const innerY = height / 2

    const gradient = context.createRadialGradient(innerX, innerY, startRadius, centerX, centerY, height)

    gradient.addColorStop(0, 'yellow')
    gradient.addColorStop(.1, 'lime')
    gradient.addColorStop(.9, 'fuchsia')

    context.fillStyle = gradient

    context.fillRect(0, 0, width, height)
}

const loop = () => {
    render()
    requestAnimationFrame(loop)
}

loop()