export const makeSpiral = (N) => {
    let currentValue = 1;
    let currentPlace = [0,0]

    const makeArray = (number) => {
        const array = []
        for (let i = 0; i < number; i++) {
            const subarray = []
            for (let j = 0; j < number; j++) {
                subarray.push([j, i, undefined])
            }
            array.push(subarray)
        }
        return array;
    }

    // currentPlace = [ y (row), x (column) ]

    const fillRight = (array, startingValue, startingPlace, availableFields) => {
        for (let i = startingPlace[1]; i < availableFields + startingPlace[1]; i++) {
            array[startingPlace[0]][i][2] = startingValue;
            startingValue++
            currentPlace = [startingPlace[0],i]
        }
        currentPlace[0] += 1
        currentValue = startingValue
    }
    const fillDown = (array, startingValue, startingPlace, availableFields) => {
        for (let i = startingPlace[0]; i < availableFields + startingPlace[0]; i++) {
            array[i][startingPlace[1]][2] = startingValue
            startingValue++
            currentPlace = [i,startingPlace[1]]
        }
        currentPlace[1] -= 1
        currentValue = startingValue
    }
    const fillLeft = (array, startingValue, startingPlace, availableFields) => {
        for (let i = startingPlace[1]; i > startingPlace[1] - availableFields; i--) {
            array[startingPlace[0]][i][2] = startingValue;
            startingValue++
            currentPlace = [startingPlace[0],i]
        }
        currentPlace[0] -= 1
        currentValue = startingValue
    }
    const fillUp = (array, startingValue, startingPlace, availableFields) => {
        for (let i = startingPlace[0]; i > startingPlace[0] - availableFields; i--) {
            array[i][startingPlace[1]][2] = startingValue
            startingValue++
            currentPlace = [i,startingPlace[1]]
        }
        currentPlace[1] += 1
        currentValue = startingValue
    }

    let availableFields = N
    
    const finalArray = makeArray(N)

    const makeTurn = () => {
        fillRight(finalArray, currentValue, currentPlace, availableFields)
        availableFields--;
        if(currentValue <= Math.pow(N, 2)) fillDown(finalArray, currentValue, currentPlace, availableFields)
        if(currentValue <= Math.pow(N, 2)) fillLeft(finalArray, currentValue, currentPlace, availableFields)
        availableFields--
        if(currentValue <= Math.pow(N, 2)) fillUp(finalArray, currentValue, currentPlace, availableFields)
    }

    while (currentValue <= Math.pow(N, 2)) makeTurn()

    return finalArray
}
