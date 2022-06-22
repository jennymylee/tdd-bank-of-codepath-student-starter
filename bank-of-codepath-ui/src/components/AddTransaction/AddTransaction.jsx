import * as React from "react";
import { useState } from "react";
import "./AddTransaction.css";
import axios from "axios";
import { API_BASE_URL } from "../../constants";

export default function AddTransaction({
  form,
  setForm,
  handleOnSubmit,
  isCreating,
  setIsCreating,
  setTransactions,
}) {
  const [error, setError] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [description, setDescription] = React.useState("");

  function handleOnSubmitNewTransaction(evt) {
    var keys = { amount, description, category };

    console.log("keys", keys);
    const func = async () => {
      setIsCreating(true);
      try {
        const response = await axios.post(API_BASE_URL + "/bank/transactions", {
          transaction: keys,
        });

        const transactionResponse = await response.data.transaction;

        setTransactions((transactions) => [
          ...transactions,
          transactionResponse,
        ]);
        console.log("trans resp", transactionResponse);
        console.log("curr transaction", transactions);

        setNewTransactionForm({
          category: "",
          description: "",
          amount: 0,
        });
      } catch (err) {
        setError(err);
      }

      setIsCreating(false);
    };
    func();
  }
  handleOnSubmit = handleOnSubmitNewTransaction;

  function handleOnFormFieldChange(change) {
    if (change.target.name == "category") {
      setCategory(change.target.value);
    }
    if (change.target.name == "amount") {
      setAmount(change.target.value);
    }
    if (change.target.name == "description") {
      setDescription(change.target.value);
    }
    setForm({ category: category, amount: amount, description: description });
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm
        form={form}
        handleOnFormFieldChange={handleOnFormFieldChange}
        category={category}
        amount={amount}
        description={description}
        handleOnSubmit={handleOnSubmit}
        isCreating={isCreating}
      />
    </div>
  );
}

export function AddTransactionForm({
  form,
  handleOnFormFieldChange,
  category,
  amount,
  description,
  handleOnSubmit,
  isCreating,
}) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input
            name="description"
            value={description}
            type="text"
            onChange={handleOnFormFieldChange}
          />
        </div>
        <div className="field">
          <label>Category</label>
          <input
            name="category"
            value={category}
            type="text"
            onChange={handleOnFormFieldChange}
          />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input
            name="amount"
            value={amount}
            type="number"
            onChange={handleOnFormFieldChange}
          />
        </div>

        <button
          className="btn add-transaction"
          type="submit"
          onClick={() => handleOnSubmit()}
        >
          Add
        </button>
      </div>
    </div>
  );
}
