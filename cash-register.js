function checkCashRegister(price, cash, cid) {
  // Variable initialization
  const result = { status: null, change: [] };
  const drawer = {};
  let changeAmount = cash - price;
  let totalInDrawer = 0;
  const currencyUnits = [
    { name: 'ONE HUNDRED', value: 100 },
    { name: 'TWENTY', value: 20 },
    { name: 'TEN', value: 10 },
    { name: 'FIVE', value: 5 },
    { name: 'ONE', value: 1 },
    { name: 'QUARTER', value: 0.25 },
    { name: 'DIME', value: 0.1 },
    { name: 'NICKEL', value: 0.05 },
    { name: 'PENNY', value: 0.01 }
  ];

  // Calculate total amount in drawer and save cid in our drawer
  for (const [unit, amount] of cid) {
    drawer[unit] = amount;
    totalInDrawer += amount;
  }

  if (totalInDrawer === changeAmount) {
    result.status = 'CLOSED';
    result.change = cid;
    return result;
  }

  if (totalInDrawer < changeAmount) {
    result.status = 'INSUFFICIENT_FUNDS';
    return result;
  }

  const changeArray = [];
  for (const unit of currencyUnits) {
    const { name, value } = unit;
    let count = 0;

    while (drawer[name] > 0 && changeAmount >= value) {
      changeAmount -= value;
      drawer[name] -= value;
      count += value;
      changeAmount = Math.round(changeAmount * 100) / 100;
    }

    if (count > 0) {
      changeArray.push([name, count]);
    }
  }

  if (changeArray.length < 1 || changeAmount > 0) {
    result.status = 'INSUFFICIENT_FUNDS';
    return result;
  }

  result.status = 'OPEN';
  result.change = changeArray;
  return result;
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
