const Colum_Size = 75 // width
const Rows_Size = 50 // height
const Field_Size = 5 // scale  
const PADDING = 10 // padding of field
const TRACTORS_NUMBER = 1000 //each more tractor mean more draw speed

const canvas = document.querySelector('canvas') 
const context = canvas.getContext('2d')
const map = createMap()

const tractors = []
setField(0, 0, 'space')

init()
start()

function start () {
	requestAnimationFrame(tick)
}

function tick (timestamp) { //base function for use other functions
	moveTractors()

	clearCanvas()
	drawMap()

	if (!isMaze()) {
		drawTractors()
		requestAnimationFrame(tick)
	}
}

function init () {
	canvas.width = PADDING * 2 + Colum_Size * Field_Size
	canvas.height = PADDING * 2 + Rows_Size * Field_Size

	for (let i = 0; i < TRACTORS_NUMBER; i++) {
		tractors.push({ x: 0, y: 0 })
	}
}

function drawMap () {
	for (let x = 0; x < Colum_Size; x++) {
		for (let y = 0; y < Rows_Size; y++) {
			if (getField(x, y) === 'wall') {
				context.fillStyle = 'black'
				context.beginPath()
				context.rect(PADDING + x * Field_Size, PADDING + y * Field_Size, Field_Size, Field_Size)
				context.fill()
			}
		}
	}
}

function drawTractors () {
	for (const tractor of tractors) {
		context.fillStyle = 'red'
		context.beginPath()
		context.rect(PADDING + tractor.x * Field_Size, PADDING + tractor.y * Field_Size, Field_Size, Field_Size)
		context.fill()		
	}
}

function moveTractors () {
	for (const tractor of tractors) {

		const directs = []

		if (tractor.x > 0) {
			directs.push('left')
		}

		if (tractor.x < Colum_Size - 2) {
			directs.push('right')
		}

		if (tractor.y > 0) {
			directs.push('up')
		}

		if (tractor.y < Rows_Size - 2) {
			directs.push('down')
		}

		const direct = getRandomFrom(directs)

		switch (direct) {
			case 'left':
				if (getField(tractor.x - 2, tractor.y) === 'wall') {
					setField(tractor.x - 1, tractor.y, 'space')
					setField(tractor.x - 2, tractor.y, 'space')
				}

				tractor.x -= 2 // tractor.x = tractor.x - 2
				break
			case 'right':
				if (getField(tractor.x + 2, tractor.y) === 'wall') {
					setField(tractor.x + 1, tractor.y, 'space')
					setField(tractor.x + 2, tractor.y, 'space')
				}

				tractor.x += 2 // tractor.x = tractor.x + 2
				break
			case 'up':
				if (getField(tractor.x, tractor.y - 2) === 'wall') {
					setField(tractor.x, tractor.y - 1, 'space')
					setField(tractor.x, tractor.y - 2, 'space')
				}

				tractor.y -= 2 // tractor.y = tractor.y - 2
				break
			case 'down':
				if (getField(tractor.x, tractor.y + 2) === 'wall') {
					setField(tractor.x, tractor.y + 1, 'space')
					setField(tractor.x, tractor.y + 2, 'space')
				}

				tractor.y += 2 // tractor.y = tractor.y + 2
				break
		}
	}
}

function clearCanvas () {
	context.fillStyle = 'black'
	context.beginPath()
	context.rect(0, 0, canvas.width, canvas.height)
	context.fill()

	context.fillStyle = 'white'
	context.beginPath()
	context.rect(PADDING, PADDING, canvas.width - PADDING * 2, canvas.height - PADDING * 2)
	context.fill()
}

function createMap () {
	const map = []

	for (let y = 0; y < Rows_Size; y++) {
		const row = []

		for (let x = 0; x < Colum_Size; x++) {
			row.push('wall')
		}

		map.push(row)
	}

	return map
}

function getField (x, y) {
	if (x < 0 || x >= Colum_Size || y < 0 || y >= Rows_Size) {
		return null
	}

	return map[y][x]
}

function setField (x, y, value) {
	if (x < 0 || x >= Colum_Size || y < 0 || y >= Rows_Size) {
		return null
	}

	map[y][x] = value
}

function getRandomFrom (array) {
	const index = Math.floor(Math.random() * array.length)
	return array[index]
}

function isEven (n) {
	return n % 2 === 0
}

function isMaze () {
	for (let x = 0; x < Colum_Size; x++) {
		for (let y = 0; y < Rows_Size; y++) {
			if (isEven(x) && isEven(y) && getField(x, y) === 'wall') {
				return false
			}
		}
	}

	return true
}