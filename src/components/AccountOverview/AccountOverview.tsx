import React, { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCards } from "../../redux/actions/cards";
import {
  getAllTransactions,
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

  const getWrightTransactions = useCallback(() => {
    if (cardId === "all_transactions") {
      console.log("te");
      dispatch(getAllTransactions());
    } else {
      dispatch(getTransactions(cardId));
    }
  }, [cardId, dispatch]);

  useEffect(() => {
    dispatch(getCards());
    dispatch(getUser());
    getWrightTransactions();
  }, [cardId, dispatch, getWrightTransactions]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCardsId(e.target.value);
  };

  const handleOnBlur = () => {
    // setCardsId("all_transactions");
    return;
  };

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
      // console.log("accumulator: ", accumulator);
      return accumulator;
    },
    []
  );

  const getIncomeValue = () => {
    return reducedTransactionsUniquePerDay.reduce(
      (a: number, b: ITransactions) => {
        if (b.deposit_amount === null) {
          return a;
        } else {
          return a + parseInt(b.deposit_amount);
        }
      },
      0
    );
  };

  const getWithdrawAmount = () => {
    return reducedTransactionsUniquePerDay.reduce(
      (a: number, b: ITransactions) => {
        if (b.withdraw_amount === null) {
          return a;
        } else {
          return a + parseInt(b.withdraw_amount);
        }
      },
      0
    );
  };

  const labelValues = reducedTransactionsUniquePerDay.map((transaction) => {
    return transaction.formatted_date;
  });

  const withdrawValues = reducedTransactionsUniquePerDay.map((transaction) => {
    if (transaction.withdraw_amount) {
      return (+transaction.withdraw_amount * -1).toString();
    } else {
      return "0";
    }
  });

  const depositValues = reducedTransactionsUniquePerDay.map((transaction) => {
    if (transaction.deposit_amount) {
      return transaction.deposit_amount;
    } else {
      return "0";
    }
  });

  // TODO: get all cards transactions
  // getTransactions(cardId);
  // http://localhost:8000/transactions/1?start_date=15-01-2021&end_date=15-01-2021

  return (
    <div className="account-overview">
      <div className="account-overview-header">
        <div className="account-overview-select">
          <h3>Overview of</h3>
          {console.log("cardId: ", cardId)}
          {console.log("transactions: ", transactions)}
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
            <h2>${getIncomeValue()}</h2>
          </label>
          <label>
            Outcome
            <h2>${getWithdrawAmount()}</h2>
          </label>
        </div>
      </div>

      <Line
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
        height={35}
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
      />
      <div className="account-overview-table">
        <h3>Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tfoot>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.transaction_id}>
                  {transaction.deposit_description && (
                    <td>{transaction.deposit_description}</td>
                  )}
                  {transaction.withdraw_description && (
                    <td>{transaction.withdraw_description}</td>
                  )}
                  <td>{transaction.formatted_date}</td>
                  {transaction.withdraw_amount && (
                    <td className="withdraw">{transaction.withdraw_amount}</td>
                  )}
                  {transaction.deposit_amount && (
                    <td className="deposit">{transaction.deposit_amount}</td>
                  )}
                </tr>
              );
            })}
          </tfoot>
        </table>
      </div>
    </div>
  );
});

export default AccountOverview;
