
"use client";

import { useEffect, useState } from "react";
import "./InvestmentModal.css";

export default function InvestmentModal({
  isOpen = true,
  onClose,
  onConfirm,
  minAmount = 10,
  maxAmount = 1000,
  projectTitle = "پروژه سرمایه‌گذاری",
}) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setAmount("");
      setError("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleSubmit(event) {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (amount.trim() === "" || !Number.isFinite(numericAmount)) {
      setError("لطفاً مبلغ سرمایه‌گذاری را وارد کنید.");
      return;
    }

    if (numericAmount < minAmount) {
      setError(`حداقل مبلغ سرمایه‌گذاری ${minAmount} دلار است.`);
      return;
    }

    if (numericAmount > maxAmount) {
      setError(`حداکثر مبلغ سرمایه‌گذاری ${maxAmount} دلار است.`);
      return;
    }

    setError("");
    onConfirm(numericAmount);
  }

  return (
    <div
      className="investment-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="investment-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="investment-modal-title"
      >
        <button
          type="button"
          className="investment-modal-close"
          onClick={onClose}
          aria-label="بستن پنجره"
        >
          ×
        </button>

        <form onSubmit={handleSubmit}>
          <h2 id="investment-modal-title">مبلغ</h2>

          <p className="investment-project-title">{projectTitle}</p>

          <label
            className="investment-amount-label"
            htmlFor="investment-amount"
          >
            مبلغ سرمایه‌گذاری (دلار)
          </label>

          <input
            id="investment-amount"
            className="investment-amount-input"
            type="number"
            min={minAmount}
            max={maxAmount}
            step="any"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              setError("");
            }}
            placeholder="مبلغ را وارد کنید"
            autoFocus
          />

          <div className="investment-limits">
            <span>حداکثر: {maxAmount.toLocaleString("fa-IR")}</span>
            <span>حداقل: {minAmount.toLocaleString("fa-IR")}</span>
          </div>

          {error && (
            <p className="investment-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="investment-confirm-button"
          >
            تأیید
          </button>
        </form>
      </section>
    </div>
  );
}