"use client";
import { useState } from "react";
import "../projects/my-projects/myprojects.css";
import "../projects/projectslist/projects.css";

export default function ManagementUsers() {
  const [search, setSearch] = useState("");
  const users = [
    {
      id: 1,
      first_name: "somaye",
      last_name: "karimi",
      state: "َActive",
      value_wallet: 0,
    },
  ];
  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="projects-main">
      <div className="projects-heading">
        <div>
          <h1>همه کاربران</h1>

          <p>پروژه‌ها را بررسی کنید و فرصت مناسب خود را پیدا کنید.</p>
        </div>

        <label className="projects-search">
          <span aria-hidden="true">⌕</span>

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="جست‌وجوی کاربران..."
            aria-label="جست‌وجوی کاربران"
          />
        </label>
      </div>

      <section className="projects-panel">
        <div className="panel-heading">
          <div>
            <h2>فهرست کاربران</h2>
            <p>{filteredUsers.length.toLocaleString("fa-IR")} کاربر موجود</p>
          </div>
        </div>

        <div className="projects-table-wrapper">
          <table className="projects-table">
            <thead>
              <tr>
                <th> نام و نام خانوادگی </th>
                <th>مقدار کیف پول</th>

                <th>وضعیت کاربر</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="project-name">
                      <span className="project-icon">
                        {user.first_name} {user.last_name}
                      </span>

                      <div></div>
                    </div>
                  </td>

                  <td>{user.value_wallet.toLocaleString("fa-IR")}$</td>

                  <td>
                    <span className="project-status">
                      <span className="status-dot" />
                      {user.state}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-projects">
                    کاربری با این عنوان پیدا نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
