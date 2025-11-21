const convertToSubCurrency = (amount: number, factor = 100) => Math.round(amount * factor);
const convertToOriginCurrency = (amount: number, factor = 100) => amount / factor;

export {convertToSubCurrency, convertToOriginCurrency}