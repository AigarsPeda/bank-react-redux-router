import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCards } from "../../redux/actions/cards";
import {
  //getAllTransactions,
  getTransactions
} from "../../redux/actions/transactions";
import { getUser } from "../../redux/actions/user";
import { RootStateType } from "../../redux/reducers";
import { ITransactions } from "../../types";

// import { Line } from "react-chartjs-2";
// import { ITransactions } from "../../types";

const AccountOverview: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const {
    cards,
    transactions,
    clientsTotalBalance,
    isLoadingTransactions
  } = useSelector((state: RootStateType) => ({
    cards: state.cards.cards,
    transactions: state.transactions.transactions,
    clientsTotalBalance: state.user.user.clients_total_balance,
    isLoadingTransactions: state.transactions.isLoadingTransactions
  }));

  const [cardId, setCardsId] = useState("all_transactions");

  useEffect(() => {
    dispatch(getCards());
    dispatch(getUser());
    dispatch(getTransactions(cardId));
  }, [cardId, dispatch]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCardsId(e.target.value);
  };

  const handleOnBlur = () => {
    setCardsId("all_transactions");
  };

  // const getIncomeValue = () => {
  //   return transactions.reduce((a: number, b: ITransactions) => {
  //     if (b.deposit_amount === null) {
  //       return a;
  //     } else {
  //       return a + parseInt(b.deposit_amount);
  //     }
  //   }, 0);
  // };

  // const getOutcomeValue = () => {
  //   return transactions.reduce((a: number, b: ITransactions) => {
  //     if (b.withdraw_amount === null) {
  //       return a;
  //     } else {
  //       return a + parseInt(b.withdraw_amount);
  //     }
  //   }, 0);
  // };

  const reducedTransactionsUniquePerDay = transactions.reduce(
    (accumulator: ITransactions[], current) => {
      if (!isLoadingTransactions) {
        if (
          !accumulator.some(
            (tran: ITransactions) =>
              tran.formatted_date === current.formatted_date
          )
        ) {
          // if current is unique object add it to array
          accumulator.push(current);
        } else {
          // if current already is in the array find it index
          const objIndex = accumulator.findIndex(
            (obj) => obj.formatted_date === current.formatted_date
          );

          // necessary because accumulator[objIndex]?.withdraw_amount may be null
          const withdraw_amount = accumulator[objIndex]?.withdraw_amount ?? "0";
          const current_withdraw_amount = current?.withdraw_amount ?? "0";
          const deposit_amount = accumulator[objIndex]?.deposit_amount ?? "0";
          const current_deposit_amount = current?.deposit_amount ?? "0";

          // creating new object with updated values
          const updated = {
            ...accumulator[objIndex],
            withdraw_amount: (
              +withdraw_amount + +current_withdraw_amount
            ).toString(),
            deposit_amount: (
              +deposit_amount + +current_deposit_amount
            ).toString()
          };

          // if object is in accumulator array find it and update it
          return [
            ...accumulator.slice(0, objIndex),
            updated,
            ...accumulator.slice(objIndex + 1)
          ];
        }
      }
      console.log("accumulator: ", accumulator);
      return accumulator;
    },
    []
  );

  // console.log(
  //   "reducedTransactionsUniquePerDay: ",
  //   reducedTransactionsUniquePerDay
  // );

  // const labelValues = reducedTransactionsUniquePerDay.map((transaction) => {
  //   return transaction.formatted_date;
  // });

  // const withdrawValues = reducedTransactionsUniquePerDay.map((transaction) => {
  //   return (
  //     transaction.withdraw_amount &&
  //     (+transaction.withdraw_amount * -1).toString()
  //   );
  // });

  // const depositValues = reducedTransactionsUniquePerDay.map((transaction) => {
  //   return transaction.deposit_amount;
  // });

  // TODO: get individual cards transactions
  // getTransactions(cardId);
  // http://localhost:8000/transactions/1?start_date=15-01-2021&end_date=15-01-2021

  return (
    <div className="account-overview">
      {console.log("transactions: ", transactions)}
      {console.log("isLoadingTransactions: ", isLoadingTransactions)}
      {console.log(
        "reducedTransactionsUniquePerDay: ",
        reducedTransactionsUniquePerDay
      )}
      <div className="account-overview-header">
        <div className="account-overview-select">
          <h3>Overview of</h3>
          {console.log("cardId: ", cardId)}
          <select
            name="cardId"
            id="cardId"
            onChange={handleSelectChange}
            onBlur={handleOnBlur}
            value={cardId}
          >
            <option value="all_transactions" defaultValue="all_transactions">
              all cards
            </option>
            {cards.map((card) => {
              return (
                <option value={card.card_id} key={card.card_id}>
                  {card.card_no}
                </option>
              );
            })}
          </select>
        </div>
        <div className="account-overview-days">
          <ul>
            <li>
              <Link to="">Day</Link>
            </li>
            <li>
              <Link to="">Week</Link>
            </li>
            <li>
              <Link to="">Month</Link>
            </li>
            <li>
              <Link to="">Year</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="account-overview-statistics">
        <div className="account-overview-header">
          <label>
            Current balance
            <h2>${clientsTotalBalance}</h2>
          </label>
          <label>
            Income
            <h2>${"getIncomeValue()"}</h2>
          </label>
          <label>
            Outcome
            <h2>${"getOutcomeValue()"}</h2>
          </label>
        </div>
      </div>

      {/* <Line
        data={{
          labels: labelValues,
          datasets: [
            {
              label: "# of deposit",
              data: depositValues,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1
            },
            {
              label: "# of withdraw",
              data: withdrawValues,
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1
            }
          ]
        }}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: true,
          scales: {
            yAxis: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }}
      /> */}
      <div className="account-overview-table">
        <table>
          <tr>
            <th>Heij</th>
          </tr>

          {transactions.map((transaction) => {
            return (
              <tr key={transaction.transaction_id}>
                <td>{transaction.balance}</td>
                <td>{transaction.card_id}</td>
                <td>{transaction.deposit_amount}</td>
                <td>{transaction.deposit_description}</td>
                <td>{transaction.formatted_date}</td>
                <td>{transaction.transaction_id}</td>
                <td>{transaction.withdraw_amount}</td>
                <td>{transaction.withdraw_description}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
});

export default AccountOverview;
