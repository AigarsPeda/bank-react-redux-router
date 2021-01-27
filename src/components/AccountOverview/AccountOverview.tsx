import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCards } from "../../redux/actions/cards";
import { getAllTransactions } from "../../redux/actions/transactions";
import { getUser } from "../../redux/actions/user";
import { RootStateType } from "../../redux/reducers";
import { ITransactions } from "../../types";
import { Line } from "react-chartjs-2";

type Props = {};

const AccountOverview: React.FC<Props> = React.memo(() => {
  const dispatch = useDispatch();
  const { cards, transactions, clientsTotalBalance } = useSelector(
    (state: RootStateType) => ({
      cards: state.cards.cards,
      transactions: state.transactions.transactions,
      clientsTotalBalance: state.user.user.clients_total_balance
    })
  );

  const [cardId, setCardsId] = useState("all_transactions");

  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  // when tag changes get new transactions
  useEffect(() => {
    // on page reload get transactions and user
    dispatch(getAllTransactions());
    dispatch(getUser());
  }, [cardId, dispatch]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCardsId(e.target.value);
  };

  const getIncomeValue = () => {
    return transactions.reduce((a: number, b: ITransactions) => {
      if (b.deposit_amount === null) {
        return a;
      } else {
        return a + parseInt(b.deposit_amount);
      }
    }, 0);
  };

  const getOutcomeValue = () => {
    return transactions.reduce((a: number, b: ITransactions) => {
      if (b.withdraw_amount === null) {
        return a;
      } else {
        return a + parseInt(b.withdraw_amount);
      }
    }, 0);
  };

  const reducedTransactionsUniquePerDay = transactions.reduce(
    (accumulator: ITransactions[], current) => {
      if (
        !accumulator.some(
          (tran: ITransactions) =>
            tran.formatted_date === current.formatted_date
        )
      ) {
        accumulator.push(current);
      } else {
        const objIndex = accumulator.findIndex(
          (obj) => obj.formatted_date == current.formatted_date
        );

        if (current.deposit_amount !== null) {
          accumulator[objIndex].deposit_amount = (
            +accumulator[objIndex].deposit_amount! + +current.deposit_amount
          ).toString();
        }

        if (current.withdraw_amount !== null) {
          accumulator[objIndex].withdraw_amount = (
            +accumulator[objIndex].withdraw_amount! + +current.withdraw_amount
          ).toString();
        }
      }
      return accumulator;
    },
    []
  );

  const labelValues = reducedTransactionsUniquePerDay.map((transaction) => {
    return transaction.formatted_date;
  });

  const withdrawValues = reducedTransactionsUniquePerDay.map((transaction) => {
    return (
      transaction.withdraw_amount &&
      (+transaction.withdraw_amount * -1).toString()
    );
  });

  const depositValues = reducedTransactionsUniquePerDay.map((transaction) => {
    return transaction.deposit_amount;
  });

  // TODO: get individual cards transactions
  // getTransactions(cardId);
  // http://localhost:8000/transactions/1?start_date=15-01-2021&end_date=15-01-2021

  return (
    <div className="account-overview">
      {console.log("withdrawValues: ", withdrawValues)}
      {console.log("depositValues: ", depositValues)}
      <div className="account-overview-header">
        <div className="account-overview-select">
          <h3>Overview of</h3>
          <select
            name="cardId"
            id="cardId"
            onChange={handleSelectChange}
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
            <h2>${getOutcomeValue()}</h2>
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
        height={50}
        options={{
          maintainAspectRatio: false,
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
    </div>
  );
});

export default AccountOverview;
