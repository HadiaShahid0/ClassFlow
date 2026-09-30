import API_URL from "../../../services/api";

export const getClasses = async () => {
  const response = await fetch(`${API_URL}/classes`, {
    method: "GET",
    credentials: "include",
  });

  console.log("Classes status:", response.status);
  console.log(
    "Classes content type:",
    response.headers.get("content-type")
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch classes.");
  }

  return data.classes || [];
};

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
    throw new Error(data.message || "Failed to create class.");
  }

  return data;
};

export const updateClass = async (classId, classData) => {
  const response = await fetch(
    `${API_URL}/classes/${classId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(classData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update class."
    );
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
      body: JSON.stringify({
        teacherId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to assign teacher."
    );
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
    throw new Error(
      data.message || "Failed to delete class."
    );
  }

  return data;
};