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

const FYOpeningBalanceAutomaticForm = ({
  onClose,
  onCreate,
  sessions,
  branches,
}) => {
  const [formData, setFormData] = useState({
    previousSession: "",
    branch: "LASKARHAT",
    newSession: "",
  });

  const [errors, setErrors] = useState({});

  const previousSessionRef = useRef(null);

  /* =====================================================
     FOCUS
  ===================================================== */

  useEffect(() => {
    setTimeout(() => {
      previousSessionRef.current?.focus();
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
     VALIDATION
  ===================================================== */

  const validate = () => {
    const newErrors = {};

    if (!formData.previousSession) {
      newErrors.previousSession =
        "Previous session is required";
    }

    if (!formData.branch) {
      newErrors.branch =
        "Branch is required";
    }

    if (!formData.newSession) {
      newErrors.newSession =
        "New session is required";
    }

    if (
      formData.previousSession &&
      formData.newSession &&
      formData.previousSession ===
        formData.newSession
    ) {
      newErrors.newSession =
        "New session must be different";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  /* =====================================================
     CREATE
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }


    const automaticRecords = [
      {
        session: formData.newSession,
        branch: formData.branch,
        ledger: "AJAY",
        group: "CASH IN HAND",
        openingBalance: 0,
      },
      {
        session: formData.newSession,
        branch: formData.branch,
        ledger: "NEHA SINGH - INVESTOR",
        group: "CURRENT LIABILITY",
        openingBalance: 0,
      },
      {
        session: formData.newSession,
        branch: formData.branch,
        ledger: "MUKESH",
        group: "P C L",
        openingBalance: 0,
      },
      {
        session: formData.newSession,
        branch: formData.branch,
        ledger: "ASHISH",
        group: "LOAN (LIABILITY)",
        openingBalance: 0,
      },
    ];

    onCreate(automaticRecords);
  };

  /* =====================================================
     KEYBOARD NAVIGATION
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

      <div className="fy-opening-modal fy-opening-auto-modal">

        {/* HEADER */}

        <div className="fy-opening-modal-header">

          <h2>
            ADD NEW
          </h2>

        <CloseButton
            onClick={onClose}
          />

        </div>


        <form
          className="fy-opening-modal-body"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >

          <div className="fy-opening-form-grid">

            {/* PREVIOUS SESSION */}

            <div className="fy-opening-form-field">

              <label>
                PREVIOUS SESSION
              </label>

              <select
                ref={previousSessionRef}
                value={
                  formData.previousSession
                }
                onChange={(e) =>
                  handleChange(
                    "previousSession",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Previous Session
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

              {errors.previousSession && (
                <small className="fy-opening-error">
                  {errors.previousSession}
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


          {/* NEW SESSION */}

          <div className="fy-opening-form-field fy-opening-new-session-field">

            <label>
              NEW SESSION
            </label>

            <select
              value={formData.newSession}
              onChange={(e) =>
                handleChange(
                  "newSession",
                  e.target.value
                )
              }
            >

              <option value="">
                Select New Session
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

            {errors.newSession && (
              <small className="fy-opening-error">
                {errors.newSession}
              </small>
            )}

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

export default FYOpeningBalanceAutomaticForm;