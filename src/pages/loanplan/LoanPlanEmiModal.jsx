import React from "react";
import CloseButton from "../../components/buttons/CloseButton";
import "./LoanPlan.css";

const money = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return "-";
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
};

const LoanPlanEmiModal = ({ schedule, planName, onBack, onClose }) => {
  if (!schedule) return null;

  return (
    <div className="loan-plan-emi-overlay">
      <div className="loan-plan-emi-modal">
        <div className="loan-plan-emi-header">
          <div>
            <h2>{planName ? planName.toUpperCase() : "ADD NEW PLAN"}</h2>
            <p>PLAN EMI</p>
          </div>
          <CloseButton onClick={onClose} />
        </div>

        <div className="loan-plan-emi-summary">
          <div>
            <span>NUMBER OF PAYMENTS:</span>
            <strong>{schedule.numberOfPayments}</strong>
          </div>
          <div>
            <span>TOTAL AMOUNT TO PAY:</span>
            <strong>{money(schedule.totalAmountToPay)}</strong>
          </div>
          <div>
            <span>PRELOAN EMI INTEREST:</span>
            <strong>{money(schedule.preloanEmiInterest)}</strong>
          </div>
          <div>
            <span>PRINCIPAL AMOUNT:</span>
            <strong>{money(schedule.principalAmount)}</strong>
          </div>
        </div>

        <div className="loan-plan-emi-table-wrap">
          <table className="loan-plan-emi-table">
            <thead>
              <tr>
                <th>#</th>
                <th>DATE</th>
                <th>BASE</th>
                <th>INTEREST</th>
                <th>EMI</th>
                <th>BALANCE</th>
              </tr>
            </thead>
            <tbody>
              {schedule.rows.map((row) => (
                <tr key={row.index}>
                  <td>{row.index}</td>
                  <td>{row.date}</td>
                  <td>{money(row.base)}</td>
                  <td>{money(row.interest)}</td>
                  <td>{money(row.emi)}</td>
                  <td>{money(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="loan-plan-emi-footer">
          <button type="button" className="loan-plan-emi-back-btn" onClick={onBack}>
            BACK
          </button>
          <button type="button" className="loan-plan-emi-cancel-btn" onClick={onClose}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanPlanEmiModal;
