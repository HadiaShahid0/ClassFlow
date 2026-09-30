import { useEffect, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiBookOpen,
  FiUser,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

import {
  getClasses,
  createClass,
  updateClass,
  assignTeacher,
  deleteClass,
} from "../services/classServices";

import { getTeachers } from "../services/organizationServices";

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    teacherId: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [classesData, teachersData] = await Promise.all([
        getClasses(),
        getTeachers(),
      ]);

      setClasses(classesData);
      setTeachers(teachersData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const openCreateModal = () => {
    setEditingClass(null);

    setFormData({
      name: "",
      description: "",
      teacherId: "",
    });

    setError("");
    setSuccess("");

    setShowModal(true);
  };

  const openEditModal = (classData) => {
    setEditingClass(classData);

    setFormData({
      name: classData.name || "",
      description: classData.description || "",
      teacherId: classData.teacherId || "",
    });

    setError("");
    setSuccess("");

    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (editingClass) {
        await updateClass(editingClass.id, {
          name: formData.name,
          description: formData.description,
        });

        if (
          String(formData.teacherId) !==
          String(editingClass.teacherId || "")
        ) {
          if (formData.teacherId) {
            await assignTeacher(
              editingClass.id,
              Number(formData.teacherId)
            );
          }
        }

        setSuccess("Class updated successfully.");
      } else {
        await createClass({
          name: formData.name,
          description: formData.description,
          teacherId: formData.teacherId
            ? Number(formData.teacherId)
            : null,
        });

        setSuccess("Class created successfully.");
      }

      setShowModal(false);

      await fetchData();
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (classId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteClass(classId);

      setSuccess("Class deleted successfully.");

      await fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredClasses = classes.filter((classData) => {
    const searchText = search.toLowerCase();

    return (
      classData.name?.toLowerCase().includes(searchText) ||
      classData.description?.toLowerCase().includes(searchText) ||
      classData.teacher?.name?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            Classes
          </h2>

          <p className="text-muted mb-0">
            Create classes and assign teachers.
          </p>
        </div>

        <button
          className="btn btn-primary rounded-3 mt-3 mt-md-0"
          onClick={openCreateModal}
        >
          <FiPlus className="me-2" />
          Create Class
        </button>
      </div>

      {/* Alerts */}
      {success && (
        <div className="alert alert-success border-0 rounded-3">
          {success}
        </div>
      )}

      {error && (
        <div className="alert alert-danger border-0 rounded-3">
          {error}
        </div>
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
              placeholder="Search classes..."
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
      {!loading && filteredClasses.length === 0 && (
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body text-center py-5">

            <FiBookOpen
              size={42}
              className="text-muted mb-3"
            />

            <h5 className="fw-bold">
              No classes found
            </h5>

            <p className="text-muted mb-0">
              Create your first class to get started.
            </p>

          </div>
        </div>
      )}

      {/* Classes */}
      {!loading && filteredClasses.length > 0 && (
        <div className="row g-4">

          {filteredClasses.map((classData) => (
            <div
              className="col-12 col-md-6 col-xl-4"
              key={classData.id}
            >
              <div className="card border-0 shadow-sm rounded-4 h-100">

                <div className="card-body p-4">

                  {/* Icon */}
                  <div className="d-flex justify-content-between align-items-start mb-4">

                    <div
                      className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "52px",
                        height: "52px",
                      }}
                    >
                      <FiBookOpen size={23} />
                    </div>

                    <span
                      className={`badge ${
                        classData.teacher
                          ? "bg-success-subtle text-success"
                          : "bg-warning-subtle text-warning-emphasis"
                      }`}
                    >
                      {classData.teacher
                        ? "Assigned"
                        : "Unassigned"}
                    </span>

                  </div>

                  {/* Class info */}
                  <h5 className="fw-bold mb-2">
                    {classData.name}
                  </h5>

                  <p className="text-muted small mb-4">
                    {classData.description ||
                      "No description provided."}
                  </p>

                  {/* Teacher */}
                  <div className="bg-light rounded-3 p-3 mb-4">

                    <small className="text-muted d-block mb-1">
                      Assigned Teacher
                    </small>

                    <div className="d-flex align-items-center gap-2">

                      <div
                        className="rounded-circle bg-white d-flex align-items-center justify-content-center"
                        style={{
                          width: "35px",
                          height: "35px",
                        }}
                      >
                        <FiUser size={17} />
                      </div>

                      <span className="fw-semibold">
                        {classData.teacher?.name ||
                          "No teacher assigned"}
                      </span>

                    </div>

                  </div>

                  {/* Actions */}
                  <div className="d-flex gap-2">

                    <button
                      className="btn btn-light flex-grow-1 rounded-3"
                      onClick={() => openEditModal(classData)}
                    >
                      <FiEdit className="me-2" />
                      Edit
                    </button>

                    <button
                      className="btn btn-outline-danger rounded-3"
                      onClick={() =>
                        handleDelete(classData.id)
                      }
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4">

              <div className="modal-header border-0 px-4 pt-4">

                <div>
                  <h5 className="modal-title fw-bold">
                    {editingClass
                      ? "Edit Class"
                      : "Create New Class"}
                  </h5>

                  <p className="text-muted small mb-0">
                    {editingClass
                      ? "Update class information."
                      : "Create a class and assign a teacher."}
                  </p>
                </div>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />

              </div>

              <form onSubmit={handleSubmit}>

                <div className="modal-body px-4">

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Class Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="e.g. Web Development"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Description
                    </label>

                    <textarea
                      name="description"
                      className="form-control"
                      rows="4"
                      placeholder="Describe this class..."
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="form-label fw-semibold">
                      Assign Teacher
                    </label>

                    <select
                      name="teacherId"
                      className="form-select"
                      value={formData.teacherId}
                      onChange={handleChange}
                    >
                      <option value="">
                        No teacher assigned
                      </option>

                      {teachers.map((teacher) => (
                        <option
                          key={teacher.user?.id}
                          value={teacher.user?.id}
                        >
                          {teacher.user?.name}
                        </option>
                      ))}
                    </select>
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
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving...
                      </>
                    ) : editingClass ? (
                      "Update Class"
                    ) : (
                      "Create Class"
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

export default ClassesPage;