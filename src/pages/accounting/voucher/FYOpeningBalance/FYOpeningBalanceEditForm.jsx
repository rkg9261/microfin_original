import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  CancelButton,
  SaveButton,
} from "../../../../components/buttons";
import CloseButton from "../../../../components/buttons/CloseButton";
const FYOpeningBalanceEditForm = ({
  record,
  onClose,
  onUpdate,
  sessions,
  branches,
}) => {
  const [formData, setFormData] = useState({
    session: record.session || "",
    branch: record.branch || "",
    openingBalance:
      record.openingBalance ?? "",
  });

  const [errors, setErrors] = useState({});

  const sessionRef = useRef(null);

  /* =====================================================
     FOCUS
  ===================================================== */

  useEffect(() => {
    setTimeout(() => {
      sessionRef.current?.focus();
    }, 100);
  }, []);

  /* =====================================================
     CHANGE
  ===================================================== */

  const handleChange = (
    name,
    value
  ) => {
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
     VALIDATE
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

    if (
      formData.openingBalance === "" ||
      formData.openingBalance === null
    ) {
      newErrors.openingBalance =
        "Opening balance is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  /* =====================================================
     UPDATE
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onUpdate({
      ...record,
      session: formData.session,
      branch: formData.branch,
      openingBalance:
        Number(formData.openingBalance) || 0,
    });
  };

  /* =====================================================
     KEYBOARD
  ===================================================== */

  const handleKeyDown = (e) => {
    const elements = Array.from(
      e.currentTarget.querySelectorAll(
        "select, input, button"
      )
    );

    const index =
      elements.indexOf(
        document.activeElement
      );

    if (index === -1) {
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      elements[index + 1]?.focus();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      elements[index - 1]?.focus();
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

      <div className="fy-opening-modal fy-opening-edit-modal">

        {/* HEADER */}

        <div className="fy-opening-modal-header">

          <h2>
            UPDATE
          </h2>

         <CloseButton
            onClick={onClose}
          />

        </div>


        {/* FORM */}

        <form
          className="fy-opening-modal-body"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >

          <div className="fy-opening-form-grid">

            {/* SESSION */}

            <div className="fy-opening-form-field">

              <label>
                SESSION
              </label>

              <select
                ref={sessionRef}
                value={formData.session}
                onChange={(e) =>
                  handleChange(
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
                  handleChange(
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


          {/* LEDGER */}

          <div className="fy-opening-edit-ledger">

            <div className="fy-opening-edit-ledger-name">

              <span>
                LEDGER
              </span>

              <strong>
                {record.ledger}
              </strong>

            </div>

            <div className="fy-opening-edit-group">

              <span>
                GROUP
              </span>

              <strong>
                {record.group}
              </strong>

            </div>

          </div>


          {/* BALANCE */}

          <div className="fy-opening-form-field">

            <label>
              OPENING BALANCE
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={
                formData.openingBalance
              }
              onChange={(e) =>
                handleChange(
                  "openingBalance",
                  e.target.value
                )
              }
            />

            {errors.openingBalance && (
              <small className="fy-opening-error">
                {errors.openingBalance}
              </small>
            )}

          </div>


          {/* FOOTER */}

          <div className="fy-opening-modal-footer">

            <SaveButton
              text="UPDATE"
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

export default FYOpeningBalanceEditForm;