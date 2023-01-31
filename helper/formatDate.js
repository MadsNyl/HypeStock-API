const addDays = (date, days) => {
    temp = new Date(date);
    temp.setDate(temp.getDate() + days);
    return new Date(temp);
}

const sliceDate = (date, length) => {
    return date.toISOString().slice(0, length).replace("T", " ");
}

module.exports = {
    sliceDate,
    addDays
}