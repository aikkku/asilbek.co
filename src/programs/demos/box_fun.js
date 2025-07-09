/**
@author aikkku, ertdfgcvb
@title  Clickable Box fun
@desc   Think inside of the box
*/

import { clamp, map } from '/src/modules/num.js'

const {sin, cos, floor} = Math

export function main(coord, context, cursor, buffer) {
	// Basic background pattern
	return (coord.x + coord.y) % 2 ? {char       : '\u00b7',
		backgroundColor      : 'white'} : {char       : ' ',
		backgroundColor      : 'white'}
}

import { drawBox } from '/src/modules/drawbox.js'
export function post(context, cursor, buffer) {
	const { rows, cols } =  context
	const t = context.time * 0.001
	const baseW = 20
	const baseH = 10
	const spacingX = 4
	const spacingY = 2

	let marginX = 10
	let marginY = 10

	const numX = floor((cols - marginX*2) / (baseW+spacingX))
	const numY = floor((rows - marginY*2) / (baseH+spacingY))

	marginX = floor((cols - numX * baseW - (numX-1) * spacingX)/2)
	marginY = floor((rows - numY * baseH - (numY-1) * spacingY)/2)

	const q = 'THINK INSIDE OF THE BOX'

	const baseStyle = {
		paddingX        : 2,
		paddingY        : 1,
		color           : 'black',
		borderStyle     : 'double',
		shadowStyle     : 'light',
	}
	
	
	const txt = [
		['INSTAGRAM', 'https://www.instagram.com/aikkku_/', 'purple', 'white'],
		['TELEGRAM', 'https://t.me/aikkku', 'blue', 'white'],
        ['GITHUB', 'https://github.com/aikkku', 'darkgrey', 'white'],
        ['LINKEDIN', 'https://www.linkedin.com/in/aikkku/', 'blue', 'white'],
	]

	for (let j=0; j<numY; j++) {
		for (let i=0; i<numX; i++) {
			const iii = ((i+j)%txt.length)

			const ox = floor(sin((i + j) * 0.6 + t*3) * spacingX)
			const oy = floor(cos((i + j) * 0.6 + t*3) * spacingY)
			const ow = 0//floor(sin((i + j) * 0.4 + t*2) * 5) + 5
			const oh = 0//floor(cos((i + j) * 0.4 + t*2) * 2) + 2
			const style = {
				x      : marginX + i * (baseW + spacingX) + ox,
				y      : marginY + j * (baseH + spacingY) + oy,
				width  : baseW + ow,
				height : baseH + oh,
                backgroundColor : txt[iii][2],
                color : txt[iii][3],
				...baseStyle
			}

            //todo: solve multiple window opening


            if (cursor.pressed && !cursor.p.pressed) {
                
                if (
                    Math.floor(cursor.x) >= marginX + i * (baseW + spacingX) + ox &&
                    Math.floor(cursor.x) <= marginX + i * (baseW + spacingX) + ox + baseW + ow &&
                    Math.floor(cursor.y) >= marginY + j * (baseH + spacingY) + oy &&
                    Math.floor(cursor.y) <= marginY + j * (baseH + spacingY) + oy + baseH + oh
                    ) {

                        console.log("YAHOO");
                        window.open(txt[iii][1], '_blank');
                    }
            }

			drawBox(txt[iii][0], style, buffer, cols, rows)
		}
	}
}
