

const fillMissingDates = (array, days) => {

    if (!array.length) return [];

    const results = [];
    let currentIndex = 0;
    let currentDate = new Date(array[currentIndex].timing);
    let prevLastPrice = 0;

    for (let i = 0; i < days; i++) {

        if (currentIndex === array.length && currentIndex < days) {
            results.push({
                timing: currentDate.toISOString(),
                last_price: prevLastPrice
            });
        } else {
            const arrayTiming = array[currentIndex].timing.toISOString().slice(0, 10);
            const currentTiming = currentDate.toISOString().slice(0, 10);

            if (arrayTiming === currentTiming) {
                results.push(array[currentIndex]);
                prevLastPrice = array[currentIndex].last_price;
                currentIndex++;
            } else {
                results.push({
                    timing: currentDate.toISOString(),
                    last_price: prevLastPrice
                });
            }
        }
        
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }

    return results;
}

const fillMissingData = (array, days) => {

    if (!array.length) return [];

    const results = [];
    let currentIndex = 0;
    let currentDate = new Date(array[currentIndex].created_date);

    for (let i = 0; i < days; i++) {

        if (currentIndex === array.length && currentIndex < days) {
            results.push({
                created_date: currentDate.toISOString(),
                count: 0
            });
        } else {
            const arrayTiming = new Date(array[currentIndex].created_date).toISOString().slice(0, 10);
            const currentTiming = currentDate.toISOString().slice(0, 10);

            if (arrayTiming === currentTiming) {
                results.push(array[currentIndex]);
                currentIndex++;
            } else {
                results.push({
                    created_date: currentDate.toISOString(),
                    count: 0
                });
            }
        }
        
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }

    return results;
}

module.exports = {
    fillMissingDates,
    fillMissingData
}