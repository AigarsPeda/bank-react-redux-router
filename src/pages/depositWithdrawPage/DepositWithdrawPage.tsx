import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { makeDeposit, makeWithdraw } from "../../redux/actions/cards";
import { getCardTransactions } from "../../redux/actions/transactions";
import { RootStateType } from "../../redux/reducers";
import { isPositiveNumberEntered } from "../../utils/positiveNumberEntered";

interface IParamTypes {
  id: string;
}

const DepositPage: React.FC = () => {
  const { id } = useParams<IParamTypes>();

  const dispatch = useDispatch();
  const { cardTransactions } = useSelector((state: RootStateType) => ({
    cardTransactions: state.transactions.cardTransactions
  }));

  const [state, setState] = useState({
    depositAmount: "",
    depositDescription: "",
    withdrawAmount: "",
    withdrawDescription: ""
  });
  const [massage, setMessage] = useState("");

  useEffect(() => {
    dispatch(getCardTransactions(id));
  }, [id, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((state) => ({
      ...state,
      [name]: value
    }));
  };

  const handleDepositSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPositiveNumberEntered(state.depositAmount)) {
      return setMessage("Number must bee positive!");
    }

    const amountInt = parseInt(state.depositAmount);
    const responseFromAPI = await dispatch(
      makeDeposit(id, {
        deposit_amount: amountInt,
        deposit_description: state.depositDescription
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setMessage(responseFromAPI as any);
    setState({
      depositAmount: "",
      depositDescription: "",
      withdrawAmount: "",
      withdrawDescription: ""
    });
    dispatch(getCardTransactions(id));
  };

  const handleWithdrawSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPositiveNumberEntered(state.withdrawAmount)) {
      return setMessage("Number must bee positive!");
    }

    const amountInt = parseInt(state.withdrawAmount);
    const responseFromAPI = await dispatch(
      makeWithdraw(id, {
        withdraw_amount: amountInt * -1,
        withdraw_description: state.withdrawDescription
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setMessage(responseFromAPI as any);
    setState({
      depositAmount: "",
      depositDescription: "",
      withdrawAmount: "",
      withdrawDescription: ""
    });
    dispatch(getCardTransactions(id));
  };

  return (
    <div className="deposit-withdraw-page">
      <div className="deposit-withdraw-actions">
        <h1>Make deposit:</h1>
        <form onSubmit={handleDepositSubmit} className="deposit-form">
          <input
            type="number"
            placeholder="Enter amount..."
            name="depositAmount"
            onChange={handleChange}
            value={state.depositAmount}
          />
          <input
            type="text"
            placeholder="Description..."
            name="depositDescription"
            onChange={handleChange}
            value={state.depositDescription}
          />
          <button type="submit">Make deposit</button>
          <div>{massage && massage}</div>
        </form>
        <h1>Withdraw:</h1>
        <form onSubmit={handleWithdrawSubmit} className="withdraw-form">
          <input
            type="number"
            placeholder="Enter amount..."
            name="withdrawAmount"
            onChange={handleChange}
            value={state.withdrawAmount}
          />
          <input
            type="text"
            placeholder="Description..."
            name="withdrawDescription"
            onChange={handleChange}
            value={state.withdrawDescription}
          />
          <button type="submit">Withdraw</button>
          <div>{massage && massage}</div>
        </form>
      </div>
      <div className="deposit-main">
        {!cardTransactions.length ? (
          <div>No transactions</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tfoot>
              {cardTransactions.map((transaction) => {
                return (
                  <tr key={transaction.transaction_id}>
                    {transaction.withdraw_amount && (
                      <td> {transaction.withdraw_amount} </td>
                    )}
                    {transaction.deposit_amount && (
                      <td> {transaction.deposit_amount} </td>
                    )}
                    {transaction.withdraw_description && (
                      <td> {transaction.withdraw_description} </td>
                    )}
                    {transaction.deposit_description && (
                      <td> {transaction.deposit_description} </td>
                    )}
                    <td>{transaction.formatted_date}</td>
                  </tr>
                );
              })}
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
};

export default DepositPage;
