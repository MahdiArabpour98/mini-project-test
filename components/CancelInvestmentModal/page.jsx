
"use client";

import { useState } from "react";
import "./CancelInvestmentModal.css";

export default function CancelInvestmentModal({
  isOpen = true,
  onClose,
  onConfirm,
  maxAmount,
  projectTitle = "پروژه سرمایه‌گذاری",
}) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  function handleSubmit(event) {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (amount.trim() === "" || !Number.isFinite(numericAmount)) {
      setError("لطفاً مبلغ موردنظر را وارد کنید.");
      return;
    }

    if (numericAmount < 1) {
      setError("حداقل مبلغ لغو سرمایه‌گذاری ۱ است.");
      return;
    }

    if (numericAmount > maxAmount) {
      setError(
        `حداکثر مبلغ قابل لغو ${maxAmount.toLocaleString("fa-IR")} است.`
      );
      return;
    }

    setError("");
    onConfirm(numericAmount);
    setAmount("");
  }

  return (
    <div
      className="cancel-investment-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="cancel-investment-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-investment-title"
      >
        <button
          type="button"
          className="cancel-investment-close"
          onClick={onClose}
          aria-label="بستن پنجره"
        >
          ×
        </button>

        <form onSubmit={handleSubmit}>
          <h2 id="cancel-investment-title">
            مبلغ سرمایه‌گذاری
          </h2>

          <p className="cancel-investment-project">
            {projectTitle}
          </p>

          <input
            className="cancel-investment-input"
            type="number"
            min="1"
            max={maxAmount}
            step="any"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              setError("");
            }}
            placeholder="مبلغ را وارد کنید"
            aria-label="مبلغ لغو سرمایه‌گذاری"
            autoFocus
          />

          <div className="cancel-investment-limits">
            <span>
              حداکثر = مبلغ سرمایه‌گذاری کاربر
            </span>

            <span>حداقل = ۱</span>
          </div>

          {error && (
            <p className="cancel-investment-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="cancel-investment-confirm"
          >
            تأیید
          </button>
        </form>
      </section>
    </div>
  );
}