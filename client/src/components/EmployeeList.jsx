import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const admin = JSON.parse(localStorage.getItem("user"));

  const handleEdit = (employeeId) => {
    navigate(`/edit/${employeeId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleDelete = async (employeeId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/employees/${employeeId}?adminId=${admin?._id}`
      );
      // Refresh the employee list after deletion
      res.status === 204 &&
        setEmployees(employees.filter((emp) => emp._id !== employeeId));
    } catch (error) {
      console.error(
        `Failed to delete employee with ID ${employeeId}:`,
        error.response
      );
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/login");
  }, []);

  useEffect(() => {
    // Fetch employees from the backend
    // console.log(admin);
    setLoading(true);
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/employees?adminId=${admin?._id}`
        );
        setEmployees(res.data);
        console.log(res);
      } catch (error) {
        console.error("Failed to fetch employees:", error.response);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  console.log(loading, employees);

  return (
    <div>
      <div className="topbar">
        <h2>Employee List</h2>

        {admin ? (
          <div className="topbar-nav">
            <p>{admin.username}</p>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : null}
      </div>
      <Link to="/add">Add Employee</Link>
      <ul>
        {loading ? (
          "loading"
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Salary</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                employees.map((employee, i) => (
                  <tr key={employee._id}>
                    <td>{i + 1}</td>
                    <td>{employee.firstName + " " + employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.salary}</td>
                    <td>
                      <button
                        className="edit"
                        onClick={() => handleEdit(employee._id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => handleDelete(employee._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>Loading...please wait</p>
              )}
            </tbody>
          </table>
        )}
      </ul>
    </div>
  );
};

export default EmployeeList;
