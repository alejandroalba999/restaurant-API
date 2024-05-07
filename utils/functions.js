function getAvg(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        total += array[i].rating;
    }
    return Math.round(total / array.length);
}


module.exports = { getAvg }