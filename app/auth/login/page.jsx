"use client";

import { useState } from "react";
import PhoneNumber from "../components/phone-number";
import VerifyCode from "../components/verify-code";
import "./login.css";

export default function Login() {
  const [userData, setUserData] = useState({
    phoneNumber: "",
    fullName: "",
    code: "",
    token: "",
  });
  const [step, setStep] = useState(1);

  const handleChangeStep = (step = 1, values = {}) => {
    console.log("values", values);
    setUserData((prev) => ({ ...prev, ...values }));
    setStep(step);
  };

  console.log("userData", userData);

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
                : `کد ارسال‌شده به شماره ${"phone"} را وارد کنید.`}
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
            <PhoneNumber userData={userData} handleChangeStep={handleChangeStep} />
          ) : (
            <VerifyCode userData={userData} handleChangeStep={handleChangeStep} />
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
