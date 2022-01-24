export const generateMap = (sideLength) => {
    const terrains = ['street', 'building']
    // array = [x, y, ]
    const array = []
    for (let i = 0; i < sideLength; i++) {
        const row = []
        for (let j = 0; j < sideLength; j++) {
            array.push([i,j,undefined, undefined])
        }
    }

    const buildingTerraingRandomGenerator = () => {
        const x = Math.floor(Math.random() * 5 + 1)
        const z = Math.floor(Math.random() * 5 + 1)
        return [x, z]
    }

    const paletteRandom1 = Math.floor(Math.random() * 2.99) + 1

    const colorGenerator = () => {
        const red = Math.floor(Math.random() * (paletteRandom1 === 1 ? 120 : 255))
        const green = Math.floor(Math.random() * (paletteRandom1 === 2 ? 100 : 255))
        const blue = Math.floor(Math.random() * (paletteRandom1 === 3 ? 10 : 255))

        const redHEX = parseInt(red, 10).toString(16)
        const greenHEX = parseInt(green, 10).toString(16)
        const blueHEX = parseInt(blue, 10).toString(16)

        let color = '0x'
        if (redHEX.length < 2) color += '0'
        color += redHEX
        if (greenHEX.length < 2) color += '0'
        color += greenHEX
        if (blueHEX.length < 2) color += '0'
        color += blueHEX

        return parseInt(color, 16)
    }

    let counter = 0

    array.forEach(square => {
        // counter++
        // console.log('counter = ', counter, square)
        if (!square[2] && counter <= 30) {
            const area = buildingTerraingRandomGenerator()
            const color = colorGenerator()
            const hight = Math.floor(Math.random() * 10) + 1
            // const hight = 1
            array.map((element) => {
                if (element[0] >= square[0] &&
                    element[0] < square[0] + area[0] && 
                    element[1] >= square[1] &&
                    element[1] < square[1] + area[1]
                    ) {
                    if(!element[2]) {
                        element[2] = 'building'
                        element[3] = color
                        element[4] = hight
                    }
                } 
                if (element[0] === square[0] + area[0] && 
                    element[1] >= square[1] && 
                    element[1] < square[1] + area[1] 
                    || 
                    element[1] === square[1] + area[1] && 
                    element[0] >= square[0] && 
                    element[0] < square[0] + area[0] + 1
                    ||
                    element[0] === square[0] - 1 && 
                    element[1] >= square[1] && 
                    element[1] < square[1] + area[1]
                    ||
                    element[1] === square[1] - 1 && 
                    element[0] >= square[0] && 
                    element[0] < square[0] + area[0] + 1
                    ) {
                    if (!element[2]) {
                        element[2] = 'street'
                    }
                }
            })
        }
    })
    return array;
}
