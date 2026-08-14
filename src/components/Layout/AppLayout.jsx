import Sidebar from "./Sidebar";
import Header from "./Header";

const AppLayout = ({
  children,
}) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />

      <div
        className="
          lg:ml-64
          min-h-screen
        "
      >
        <Header />

        <main
          className="
            p-4
            md:p-5
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;