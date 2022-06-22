import * as React from "react";
import AddTransaction from "../AddTransaction/AddTransaction";
import BankActivity from "../BankActivity/BankActivity";
import "./Home.css";
import axios from "axios";
import { API_BASE_URL } from "../../constants";

export default function Home({
  isLoading,
  setIsLoading,
  error,
  setError,
  transactions,
  setTransactions,
  transfers,
  setTransfers,
  filterInputValue,
  newTransactionForm,
  setNewTransactionForm,
  isCreating,
  setIsCreating,
}) {
  let filteredTransactions = () => {
    if (filterInputValue && transactions) {
      return transactions?.filter((trans) =>
        trans.description.toLowerCase().includes(filterInputValue.toLowerCase())
      );
    }
    return transactions;
  };

  React.useEffect(() => {
    const func = async () => {
      setIsLoading(true);
      try {
        const response1 = await axios.get(API_BASE_URL + "/bank/transactions");
        const transactionsResponse = await response1.data.transactions;
        setTransactions(transactionsResponse);

        const response2 = await axios.get(API_BASE_URL + "/bank/transfers");
        const transfersResponse = await response2.data.transfers;
        setTransfers(transfersResponse);
      } catch (err) {
        setError(err);
      }

      setIsLoading(false);
    };
    func();
  }, []);

  function handleOnSubmitNewTransaction(evt) {
    // var keys = { amount, description, category };
    // console.log("keys", keys);
    // const func = async () => {
    //   setIsCreating(true);
    //   try {
    //     const response = await axios.post(API_BASE_URL + "/bank/transactions", {
    //       transaction: keys,
    //     });
    //     const transactionResponse = await response.data.transaction;
    //     setTransactions((transactions) => [
    //       ...transactions,
    //       transactionResponse,
    //     ]);
    //     console.log("trans resp", transactionResponse);
    //     console.log("curr transaction", transactions);
    //     setNewTransactionForm({
    //       category: "",
    //       description: "",
    //       amount: 0,
    //     });
    //   } catch (err) {
    //     setError(err);
    //   }
    //   setIsCreating(false);
    // };
    // func();
  }

  return (
    <div className="home">
      <AddTransaction
        form={newTransactionForm}
        setForm={setNewTransactionForm}
        handleOnSubmit={handleOnSubmitNewTransaction}
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        setTransactions={setTransactions}
      />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <BankActivity
          transactions={filteredTransactions()}
          transfers={transfers}
        />
      )}
      {error ? <h2 className="error">{error}</h2> : null}
    </div>
  );
}
