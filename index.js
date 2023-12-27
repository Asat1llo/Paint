const canvas = document.getElementById('canvas')
const canvasWidth = document.getElementById('size-slider'),
    toolsBtns = document.querySelectorAll('.tool'),
    fillColor = document.querySelector('#fill-color'),
    btnColors = document.querySelectorAll('.colors .option'),
    colorPicker = document.querySelector('#color-picker'),
    clearCanvasBtn = document.querySelector('.clear-canvas'),
    saveImageBtn = document.querySelector('.save-img')



const onChange = (value) => {
    brushWidth = value
}

let ctx = canvas.getContext("2d"),
    isDrawing = false,
    brushWidth,
    selectedTool = 'brush',
    selectedColor = '#000',
    prevMouseX,
    prevMouseY,
    snapshot

const setCanvasBackground = ()=>{
    ctx.fillStyle = '#fff'
    ctx.fillRect(0,0, canvas.width,  canvas.height)
    ctx.fillStyle = selectedColor
}


window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    setCanvasBackground()
})




const startDraw = e => {
    isDrawing = true
    prevMouseX = e.offsetX
    prevMouseY = e.offsetY
    ctx.beginPath()
    ctx.lineWidth = brushWidth
    ctx.strokeStyle = selectedColor
    ctx.fillStyle = selectedColor
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
}

const Drawrectangle = e => {
    if(!fillColor.checked){
       return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}


const drawCricle = e=>{
    ctx.beginPath()
    const radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) + Math.pow(prevMouseY - e.offsetY, 2)
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI)
    fillColor.checked ? ctx.fill() : ctx.stroke()
}

const drawTriangle = e=>{
    ctx.beginPath()
    ctx.moveTo(prevMouseX, prevMouseY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY)
    ctx.closePath()
    fillColor.checked ? ctx.fill() : ctx.stroke()
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
           drawCricle(e)
            break;
        case 'triangle':
            drawTriangle(e)
            break;
            case 'eraser':
                ctx.strokeStyle = '#fff'
                ctx.lineTo(e.offsetX, e.offsetY)
                ctx.stroke()
             break;
        default:
            break;
    }
}


btnColors.forEach(btn =>{
    btn.addEventListener('click', e =>{
        document.querySelector('.options .selected').classList.remove('selected')
        btn.classList.add('selected')
        const bgColor = window.getComputedStyle(btn).getPropertyValue('background-color')
        selectedColor = bgColor
    })
})


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

colorPicker.addEventListener('change', ()=>{
    colorPicker.parentElement.style.background = colorPicker.value
    colorPicker.parentElement.click()
})

clearCanvasBtn.addEventListener('click', ()=>{
    ctx.clearRect(0,0, canvas.width, canvas.height)
})

saveImageBtn.addEventListener('click', ()=>{
    const link = document.createElement('a')
    link.download = `Sanmi-point${Date.now()}.jpg`
    link.href = canvas.toDataURL()
    link.click()
})

canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDraw)