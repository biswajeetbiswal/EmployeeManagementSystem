const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

// Admin login
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the admin by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    admin.password = undefined;

    res.status(200).json({ user: admin, message: "Loggedin successfully!" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during login" });
  }
};

// Register a new admin
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if an admin with the same username already exists
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Admin with the same username already exists." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while registering the admin." });
  }
};
