import React, { useState, useEffect } from "react";
import fetch from "../../api/bkndAPI";
import ResponsiveGrid from "../ResponsiveGrid";


function calcResults(data) {
  const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const pntsPrTransaction = data.map((transaction) => {
    let points = 0;
    let over100 = transaction.amt - 100;

    if (over100 > 0) {
      points += over100 * 2;
    }
    if (transaction.amt > 50) {
      points += 50;
    }
    const month = new Date(transaction.transactionDt).getMonth();
    return { ...transaction, points, month };
  });
  // console.log(
  //   `pntsPrTransaction -  ${JSON.stringify(pntsPrTransaction)}`
  // );
  let byCust = {};
  let totalPointsByCust = {};
  pntsPrTransaction.forEach((pntsPrTransaction) => {
    let { id, name, month, points } = pntsPrTransaction;
    if (!byCust[id]) {
      byCust[id] = [];
    }
    if (!totalPointsByCust[id]) {
      totalPointsByCust[name] = 0;
    }
    totalPointsByCust[name] += points;
    if (byCust[id][month]) {
      byCust[id][month].points += points;
      byCust[id][month].monthNumber = month;
      byCust[id][month].numTransactions++;
    } else {
      byCust[id][month] = {
        id,
        name,
        monthNumber: month,
        month: months[month],
        numTransactions: 1,
        points
      };
    }
  });
  // console.log(
  //   `totalPointsByCust  ---  ${JSON.stringify(totalPointsByCust)}`
  // );
  let tot = [];
  for (var custKey in byCust) {
    byCust[custKey].forEach((cRow) => {
      tot.push(cRow);
    });
  }
  let totbyCust = [];
  for (custKey in totalPointsByCust) {
    totbyCust.push({
      name: custKey,
      points: totalPointsByCust[custKey],
    });
  }
  return {
    summaryByCust: tot,
    pntsPrTransaction,
    totalPointsByCust: totbyCust,
  };
}

function Rewards() {
  const [transactionData, setTransactionData] = useState(null);

  const columns = [
    {
      Header: "Customer",
    },
    {
      Header: "Month",
    },
    {
      Header: "Transactions",
    },
    {
      Header: "Rewards",
    },
  ];
  const ColumnsTotals = [
    {
      Header: "Customer",
    },
    {
      Header: "Points",
    },
  ];

  useEffect(() => {
    fetch().then((data) => {
      const results = calcResults(data);
      setTransactionData(results);
    });
  }, []);

  if (transactionData == null) {
    return <div>Loading</div>;
  }

  return transactionData == null ? (
    <div>Loading</div>
  ) : (
    <div>
      <ResponsiveGrid
        data={transactionData.summaryByCust}
        title={"PRS By Customer Month"}
        columns={columns}
        size={"1"}
      />
      <ResponsiveGrid
        data={transactionData.totalPointsByCust}
        title={"PRS Totals By Customer"}
        columns={ColumnsTotals}
        size={"1"}
      />
    </div>
  );
}

export default Rewards;
