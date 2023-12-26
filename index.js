const canvas = document.getElementById('canvas')
const canvasWidth = document.getElementById('size-slider'),
    toolsBtns = document.querySelectorAll('.tool'),
    fillColor = document.querySelector('#fill-color')



const onChange = (value) => {
    brushWidth = value
}

let ctx = canvas.getContext("2d"),
    isDrawing = false,
    brushWidth,
    selectedTool = 'brush',
    prevMouseX,
    prevMouseY,
    snapshot


window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})




const startDraw = e => {
    isDrawing = true
    prevMouseX = e.offsetX
    prevMouseY = e.offsetY
    ctx.beginPath()
    ctx.lineWidth = brushWidth
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
}


const Drawrectangle = e => {
    if(!fillColor.checked){
       return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}

const drawing = e => {
    if (!isDrawing) return
    ctx.putImageData(snapshot, 0, 0)

    switch (selectedTool) {
        case 'brush':
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
            break;
        case 'rectangle':
            Drawrectangle(e)
            break;
        case 'cricle':

            break;
        case 'triangle':

            break;
        default:
            break;
    }
}



const stopDraw = () => {
    isDrawing = false
}


toolsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.options .active').classList.remove('active')
        btn.classList.add('active')
        selectedTool = btn.id
        console.log(selectedTool);
    })
})

canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDraw)