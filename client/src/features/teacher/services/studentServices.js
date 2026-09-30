import API_URL from "../../../services/api"

const createStudent = async (studentData) => {
  const response = await fetch(
    `${API_URL}/teacher/students`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(studentData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

const getStudents = async () => {
  const response = await fetch(
    `${API_URL}/teacher/students`,
    {
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

const updateStudent = async (studentId, studentData) => {
  const response = await fetch(
    `${API_URL}/teacher/students/${studentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(studentData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

const deleteStudent = async (studentId) => {
  const response = await fetch(
    `${API_URL}/teacher/students/${studentId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};