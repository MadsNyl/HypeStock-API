
const pctChange = (newValue, oldValue) => { 
    if (newValue === oldValue) return 0;
    if (newValue === 0 || oldValue === 0) return 0;
    return ((newValue - oldValue) / newValue) * 100 
}


module.exports = {
    pctChange
}