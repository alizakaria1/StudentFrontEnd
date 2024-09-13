import Student from "../models/Student";

//const baseUrl = "http://localhost:3000/student";
const baseUrl = "https://expressapi-e65p.onrender.com/student";

export const getAllStudents = async (): Promise<Student[]> => {
  try {
    var url = baseUrl;
    const res = await fetch(url);
    if (res.ok) {
      const students: Student[] = await res.json();
      return students;
    } else {
      console.log(
        `status code : ${res.status}, with status text : ${res.statusText}`
      );
      return [];
    }
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (id: string): Promise<boolean> => {
  try {
    const url = `${baseUrl}/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export const addStudent = async (student: Student): Promise<boolean> => {
  try {
    const url = `${baseUrl}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (student: Student): Promise<boolean> => {
  try {
    const url = `${baseUrl}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export const getStudentsByName = async (name: string): Promise<Student[]> => {
  try {
    var url = `${baseUrl}/name/${name}`;
    const res = await fetch(url);
    if (res.ok) {
      const students: Student[] = await res.json();
      return students;
    } else {
      console.log(
        `status code : ${res.status}, with status text : ${res.statusText}`
      );
      return [];
    }
  } catch (error) {
    throw error;
  }
};
