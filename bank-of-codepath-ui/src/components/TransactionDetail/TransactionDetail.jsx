import * as React from "react";
import { formatAmount, formatDate } from "../../utils/format";
import "./TransactionDetail.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../constants";

export default function TransactionDetail() {
  const [hasFetched, setHasFetched] = React.useState(false);
  const [transaction, setTransaction] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const { transactionId } = useParams();

  React.useEffect(() => {
    const fetchTransactionById = async () => {
      setIsLoading(true);
      setHasFetched(false);
      if (transactionId) {
        try {
          const response = await axios.get(
            API_BASE_URL + `/bank/transactions/${transactionId}`
          );
          console.log("resp", response);
          const res = await response.data.transaction;
          setTransaction(res);
        } catch (err) {
          console.log(err);
          setError(err);
        }
      }
      setIsLoading(false);
      setHasFetched(true);
    };
    fetchTransactionById();
  }, [transactionId]);
  console.log("TC", transaction);
  return (
    <div className="transaction-detail">
      <TransactionCard
        transaction={transaction}
        transactionId={transactionId}
        isLoading={isLoading}
        hasFetched={hasFetched}
      />
    </div>
  );
}

export function TransactionCard({
  transaction = {},
  transactionId = null,
  isLoading,
  hasFetched,
}) {
  return (
    <div className="transaction-card card">
      <div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        <p className="category">{transaction.category}</p>
      </div>
      {transaction ? (
        <>
          <div className="card-content">
            <p className="description">{transaction.description}</p>
          </div>
          <div className="card-footer">
            <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>
              {formatAmount(transaction.amount)}
            </p>
            <p className="date">{formatDate(transaction.postedAt)}</p>
          </div>
        </>
      ) : (
        <h1>Not Found</h1>
      )}
    </div>
  );
}
