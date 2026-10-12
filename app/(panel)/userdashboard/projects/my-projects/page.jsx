"use client";

import { useState } from "react";
import Link from "next/link";

import "./myprojects.css";

const projectsData = [
  {
    id: 1,
    title: "پنل خورشیدی",
    category: "انرژی‌های تجدیدپذیر",
    credit: 100,
    duration: "۲ ماه",
    status: "نیاز به بررسی",
    collected: 10,
  },
];

export default function MyProjectsPage() {
  const [search, setSearch] = useState("");

  const projects = projectsData.filter((project) =>
    `${project.title} ${project.category}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );

  return (
    <main className="myprojects-main">
      <div className="myprojects-heading">
        <div>
          <span className="myprojects-eyebrow">فضای کاربری اینوستلی</span>
          <h1>پروژه‌های من</h1>
          <p>پروژه‌های ثبت‌شده خود را مدیریت و بررسی کنید.</p>
        </div>

        <Link
          href="my-projects/create-project"
          className="myprojects-new-button"
        >
          <span aria-hidden="true">＋</span>
          پروژه جدید
        </Link>
      </div>

      <section className="myprojects-panel">
        <div className="myprojects-toolbar">
          <div>
            <h2>فهرست پروژه‌ها</h2>
            <p>{projects.length.toLocaleString("fa-IR")} پروژه</p>
          </div>

          <label className="myprojects-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="جست‌وجوی پروژه..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="جست‌وجوی پروژه‌ها"
            />
          </label>
        </div>

        <div className="myprojects-table-wrapper">
          <table className="myprojects-table">
            <thead>
              <tr>
                <th>عنوان</th>
                <th>اعتبار</th>
                <th>مدت اجرا</th>
                <th>وضعیت طرح</th>
                <th>مبلغ جمع‌آوری‌شده</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className="myprojects-project-name">
                      <span className="myprojects-project-icon">
                        {project.title.slice(0, 1)}
                      </span>
                      <div>
                        <strong>{project.title}</strong>
                        <small>{project.category}</small>
                      </div>
                    </div>
                  </td>

                  <td>{project.credit.toLocaleString("fa-IR")}$</td>
                  <td>{project.duration}</td>

                  <td>
                    <span className="myprojects-status">
                      <span className="myprojects-status-dot" />
                      {project.status}
                    </span>
                  </td>

                  <td>
                    <div className="myprojects-collected">
                      <span>{project.collected.toLocaleString("fa-IR")}$</span>
                      <div className="myprojects-progress">
                        <span
                          style={{
                            width: `${Math.min(
                              (project.collected / project.credit) * 100,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="myprojects-empty">
                    پروژه‌ای با این عنوان پیدا نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="myprojects-footer">
          <span>فهرست پروژه‌های شما</span>
          <span>اطلاعات فعلی نمونه هستند.</span>
        </div>
      </section>
    </main>
  );
}
