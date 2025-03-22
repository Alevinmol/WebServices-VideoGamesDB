const User = require('../models/users');

const usersController = {}

// Get all users
usersController.getAllUsers = async (req, res) => {
    /*
    #swagger.summary = "Get all Users"
    #swagger.description = "Endpoint to get all users from the database."
    #swagger.tags = ['Users']
    */
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a user by username
usersController.getUser = async (req, res) => {
    /*
    #swagger.summary = "Get a User by Username"
    #swagger.description = "Endpoint
    to get a user by username from the database."
    #swagger.tags = ['Users']
    */
    try { const { username } = req.params;
        const
        user = await User.findOne({
            username
        });
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}
// Add or update a user
usersController.addOrUpdateUser = async (req, res) => {
    /*
    #swagger.summary = "Add or Update a User"
    #swagger.description = "Endpoint to add or update a user in the database."
    #swagger.tags = ['Users']
    */
    try {
        const {
            username,
            password
        } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({
                error: "All required fields must be provided."
            });
        }

        // Find and update the user if it exists, otherwise insert a new one
        const user = await User.findOneAndUpdate({
            username
        }, {
            username,
            password
        }, {
            new: true,
            upsert: true
        });

        res.status(200).json({
            message: "User added/updated successfully!",
            user
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};
// Delete a user by username 
usersController.deleteUser = async (req, res) => {
    /*
    #swagger.summary = "Delete a User by Username"
    #swagger.description = "Endpoint to delete a user by username from the database."
    #swagger.tags = ['Users']
    */
    try {
        const {
            username
        } = req.params;
        const user = await User.findOneAndDelete({
            username
        });
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        res.status(200).json({
            message: "User deleted successfully!"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

module.exports = usersController;