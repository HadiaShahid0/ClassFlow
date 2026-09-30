import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBookOpen,
  FiClipboard,
  FiHelpCircle,
  FiBarChart2,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const SidebarContent = ({ onNavigate }) => {
  // Temporary role.
  // Later we will get this from the authenticated user.
  const role = "organization";

  const organizationLinks = [
    {
      name: "Dashboard",
      path: "/organization",
      icon: <FiHome />,
    },
    {
      name: "Teachers",
      path: "/organization/teachers",
      icon: <FiUsers />,
    },
    {
      name: "Classes",
      path: "/organization/classes",
      icon: <FiBookOpen />,
    },
  ];

  const teacherLinks = [
    {
      name: "Dashboard",
      path: "/teacher",
      icon: <FiHome />,
    },
    {
      name: "Students",
      path: "/teacher/students",
      icon: <FiUsers />,
    },
    {
      name: "Assignments",
      path: "/teacher/assignments",
      icon: <FiClipboard />,
    },
    {
      name: "Quizzes",
      path: "/teacher/quizzes",
      icon: <FiHelpCircle />,
    },
    {
      name: "Results",
      path: "/teacher/results",
      icon: <FiBarChart2 />,
    },
  ];

  const studentLinks = [
    {
      name: "Dashboard",
      path: "/student",
      icon: <FiHome />,
    },
    {
      name: "My Class",
      path: "/student/class",
      icon: <FiBookOpen />,
    },
    {
      name: "My Teacher",
      path: "/student/teacher",
      icon: <FiUser />,
    },
    {
      name: "Assignments",
      path: "/student/assignments",
      icon: <FiClipboard />,
    },
    {
      name: "Quizzes",
      path: "/student/quizzes",
      icon: <FiHelpCircle />,
    },
    {
      name: "Results",
      path: "/student/results",
      icon: <FiBarChart2 />,
    },
  ];

  let links = [];

  if (role === "organization") {
    links = organizationLinks;
  }

  if (role === "teacher") {
    links = teacherLinks;
  }

  if (role === "student") {
    links = studentLinks;
  }

  return (
    <div className="d-flex flex-column h-100">

      {/* Logo */}
      <div className="px-4 py-4 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <div
            className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center"
            style={{
              width: "40px",
              height: "40px",
            }}
          >
            <FiBookOpen size={21} />
          </div>

          <div>
            <h5 className="mb-0 fw-bold">ClassFlow</h5>
            <small className="text-muted">Education Portal</small>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-3 flex-grow-1">

        <small className="text-uppercase text-muted fw-semibold px-3">
          Main Menu
        </small>

        <div className="mt-3">

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onNavigate}
              end={link.path === `/${role}`}
              className={({ isActive }) =>
                `d-flex align-items-center gap-3 text-decoration-none px-3 py-3 rounded-3 mb-1 ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-dark"
                }`
              }
            >
              <span className="d-flex align-items-center">
                {link.icon}
              </span>

              <span className="fw-medium">
                {link.name}
              </span>
            </NavLink>
          ))}

        </div>
      </div>

      {/* Bottom */}
      <div className="p-3 border-top">

        <NavLink
          to="/settings"
          onClick={onNavigate}
          className="d-flex align-items-center gap-3 text-dark text-decoration-none px-3 py-3 rounded-3"
        >
          <FiSettings />
          <span className="fw-medium">Settings</span>
        </NavLink>

        <button
          className="btn btn-light w-100 d-flex align-items-center gap-3 px-3 py-3 mt-1"
        >
          <FiLogOut />
          <span className="fw-medium">Logout</span>
        </button>

      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="bg-white border-end d-none d-lg-block"
        style={{
          width: "260px",
          minWidth: "260px",
        }}
      >
        <div
          className="position-sticky top-0"
          style={{ height: "100vh" }}
        >
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileSidebar"
        style={{ width: "280px" }}
      >
        <div className="offcanvas-body p-0">
          <SidebarContent
            onNavigate={() => {
              const element = document.getElementById("mobileSidebar");

              if (element) {
                const offcanvas =
                  window.bootstrap?.Offcanvas.getInstance(element);

                offcanvas?.hide();
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;