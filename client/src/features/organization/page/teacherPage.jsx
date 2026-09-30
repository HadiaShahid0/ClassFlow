import { useEffect, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiUser,
  FiBookOpen,
  FiMail,
  FiPhone,
  FiTrash2,
  FiEdit,
} from "react-icons/fi";

import { getTeachers, createTeacher } from "../services/organizationServices";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    qualification: "",
    subject: "",
    phone: "",
  });

  const fetchTeachers = async () => {
  try {
    console.log("1. Fetching teachers...");

    setLoading(true);
    setError("");

    const data = await getTeachers();

    console.log("2. Teachers received:", data);
    console.log("3. Is array:", Array.isArray(data));

    setTeachers(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("4. Fetch teachers error:", error);

    setError(error.message);
    setTeachers([]);
  } finally {
    console.log("5. Fetch teachers finished");

    setLoading(false);
  }
};
useEffect(() => {
  console.log("useEffect is running");
  fetchTeachers();
}, []);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateTeacher = async (event) => {
    event.preventDefault();

    try {
      setCreating(true);
      setError("");
      setSuccess("");

      await createTeacher(formData);

      setSuccess("Teacher created successfully.");

      setFormData({
        name: "",
        email: "",
        password: "",
        qualification: "",
        subject: "",
        phone: "",
      });

      setShowModal(false);

      await fetchTeachers();
    } catch (error) {
      setError(error.message);
    } finally {
      setCreating(false);
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const user = teacher.user;

    const searchText = search.toLowerCase();

    return (
      user?.name?.toLowerCase().includes(searchText) ||
      user?.email?.toLowerCase().includes(searchText) ||
      teacher.subject?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Teachers</h2>

          <p className="text-muted mb-0">
            Manage teachers in your organization.
          </p>
        </div>

        <button
          className="btn btn-primary rounded-3 mt-3 mt-md-0"
          onClick={() => {
            setError("");
            setSuccess("");
            setShowModal(true);
          }}
        >
          <FiPlus className="me-2" />
          Add Teacher
        </button>
      </div>

      {/* Success */}
      {success && (
        <div className="alert alert-success border-0 rounded-3">{success}</div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-danger border-0 rounded-3">{error}</div>
      )}

      {/* Search */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-3">
          <div className="input-group">
            <span className="input-group-text bg-light border-0">
              <FiSearch />
            </span>

            <input
              type="text"
              className="form-control bg-light border-0"
              placeholder="Search teachers by name, email or subject..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" />
        </div>
      )}

      {/* Empty */}
      {!loading && filteredTeachers.length === 0 && (
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body text-center py-5">
            <FiUser size={40} className="text-muted mb-3" />

            <h5 className="fw-bold">No teachers found</h5>

            <p className="text-muted mb-0">
              Add a teacher to your organization to get started.
            </p>
          </div>
        </div>
      )}

      {/* Teachers */}
      {!loading && filteredTeachers.length > 0 && (
        <div className="row g-4">
          {filteredTeachers.map((teacher) => {
            const user = teacher.user;

            return (
              <div className="col-12 col-md-6 col-xl-4" key={teacher.id}>
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body p-4">
                    {/* Profile */}
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                        style={{
                          width: "55px",
                          height: "55px",
                        }}
                      >
                        <FiUser size={24} />
                      </div>

                      <div>
                        <h5 className="fw-bold mb-1">{user?.name}</h5>

                        <span className="badge bg-primary-subtle text-primary">
                          Teacher
                        </span>
                      </div>
                    </div>

                    {/* Information */}
                    <div className="mb-3">
                      <div className="d-flex align-items-center gap-2 text-muted mb-2">
                        <FiMail />
                        <span>{user?.email}</span>
                      </div>

                      {teacher.subject && (
                        <div className="d-flex align-items-center gap-2 text-muted mb-2">
                          <FiBookOpen />
                          <span>{teacher.subject}</span>
                        </div>
                      )}

                      {teacher.phone && (
                        <div className="d-flex align-items-center gap-2 text-muted">
                          <FiPhone />
                          <span>{teacher.phone}</span>
                        </div>
                      )}
                    </div>

                    <hr />

                    {/* Actions */}
                    <div className="d-flex gap-2">
                      <button className="btn btn-light flex-grow-1 rounded-3">
                        <FiEdit className="me-2" />
                        Edit
                      </button>

                      <button className="btn btn-outline-danger rounded-3">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Teacher Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4">
              <div className="modal-header border-0 px-4 pt-4">
                <div>
                  <h5 className="modal-title fw-bold">Add New Teacher</h5>

                  <p className="text-muted small mb-0">
                    Create a teacher account for your organization.
                  </p>
                </div>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <form onSubmit={handleCreateTeacher}>
                <div className="modal-body px-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter teacher name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Email</label>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="teacher@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Password</label>

                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Qualification
                      </label>

                      <input
                        type="text"
                        name="qualification"
                        className="form-control"
                        placeholder="e.g. BS Computer Science"
                        value={formData.qualification}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Subject</label>

                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="e.g. Web Development"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Phone</label>

                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0 px-4 pb-4">
                  <button
                    type="button"
                    className="btn btn-light rounded-3"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary rounded-3"
                    disabled={creating}
                  >
                    {creating ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Creating...
                      </>
                    ) : (
                      "Create Teacher"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersPage;
