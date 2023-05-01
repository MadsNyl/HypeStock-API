

const pearsonCorrelation = (array1, array2) => {
    if (array1.length !== array2.length) return 0;

    const mean1 = array1.reduce((sum, value) => Number(sum) + Number(value), 0) / array1.length;
    const mean2 = array2.reduce((sum, value) => Number(sum) + Number(value), 0) / array2.length;

    let numerator = 0;
    let denominator1 = 0;
    let denominator2 = 0;
  
    for (let i = 0; i < array1.length; i++) {
      numerator += (array1[i] - mean1) * (array2[i] - mean2);
      denominator1 += Math.pow(array1[i] - mean1, 2);
      denominator2 += Math.pow(array2[i] - mean2, 2);
    }
  
    const denominator = Math.sqrt(denominator1) * Math.sqrt(denominator2);
    const correlation = numerator / denominator;
  
    return correlation;
}

module.exports = {
    pearsonCorrelation
}