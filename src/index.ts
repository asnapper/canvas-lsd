const body = document.querySelector('BODY')
const { height, width } = body.getBoundingClientRect()

const canvas: HTMLCanvasElement = document.createElement('CANVAS') as HTMLCanvasElement
canvas.setAttribute('height', height.toString())
canvas.setAttribute('width', width.toString())
body.appendChild(canvas)

const context = canvas.getContext('2d')

const render = () => {
    const centerX = width / 2
    const centerY = height / 2

    const now = performance.now()
    let startRadius = now % (height)

    if (startRadius > (height / 2)) {
        startRadius = height / 2 - (startRadius % (height/2))
    }

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