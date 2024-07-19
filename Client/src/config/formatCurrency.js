export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        currencyDisplay: 'code' 
      }).format(amount);
  };


