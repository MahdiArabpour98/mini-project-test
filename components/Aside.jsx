import Link from "next/link";

export default function Aside(props) {
  return (
    <aside className="myprojects-sidebar">
      <h2 className="myprojects-sidebar-title">
        {" "}
        {props.isShow ? " panel management" : " panel user"}
      </h2>

      <nav className="myprojects-nav">
        <Link
          href={
            props.isShow
              ? "/management/projects/projectslist"
              : "/userdashboard/projects/projectslist"
          }
          className="myprojects-nav-link"
        >
          همه پروژه‌ها
        </Link>
        <Link
          href={
            props.isShow
              ? "/management/projects/my-projects"
              : "/userdashboard/projects/my-projects"
          }
          className="myprojects-nav-link active"
          aria-current="page"
        >
          پروژه‌های من
        </Link>
        {props.isShow && (
          <Link
            href="/management/management-user"
            className="myprojects-nav-link active"
            aria-current="page"
          >
            مدیریت کاربران
          </Link>
        )}
      </nav>
    </aside>
  );
}
