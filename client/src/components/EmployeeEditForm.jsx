import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeEditForm = () => {
  const { employeeId } = useParams(); // Get the employeeId from the route params
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    designation: "",
    salary: "",
  });
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    //  editing

    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employees/${employeeId}?adminId=${admin?._id}`,
          {
            employeeData,
          }
        );
        const { firstName, lastName, email, phoneNumber, designation, salary } =
          response.data;
        setEmployeeData({
          firstName,
          lastName,
          email,
          phoneNumber,
          designation,
          salary,
        });
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the employee data
      await axios.put(
        `http://localhost:5000/api/employees/${employeeId}?adminId=${admin._id}`,
        employeeData
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update employee data:", error);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={employeeData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={employeeData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={employeeData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Designation:</label>
          <input
            type="text"
            name="designation"
            value={employeeData.designation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={employeeData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EmployeeEditForm;
