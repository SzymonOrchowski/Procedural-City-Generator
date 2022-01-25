export const generateMap = (sideLength) => {
    const terrains = ['street', 'building']
    const array = []
    for (let i = 0; i < sideLength; i++) {
        const row = []
        for (let j = 0; j < sideLength; j++) {
            array.push({
                positionX: i,
                positionZ: j,
                terrainType: undefined,
                used: false
            })
        }
    }

    const buildingTerraingRandomGenerator = () => {
        const x = Math.floor(Math.random() * 5.9 + 1)
        const z = Math.floor(Math.random() * 5.9 + 1)
        console.log(x,z)
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
        if (!square.terrainType && counter <= 30) {
            const area = buildingTerraingRandomGenerator()
            const color = colorGenerator()
            const hight = Math.floor(Math.random() * 10) + 1
            // const hight = 1
            array.map((element) => {
                if (element.positionX >= square.positionX &&
                    element.positionX < square.positionX + area[0] && 
                    element.positionZ >= square.positionZ &&
                    element.positionZ < square.positionZ + area[1]
                    ) {
                    if(!element.terrainType) {
                        element.terrainType = 'building'
                        // element.color = color
                        // element[4] = hight
                    }
                } 
                if (element.positionX === square.positionX + area[0] && 
                    element.positionZ >= square.positionZ && 
                    element.positionZ < square.positionZ + area[1] 
                    || 
                    element.positionZ === square.positionZ + area[1] && 
                    element.positionX >= square.positionX && 
                    element.positionX < square.positionX + area[0] + 1
                    ||
                    element.positionX === square.positionX - 1 && 
                    element.positionZ >= square.positionZ && 
                    element.positionZ < square.positionZ + area[1]
                    ||
                    element.positionZ === square.positionZ - 1 && 
                    element.positionX >= square.positionX && 
                    element.positionX < square.positionX + area[0] + 1
                    ) {
                    if (!element.terrainType) {
                        element.terrainType = 'street'
                    }
                }
            })
        }
    })
    // console.log(array)
    return array;
}
