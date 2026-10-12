import Header from "@/components/Header";
import Aside from "@/components/Aside";

export default function ProjectLayout({ children }) {
  return (
    <div className="myprojects-page" dir="rtl">
      <Header />

      <div className="myprojects-layout">
        <Aside isShow={true} />

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
