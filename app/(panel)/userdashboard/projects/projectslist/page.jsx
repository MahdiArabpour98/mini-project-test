"use client";

import { useState } from "react";
import Link from "next/link";

import "./projects.css";
import "../my-projects/myprojects.css";

const initialProjects = [
  {
    id: 1,
    title: "پنل خورشیدی",
    category: "انرژی‌های تجدیدپذیر",
    credit: 100,
    duration: "۲ ماه",
    status: "نیاز به بررسی",
    invested: false,
  },
];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState(initialProjects);

  const filteredProjects = projects.filter((project) =>
    `${project.title} ${project.category}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );

  function toggleInvestment(id) {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === id
          ? { ...project, invested: !project.invested }
          : project,
      ),
    );
  }

  return (
    <main className="projects-main">
      <div className="projects-heading">
        <div>
          <span className="projects-eyebrow">فرصت‌های سرمایه‌گذاری</span>

          <h1>همه پروژه‌ها</h1>

          <p>پروژه‌ها را بررسی کنید و فرصت مناسب خود را پیدا کنید.</p>
        </div>

        <label className="projects-search">
          <span aria-hidden="true">⌕</span>

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="جست‌وجوی پروژه..."
            aria-label="جست‌وجوی پروژه‌ها"
          />
        </label>
      </div>

      <section className="projects-panel">
        <div className="panel-heading">
          <div>
            <h2>فهرست پروژه‌ها</h2>
            <p>{filteredProjects.length.toLocaleString("fa-IR")} پروژه موجود</p>
          </div>
        </div>

        <div className="projects-table-wrapper">
          <table className="projects-table">
            <thead>
              <tr>
                <th>عنوان</th>
                <th>اعتبار</th>
                <th>مدت اجرا</th>
                <th>وضعیت طرح</th>
                <th>عملیات</th>
              </tr>
            </thead>

            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className="project-name">
                      <span className="project-icon">
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
                    <span className="project-status">
                      <span className="status-dot" />
                      {project.status}
                    </span>
                  </td>

                  <td>
                    <div className="project-actions">
                      <button
                        type="button"
                        className="invest-button"
                        onClick={() => toggleInvestment(project.id)}
                        disabled={project.invested}
                      >
                        {project.invested ? "سرمایه‌گذاری شد" : "سرمایه‌گذاری"}
                      </button>

                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => toggleInvestment(project.id)}
                        disabled={!project.invested}
                      >
                        لغو سرمایه‌گذاری
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-projects">
                    پروژه‌ای با این عنوان پیدا نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="panel-footer">
          <span>فهرست فرصت‌های سرمایه‌گذاری</span>
          <span>اطلاعات فعلی نمونه هستند.</span>
        </div>
      </section>
    </main>
  );
}
