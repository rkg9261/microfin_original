import React, { useEffect, useRef, useState } from "react";

import {
  CloseButton,
  CancelButton,
  SaveButton,
} from "../../../../components/buttons";

const FYOpeningBalanceManualForm = ({
  onClose,
  onCreate,
  sessions,
  branches,
}) => {
  const [formData, setFormData] = useState({
    session: "2026-2027",
    branch: "LASKARHAT",
  });

  const [errors, setErrors] = useState({});

  const [ledgerRows, setLedgerRows] = useState([
    {
      id: 1,
      ledger: "BRANCH SALIWARA",
      group: "STOCK IN HAND",
      openingBalance: "",
    },
    {
      id: 2,
      ledger: "BRANCH SAHARANPUR",
      group: "CURRENT ASSETS",
      openingBalance: "",
    },
    {
      id: 3,
      ledger: "AJAY",
      group: "CASH IN HAND",
      openingBalance: "",
    },
    {
      id: 4,
      ledger: "NEHA SINGH - INVESTOR",
      group: "CURRENT LIABILITY",
      openingBalance: "",
    },
    {
      id: 5,
      ledger: "MUKESH",
      group: "P C L",
      openingBalance: "",
    },
    {
      id: 6,
      ledger: "ASHISH",
      group: "LOAN (LIABILITY)",
      openingBalance: "",
    },
    {
      id: 7,
      ledger: "ALAEX",
      group: "KAKA",
      openingBalance: "",
    },
    {
      id: 8,
      ledger: "BRANCH AMAN KUMAR",
      group: "CURRENT ASSETS",
      openingBalance: "",
    },
  ]);

  const firstInputRef = useRef(null);

  /* =====================================================
     FOCUS
  ===================================================== */

  useEffect(() => {
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);
  }, []);

  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleFormChange = (name, value) => {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  /* =====================================================
     BALANCE CHANGE
  ===================================================== */

  const handleBalanceChange = (
    id,
    value
  ) => {
    setLedgerRows((previous) =>
      previous.map((row) =>
        row.id === id
          ? {
              ...row,
              openingBalance: value,
            }
          : row
      )
    );
  };

  /* =====================================================
     VALIDATION
  ===================================================== */

  const validate = () => {
    const newErrors = {};

    if (!formData.session) {
      newErrors.session =
        "Session is required";
    }

    if (!formData.branch) {
      newErrors.branch =
        "Branch is required";
    }

    const hasBalance = ledgerRows.some(
      (row) =>
        row.openingBalance !== "" &&
        row.openingBalance !== null
    );

    if (!hasBalance) {
      newErrors.ledger =
        "Enter opening balance for at least one ledger";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =====================================================
     CREATE
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const records = ledgerRows
      .filter(
        (row) =>
          row.openingBalance !== "" &&
          row.openingBalance !== null
      )
      .map((row) => ({
        session: formData.session,
        branch: formData.branch,
        ledger: row.ledger,
        group: row.group,
        openingBalance:
          Number(row.openingBalance) || 0,
      }));

    onCreate(records);
  };

  /* =====================================================
     KEYBOARD NAVIGATION
  ===================================================== */

  const handleKeyDown = (e) => {
    const formElements = Array.from(
      e.currentTarget.querySelectorAll(
        "select, input, button"
      )
    );

    const currentIndex =
      formElements.indexOf(
        document.activeElement
      );

    if (currentIndex === -1) {
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      const next =
        formElements[currentIndex + 1];

      next?.focus();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      const previous =
        formElements[currentIndex - 1];

      previous?.focus();
    }
  };

  return (
    <div
      className="fy-opening-modal-overlay"
      onMouseDown={(e) => {
        if (
          e.target === e.currentTarget
        ) {
          onClose();
        }
      }}
    >

      <div className="fy-opening-modal fy-opening-manual-modal">

        {/* HEADER */}

        <div className="fy-opening-modal-header">

          <h2>
            ADD NEW
          </h2>

                 <CloseButton
                   onClick={onClose}
                 />

        </div>


        {/* BODY */}

        <form
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          className="fy-opening-modal-body"
        >

          <div className="fy-opening-form-grid">

            {/* SESSION */}

            <div className="fy-opening-form-field">

              <label>
                SESSION
              </label>

              <select
                ref={firstInputRef}
                value={formData.session}
                onChange={(e) =>
                  handleFormChange(
                    "session",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Session
                </option>

                {sessions.map((session) => (
                  <option
                    key={session}
                    value={session}
                  >
                    {session}
                  </option>
                ))}

              </select>

              {errors.session && (
                <small className="fy-opening-error">
                  {errors.session}
                </small>
              )}

            </div>


            {/* BRANCH */}

            <div className="fy-opening-form-field">

              <label>
                BRANCH
              </label>

              <select
                value={formData.branch}
                onChange={(e) =>
                  handleFormChange(
                    "branch",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Branch
                </option>

                {branches.map((branch) => (
                  <option
                    key={branch}
                    value={branch}
                  >
                    {branch}
                  </option>
                ))}

              </select>

              {errors.branch && (
                <small className="fy-opening-error">
                  {errors.branch}
                </small>
              )}

            </div>

          </div>


          {/* LEDGER TITLE */}

          <div className="fy-opening-ledger-heading">
            BRANCH LEDGER
            <span>*</span>
          </div>


          {/* ERROR */}

          {errors.ledger && (
            <div className="fy-opening-form-error">
              {errors.ledger}
            </div>
          )}


          {/* LEDGER TABLE */}

          <div className="fy-opening-manual-table-wrapper">

            <table className="fy-opening-manual-table">

              <thead>

                <tr>
                  <th>SR.</th>
                  <th>LEDGER</th>
                  <th>GROUP</th>
                  <th>OPENING BALANCE</th>
                </tr>

              </thead>

              <tbody>

                {ledgerRows.map(
                  (row, index) => (

                    <tr key={row.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <strong>
                          {row.ledger}
                        </strong>
                      </td>

                      <td>
                        {row.group}
                      </td>

                      <td>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="Opening Balance"
                          value={
                            row.openingBalance
                          }
                          onChange={(e) =>
                            handleBalanceChange(
                              row.id,
                              e.target.value
                            )
                          }
                        />

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>


          {/* FOOTER */}

          <div className="fy-opening-modal-footer">

            <SaveButton
              text="CREATE"
              type="submit"
            />

            <CancelButton
              text="CANCEL"
              type="button"
              onClick={onClose}
            />

          </div>

        </form>

      </div>

    </div>
  );
};

export default FYOpeningBalanceManualForm;