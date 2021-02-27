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
  const [withdraw, setWithdraw] = useState({
    amount: "",
    description: ""
  });
  const [massage, setMessage] = useState("");

  useEffect(() => {
    dispatch(getCardTransactions(id));
  }, [id, cardTransactions, dispatch]);

  const handleChangeDepositForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeposit((state) => ({
      ...state,
      [name]: value
    }));
  };

  const handleChangeWithdrawForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWithdraw((state) => ({
      ...state,
      [name]: value
    }));
  };

  const handleDepositSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amountInt = parseInt(deposit.amount);

    if (amountInt <= 0 || deposit.amount.length === 0) {
      setMessage("Number must bee positive!");
      return;
    }

    const responseFromAPI = await dispatch(
      makeDeposit(id, {
        deposit_amount: amountInt,
        deposit_description: deposit.description
      })
    );

    // TODO: add value to cards in state

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setMessage(responseFromAPI as any);
    setDeposit({
      amount: "",
      description: ""
    });
  };

  const handleWithdrawSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="deposit-withdraw-page">
      <div className="deposit-withdraw-actions">
        <h1>Make deposit:</h1>
        <form onSubmit={handleDepositSubmit} className="deposit-form">
          <input
            type="number"
            placeholder="Enter amount..."
            name="amount"
            onChange={handleChangeDepositForm}
            value={deposit.amount}
          />
          <input
            type="text"
            placeholder="Description..."
            name="description"
            onChange={handleChangeDepositForm}
            value={deposit.description}
          />
          <button type="submit">Make deposit</button>
          <div>{massage && massage}</div>
        </form>
        <h1>Withdraw:</h1>
        <form onSubmit={handleWithdrawSubmit} className="withdraw-form">
          <input
            type="number"
            placeholder="Enter amount..."
            name="amount"
            onChange={handleChangeWithdrawForm}
            value={withdraw.amount}
          />
          <input
            type="text"
            placeholder="Description..."
            name="description"
            onChange={handleChangeWithdrawForm}
            value={withdraw.description}
          />
          <button type="submit">Withdraw</button>
          <div>{massage && massage}</div>
        </form>
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
