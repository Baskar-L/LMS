import Sidebar from "./Sidebar";
import Header from "./Header";

const AppLayout = ({
  children,
}) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64">
        <Header />

        <main className="p-5">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;