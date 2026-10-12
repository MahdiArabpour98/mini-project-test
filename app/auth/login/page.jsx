"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import "./login.css";

export default function Login() {
  const [step, setStep] = useState(1);
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmitInfo = (e) => {
    e.preventDefault();
    setError("");

    if (!lastName.trim()) {
      setError("لطفاً نام خانوادگی را وارد کنید.");
      return;
    }

    if (!/^09\d{9}$/.test(phone)) {
      setError("شماره همراه باید ۱۱ رقم و با 09 شروع شود.");
      return;
    }

    // در این مرحله باید درخواست ارسال پیامک به بک‌اند ارسال شود.
    setStep(2);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{6}$/.test(code)) {
      setError("کد تأیید باید ۶ رقم باشد.");
      return;
    }

    // اینجا کد باید از طریق API اعتبارسنجی شود.
    setError("برای ورود نهایی، اتصال به API تأیید کد لازم است.");
  };

  return (
    <main className="login-page" dir="rtl">
      <div className="login-card">
        {/* بخش معرفی سامانه */}
        <section className="login-intro">
          <div className="intro-content">
            <div className="brand">
              <div className="brand-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="brand-svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21V11m0 5C5 16 4 10 4 5
                    c6 0 10 2 8 11Zm0-2c0-6 4-9 8-9
                    0 5-2 10-8 10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <h1 className="brand-title">Investly</h1>
                <p className="brand-subtitle">سامانه هوشمند سرمایه‌گذاری</p>
              </div>
            </div>

            <div className="intro-message">
              <p className="intro-label">آینده مالی شما</p>

              <h2 className="intro-title">
                یک قدم تا
                <br />
                شروع سرمایه‌گذاری
              </h2>

              <p className="intro-description">با حساب کاربری خود وارد شوید و فرصت‌های سرمایه‌گذاری را دنبال کنید.</p>
            </div>
          </div>

          <div className="intro-decoration decoration-one" />
          <div className="intro-decoration decoration-two" />

          <p className="intro-footer">سرمایه‌گذاری آگاهانه، آینده‌ای روشن‌تر</p>
        </section>

        {/* بخش فرم ورود */}
        <section className="login-form-section">
          <div className="form-heading">
            <p className="form-label">{step === 1 ? "ورود / ثبت‌نام" : "تأیید شماره همراه"}</p>

            <h2 className="form-title">{step === 1 ? "به حساب خود وارد شوید" : "کد تأیید را وارد کنید"}</h2>

            <p className="form-description">
              {step === 1
                ? "نام خانوادگی و شماره همراه خود را وارد کنید."
                : `کد ارسال‌شده به شماره ${phone} را وارد کنید.`}
            </p>
          </div>

          <div className="step-progress" aria-label={`مرحله ${step} از ۲`}>
            <div className="progress-track">
              <div className="progress-fill" />
            </div>

            <div className="progress-track">
              <div className={`progress-fill ${step === 2 ? "progress-active" : ""}`} />
            </div>
          </div>

          {step === 1 ? (
            // <form onSubmit={handleSubmitInfo} className="login-form">
            //   <div className="form-group">
            //     <label htmlFor="lastName" className="input-label">
            //       نام خانوادگی
            //     </label>

            //     <input
            //       id="lastName"
            //       type="text"
            //       autoComplete="family-name"
            //       value={lastName}
            //       onChange={(e) => setLastName(e.target.value)}
            //       placeholder="نام خانوادگی خود را وارد کنید"
            //       className="login-input"
            //     />
            //   </div>

            //   <div className="form-group">
            //     <label htmlFor="phone" className="input-label">
            //       شماره همراه
            //     </label>

            //     <input
            //       id="phone"
            //       type="tel"
            //       inputMode="numeric"
            //       autoComplete="tel-national"
            //       maxLength={11}
            //       value={phone}
            //       onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
            //       placeholder="09123456789"
            //       className="login-input phone-input"
            //       dir="ltr"
            //     />
            //   </div>

            //   {error && (
            //     <p role="alert" className="login-error">
            //       {error}
            //     </p>
            //   )}

            //   <button type="submit" className="login-button">
            //     دریافت کد تأیید
            //     <span aria-hidden="true">←</span>
            //   </button>
            // </form>
            <></>
          ) : (
            // <form onSubmit={handleVerifyCode} className="login-form">
            //   <div className="form-group">
            //     <label htmlFor="code" className="input-label">
            //       کد تأیید شش‌رقمی
            //     </label>

            //     <input
            //       id="code"
            //       type="text"
            //       inputMode="numeric"
            //       autoComplete="one-time-code"
            //       maxLength={6}
            //       value={code}
            //       onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            //       placeholder="------"
            //       className="login-input verification-input"
            //       dir="ltr"
            //     />
            //   </div>

            //   {error && (
            //     <p role="alert" className="login-error">
            //       {error}
            //     </p>
            //   )}

            //   <button type="submit" className="login-button">
            //     تأیید و ادامه
            //   </button>

            //   <button
            //     type="button"
            //     onClick={() => {
            //       setStep(1);
            //       setCode("");
            //       setError("");
            //     }}
            //     className="back-button"
            //   >
            //     بازگشت و ویرایش اطلاعات
            //   </button>
            // </form>
            <></>
          )}

          <div className="security-note">
            <span aria-hidden="true">🔒</span>
            <span>حفظ امنیت اطلاعات شما اولویت ماست.</span>
          </div>
        </section>
      </div>
    </main>
  );
}
