const Employee = require("../models/Employee");
const Admin = require("../models/Admin");

// Create a new employee (with admin authentication)
exports.createEmployee = async (req, res) => {
  try {
    // Check if the admin is authenticated
    const admin = await Admin.findById(req.body.adminId);

    if (!admin) {
      return res.status(401).json({ error: "Unauthorized: Admin not found." });
    }

    const employee = new Employee(req.body.employeeData);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the employee." });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const admin = await Admin.findById(req.query.adminId);

    if (!admin) {
      return res.status(401).json({ error: "Unauthorized: Admin not found." });
    }

    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching employees." });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.query.adminId);
    if (!admin) {
      return res.status(401).json({ error: "Unauthorized: Admin not found." });
    }

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }
    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the employee." });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    console.log(req.body, req.query);
    const admin = await Admin.findById(req.query.adminId);
    if (!admin) {
      return res.status(401).json({ error: "Unauthorized: Admin not found." });
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }
    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the employee." });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const admin = await Admin.findById(req.query.adminId);
    if (!admin) {
      return res.status(401).json({ error: "Unauthorized: Admin not found." });
    }

    const employee = await Employee.findByIdAndRemove(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(204).json({
      message: "Deleted successfully!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the employee." });
  }
};
