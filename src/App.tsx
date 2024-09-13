import { useEffect, useState } from "react";
import "./App.css";
import {
  getAllStudents,
  deleteStudent,
  addStudent,
  updateStudent,
  getStudentsByName,
} from "./api/functions/functions";
import Student from "./api/models/Student";

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [studentId, setStudentId] = useState("");
  const [updateButton, setUpdateButton] = useState(false);

  const handleSubmit = async () => {
    const dropdownBoolean = dropdown === "true";

    const student = new Student();
    student.name = name;
    student.grade = grade;
    student.passed = dropdownBoolean;
    const res = await addStudent(student);
    setName("");
    setGrade("");
    setDropdown("");
    setStudentId("");
    if (res) {
      const stud = await getAllStudents();
      setStudents(stud);
    }
  };

  const handleRowClick = (student: any) => {
    setName(student.name);
    setGrade(student.grade);
    setDropdown(student.passed ? "True" : "False");
    setStudentId(student._id);

    setUpdateButton(true);
  };

  const handleTextClick = async () => {
    const userInput = prompt("enter the name to search for");

    if (userInput !== null) {
      const students = await getStudentsByName(userInput);
      setStudents(students);
      // User clicked OK
    } else {
      // User clicked Cancel
      console.log("closed");
    }
  };

  const handleUpdate = async () => {
    try {
      const dropdownBoolean = dropdown === "true";

      const student = new Student();
      student.name = name;
      student.grade = grade;
      student.passed = dropdownBoolean;
      student.id = studentId;
      setName("");
      setGrade("");
      setDropdown("");
      setStudentId("");
      setUpdateButton(false);
      const res = await updateStudent(student);
      if (res) {
        const stud = await getAllStudents();
        setStudents(stud);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeStudent = async (student: any) => {
    const res = await deleteStudent(student._id);
    if (res) {
      var stud = await getAllStudents();
      setStudents(stud);
    }
  };
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
        console.log(students);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="inputs">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <select
          value={dropdown}
          onChange={(e) => {
            console.log(e.target.value); // Debug the value
            setDropdown(e.target.value);
          }}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        {updateButton ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={handleTextClick}>Name</th>
            <th>Grade</th>
            <th>Passed</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td onClick={() => handleRowClick(student)}>{student.name}</td>
              <td>{student.grade}</td>
              <td>{student.passed ? "True" : "False"}</td>
              <td>
                <button onClick={() => removeStudent(student)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
