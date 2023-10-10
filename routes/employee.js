const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee");

// Create a new employee (with admin authentication)
router.post("/", employeeController.createEmployee);

// Get all employees (with admin authentication)
router.get("/", employeeController.getAllEmployees);

// Get employee by ID (with admin authentication)
router.get("/:id", employeeController.getEmployeeById);

// Update an employee (with admin authentication)
router.put("/:id", employeeController.updateEmployee);

// Delete an employee (with admin authentication)
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
