import "./create-project.css";
import "../myprojects.css";
export default function ProjectForm() {
  return (
    <div className="" style={{ padding: "3rem" }}>
      <h1
        style={{
          "font-size": "32px",
          "font-weight": "bold",
          "margin-bottom": "2rem",
        }}
      >
        ایجاد پروژه جدید
      </h1>
      <form className="form-content">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">عنوان</label>
            <input
              id="title"
              type="text"
              placeholder="عنوان پروژه را وارد کنید"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">مبلغ مورد نیاز</label>
            <input id="amount" type="number" placeholder="مبلغ به تومان" />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="duration">مدت زمان</label>
            <input
              id="duration"
              type="text"
              placeholder="مدت زمان را وارد کنید"
            />
          </div>

          <div className="form-group">
            <label htmlFor="investment">مبلغ سرمایه‌گذاری</label>
            <input id="investment" type="number" placeholder="مبلغ به تومان" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="summary">بارگذاری فایل</label>
          <input id="summary" type="file" />
        </div>

        <div className="form-group">
          <label htmlFor="description">توضیحات</label>
          <textarea
            id="description"
            rows={3}
            placeholder="توضیحات تکمیلی را وارد کنید"
          />
        </div>

        <button type="submit" className="submit-button">
          <span>ثبت پروژه</span>
          <span aria-hidden="true">➤</span>
        </button>
      </form>
    </div>
  );
}
