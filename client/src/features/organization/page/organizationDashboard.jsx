import {
  FiUsers,
  FiBookOpen,
  FiUserCheck,
  FiArrowRight,
  FiPlus,
} from "react-icons/fi";

const OrganizationDashboard = () => {
  const stats = [
    {
      title: "Total Teachers",
      value: "12",
      icon: <FiUsers size={22} />,
      link: "View Teachers",
    },
    {
      title: "Total Classes",
      value: "8",
      icon: <FiBookOpen size={22} />,
      link: "View Classes",
    },
    {
      title: "Total Students",
      value: "240",
      icon: <FiUserCheck size={22} />,
      link: "View Students",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Good morning 👋</h2>

          <p className="text-muted mb-0">
            Here's what's happening in your organization today.
          </p>
        </div>

        <button className="btn btn-primary rounded-3 mt-3 mt-md-0">
          <FiPlus className="me-2" />
          Add Teacher
        </button>
      </div>

      {/* Statistics */}
      <div className="row g-4 mb-4">
        {stats.map((stat) => (
          <div className="col-12 col-md-6 col-xl-4" key={stat.title}>
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-2">{stat.title}</p>

                    <h2 className="fw-bold mb-3">{stat.value}</h2>

                    <button className="btn btn-link text-primary p-0 text-decoration-none">
                      {stat.link}
                      <FiArrowRight className="ms-2" />
                    </button>
                  </div>

                  <div
                    className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="fw-bold mb-1">Recent Activity</h5>

              <p className="text-muted mb-0 small">
                Recent activity in your organization
              </p>
            </div>
          </div>

          <div className="list-group list-group-flush">
            <div className="list-group-item px-0 py-3 border-0">
              <div className="d-flex gap-3">
                <div
                  className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    minWidth: "42px",
                  }}
                >
                  <FiUsers />
                </div>

                <div>
                  <div className="fw-semibold">New teacher added</div>

                  <small className="text-muted">
                    A new teacher joined your organization.
                  </small>
                </div>
              </div>
            </div>

            <div className="list-group-item px-0 py-3 border-0">
              <div className="d-flex gap-3">
                <div
                  className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    minWidth: "42px",
                  }}
                >
                  <FiBookOpen />
                </div>

                <div>
                  <div className="fw-semibold">New class created</div>

                  <small className="text-muted">
                    A new class was created and assigned to a teacher.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
