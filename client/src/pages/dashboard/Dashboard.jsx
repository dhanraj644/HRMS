import {
  Users,
  UserCheck,
  UserX,
  CalendarClock,
  Wallet,
  Building2,
} from "lucide-react";

const cards = [
  {
    title: "Total Employees",
    value: "150",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Present Today",
    value: "138",
    icon: UserCheck,
    color: "bg-green-500",
  },
  {
    title: "Absent Today",
    value: "12",
    icon: UserX,
    color: "bg-red-500",
  },
  {
    title: "Pending Leaves",
    value: "5",
    icon: CalendarClock,
    color: "bg-yellow-500",
  },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-slate-100 min-h-screen">

      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
        <p className="text-gray-500">
          Here's what's happening today.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>

                </div>

                <div
                  className={`w-14 h-14 rounded-full ${card.color} flex items-center justify-center`}
                >
                  <Icon className="text-white" size={28} />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        {/* Recent Employees */}

        <div className="bg-white rounded-xl shadow p-5">

          <h2 className="text-xl font-semibold mb-5">
            Recent Employees
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-2">Name</th>

                <th className="text-left py-2">Department</th>

                <th className="text-left py-2">Status</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="py-3">Rahul Sharma</td>

                <td>IT</td>

                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                </td>

              </tr>

              <tr className="border-b">

                <td className="py-3">Priya Patel</td>

                <td>HR</td>

                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                </td>

              </tr>

              <tr>

                <td className="py-3">Amit Kumar</td>

                <td>Finance</td>

                <td>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    Inactive
                  </span>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* Quick Actions */}

        <div className="bg-white rounded-xl shadow p-5">

          <h2 className="text-xl font-semibold mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <button className="bg-blue-600 text-white rounded-lg p-4 hover:bg-blue-700 transition">
              <Users className="mx-auto mb-2" />
              Add Employee
            </button>

            <button className="bg-green-600 text-white rounded-lg p-4 hover:bg-green-700 transition">
              <Building2 className="mx-auto mb-2" />
              Add Department
            </button>

            <button className="bg-yellow-500 text-white rounded-lg p-4 hover:bg-yellow-600 transition">
              <CalendarClock className="mx-auto mb-2" />
              Leave Requests
            </button>

            <button className="bg-purple-600 text-white rounded-lg p-4 hover:bg-purple-700 transition">
              <Wallet className="mx-auto mb-2" />
              Payroll
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;