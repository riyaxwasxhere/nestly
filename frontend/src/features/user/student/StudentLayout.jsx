import Navbar from "./Navbar";
import Header from "./Header";
import Dashboard from "./Dashboard";

function StudentLayout() {
  return (
    <div className="bg-[#0E0A07] text-white flex ">
      <div className="flex h-screen overflow-hidden">
        <Navbar />
      </div>
      <div className="flex-1 h-screen overflow-hidden">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
}

export default StudentLayout;
