import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { makeDeposit } from "../../redux/actions/cards";
import { getCardTransactions } from "../../redux/actions/transactions";
import { RootStateType } from "../../redux/reducers";

interface IParamTypes {
  id: string;
}

const DepositPage: React.FC = () => {
  const { id } = useParams<IParamTypes>();
  const dispatch = useDispatch();
  const { cardTransactions } = useSelector((state: RootStateType) => ({
    cardTransactions: state.transactions.cardTransactions
  }));
  const [deposit, setDeposit] = useState({
    amount: "",
    description: ""
  });
  const [response, setResponse] = useState("");

  useEffect(() => {
    dispatch(getCardTransactions(id));
  }, [dispatch, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeposit((state) => ({
      ...state,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amountInt = parseInt(deposit.amount);
    const responseFromAPI: any = await dispatch(
      makeDeposit(id, {
        deposit_amount: amountInt,
        deposit_description: deposit.description
      })
    );

    // TODO: add value to cards in state

    setResponse(responseFromAPI);
    setDeposit({
      amount: "",
      description: ""
    });
  };

  return (
    <div className="deposit-page">
      <div className="deposit-actions">
        <h1>Make deposit</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter amount"
            name="amount"
            onChange={handleChange}
            value={deposit.amount}
          />
          <input
            type="text"
            placeholder="Description..."
            name="description"
            onChange={handleChange}
            value={deposit.description}
          />
          <button type="submit">Make deposit</button>
          <div>{response && response}</div>
        </form>
        Withdraw
      </div>
      <div className="deposit-main">
        Some kind of stats
        {!cardTransactions.length ? (
          <div>No transactions</div>
        ) : (
          cardTransactions.map((transaction) => {
            return (
              <div key={transaction.transaction_id}>
                {transaction.deposit_description}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DepositPage;
