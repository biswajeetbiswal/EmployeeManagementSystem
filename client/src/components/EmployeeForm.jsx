import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeForm = () => {
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
      // validations
      const phone = /^[6-9]{1}[0-9]{9}$/;
      const email =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (
        phone.test(employeeData.phoneNumber) &&
        email.test(employeeData.email)
      ) {
        // add api
        await axios.post("http://localhost:5000/api/employees", {
          adminId: admin?._id,
          employeeData,
        });

        // reset
        setEmployeeData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          designation: "",
          salary: "",
        });

        navigate("/dashboard");
      } else {
        alert("Please input valid data");
      }
    } catch (error) {
      console.error("Failed to create employee:", error);
    }
  };

  return (
    <div className="form">
      <h2>Add Employee</h2>
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
            type="number" // Use 'number' type for the salary field
            name="salary"
            value={employeeData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
