const colums_size = 11;
const rows_size = 11;
const field_size = 50;
const padding = 10;

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const map = createMap();
const tracktor = { x: 0, y: 0 }
setField(0, 0, 'space');

init();
start();

function start() {
    requestAnimationFrame(tick)
}

function tick(timestamp) {
    moveTracktor()

    clearCanvas()
    drawMap()
    drawTracktor()

    requestAnimationFrame(tick)
}

function init() {
    canvas.width = padding * 2 + colums_size * field_size
    canvas.height = padding * 2 + rows_size * field_size
}
function drawMap() {
    for (let x = 0; x < colums_size; x++) {
        for (let y = 0; y < rows_size; y++) {
            if (getField(x, y) === 'wall') {
                context.fillStyle = 'black'
                context.beginPath()
                context.rect(padding + x * field_size, padding + y * field_size, field_size, field_size)
                context.fill()
            }
        }
    }

}
function drawTracktor() {
    context.fillStyle = 'red'
    context.beginPath()
    context.rect(padding + tracktor.x * field_size, padding + tracktor.y * field_size, field_size, field_size)
    context.fill()
}

function moveTracktor() {
    const directs = []
    if (tracktor.x > 0) {
        directs.push('left')
    }
    if (tracktor.x < colums_size - 2) {
        directs.push('right')
    }
    if (tracktor.y > 0) {
        directs.push('up')
    }
    if (tracktor.y < rows_size - 2) {
        directs.push('down')
    }
    const direct = getRandomFrom(directs)

    switch (direct) {
        case 'left':
            if (getField(tracktor.x - 2, tracktor.y) === 'wall') {
                setField(tracktor.x - 1, tracktor.y, 'space')
                setField(tracktor.x - 2, tracktor.y, 'space')
            }
            tracktor.x -= 2 // tracktor.x = tracktor.x -2
            break
        case 'right':
            if (getField(tracktor.x + 2, tracktor.y) === 'wall') {
                setField(tracktor.x + 1, tracktor.y, 'space')
                setField(tracktor.x + 2, tracktor.y, 'space')
            }
            tracktor.x += 2 // tracktor.x = tracktor.x +2
            break
        case 'up':
            if (getField(tracktor.x, tracktor.y - 2) === 'wall') {
                setField(tracktor.x, tracktor.y - 1, 'space')
                setField(tracktor.x, tracktor.y - 2, 'space')
            }
            tracktor.y -= 2 // tracktor.x = tracktor.y -2
            break
        case 'down':
            if (getField(tracktor.x, tracktor.y + 2) === 'wall') {
                setField(tracktor.x, tracktor.y + 1, 'space')
                setField(tracktor.x, tracktor.y + 2, 'space')
            }
            tracktor.y += 2 // tracktor.x = tracktor.y +2
            break
    }
}

function clearCanvas() {
    context.fillStyle = 'black'
    context.beginPath()
    context.rect(0, 0, canvas.width, canvas.height)
    context.fill()

    context.fillStyle = 'white'
    context.beginPath()
    context.rect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2)
    context.fill()

}

function createMap() {
    const map = []
    for (let y = 0; y < rows_size; y++) {
        const row = []

        for (let x = 0; x < colums_size; x++) {
            row.push('wall')
        }
        map.push(row)
    }
    return map

}

function getField(x, y) {
    if (x < 0 || x >= colums_size || y < 0 || y >= rows_size) {
        return null

    }
    return map[y][x]
}


function setField(x, y, value) {
    if (x < 0 || x >= colums_size || y < 0 || y >= rows_size) {
        return null

    }
    map[y][x] = value
}

function getRandomFrom(array) {
    const index = Math.floor(Math.random() * array.lenght)
    return array[index]
}
