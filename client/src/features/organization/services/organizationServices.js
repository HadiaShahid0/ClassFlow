import API_URL from "../../../services/api.js"

export const createClass = async (classData) => {
  const response = await fetch(`${API_URL}/classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(classData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getClasses = async () => {
  const response = await fetch(`${API_URL}/classes`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const assignTeacher = async (classId, teacherId) => {
  const response = await fetch(
    `${API_URL}/classes/${classId}/teacher`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ teacherId }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const deleteClass = async (classId) => {
  const response = await fetch(
    `${API_URL}/classes/${classId}`,
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


export const createTeacher = async (teacherData) => {
  const response = await fetch(`${API_URL}/organization/teachers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(teacherData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getTeachers = async () => {
  const response = await fetch(
    `${API_URL}/organization/teachers`,
    {
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get teachers.");
  }

  return data.teachers;
};