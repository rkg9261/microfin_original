import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { FaTrash } from "react-icons/fa";
import { CloseButton } from "../buttons";
import "../buttons/Button.css";
import "./ConfirmModal.css";

const ConfirmContext = createContext(null);

export const ConfirmModal = ({
  open,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this record?",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return createPortal(
    <div className="confirm-modal" role="dialog" aria-modal="true">
      <div className="confirm-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-modal-header">
          <h2>{title}</h2>
          <CloseButton onClick={onCancel} />
        </div>

        <div className="confirm-modal-body">
          <p>{message}</p>
        </div>

        <div className="confirm-modal-actions">
          <button type="button" className="btn btn-cancel-muted" onClick={onCancel}>
            {cancelText}
          </button>
          <button type="button" className="btn btn-delete" onClick={onConfirm}>
            <FaTrash />
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const ConfirmProvider = ({ children }) => {
  const [request, setRequest] = useState(null);

  const confirm = useCallback((options = {}) => {
    return new Promise((resolve) => {
      setRequest({
        title: options.title || "Confirm Delete",
        message:
          options.message || "Are you sure you want to delete this record?",
        confirmText: options.confirmText || "Delete",
        cancelText: options.cancelText || "Cancel",
        resolve,
      });
    });
  }, []);

  const close = useCallback((result) => {
    setRequest((current) => {
      current?.resolve(result);
      return null;
    });
  }, []);

  const value = useMemo(() => confirm, [confirm]);

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <ConfirmModal
        open={Boolean(request)}
        title={request?.title}
        message={request?.message}
        confirmText={request?.confirmText}
        cancelText={request?.cancelText}
        onConfirm={() => close(true)}
        onCancel={() => close(false)}
      />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const confirm = useContext(ConfirmContext);
  if (!confirm) {
    throw new Error("useConfirm must be used inside ConfirmProvider");
  }
  return confirm;
};
