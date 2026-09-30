import { FiBell, FiSearch, FiMenu } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="navbar bg-white border-bottom px-3 px-md-4 py-3 sticky-top">
      <div className="container-fluid p-0">

        {/* Mobile menu button */}
        <button
          className="btn btn-light d-lg-none me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
        >
          <FiMenu size={20} />
        </button>

        {/* Search */}
        <div className="input-group d-none d-md-flex" style={{ maxWidth: "350px" }}>
          <span className="input-group-text bg-light border-0">
            <FiSearch />
          </span>

          <input
            type="text"
            className="form-control bg-light border-0"
            placeholder="Search..."
          />
        </div>

        <div className="ms-auto d-flex align-items-center gap-3">

          {/* Notification */}
          <button className="btn btn-light rounded-circle position-relative">
            <FiBell size={19} />

            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "9px" }}
            >
              3
            </span>
          </button>

          {/* User */}
          <div className="d-flex align-items-center gap-2">

            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-semibold"
              style={{
                width: "40px",
                height: "40px",
              }}
            >
              U
            </div>

            <div className="d-none d-md-block">
              <div className="fw-semibold small">User Name</div>
              <div className="text-muted" style={{ fontSize: "12px" }}>
                Account
              </div>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;