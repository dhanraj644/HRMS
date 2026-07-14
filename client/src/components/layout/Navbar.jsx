import { FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8">

      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">

        <FaBell className="text-xl cursor-pointer" />

        <div className="flex items-center gap-2">

          <FaUserCircle className="text-3xl" />

          <div>
            <p className="font-semibold">Dhanraj</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;