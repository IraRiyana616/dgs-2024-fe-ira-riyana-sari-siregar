export const formatBalance = (balance) => {
  // Remove any non-numeric characters except for decimal points
  return balance.replace(/[^0-9.]/g, '');
};

export const parseBalance = (balance) => {
  // Remove currency symbol and format balance
  return balance.replace(/[^0-9.]/g, '');
};
