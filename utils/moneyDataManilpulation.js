export function addDollarSign(amont) {
    let dollars = amont.toString();
    let arr = dollars.split("")
    let index = 0

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '-') {
            index = i + 1
            break;
        }
    }
    arr.splice(index, 0, '$')
    if (index === 0){
        arr.splice(0, 0, '+')
    }
    const res = arr.join("")
    return res
}