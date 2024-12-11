const User = require("../models/UserSchema");

exports.getAllContacts = async (req, res) => {
  console.log("get all contacts");

  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.contacts); // Return user's contacts
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addContact = async (req, res) => {
  try {
    const { email } = req.params;
    const user = {
      name: req.body.name,
      number: req.body.number,
    };
    const updateUser = await User.findOneAndUpdate(
      { email: email },
      { $push: { contacts: user } },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updateUser.contacts[updateUser.contacts.length - 1]); // Return added contact
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { email } = req.params;
    const { id } = req.body; // Extract the contact ID from the request body

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $pull: { contacts: { _id: id } } }, // Use `_id` if contacts have unique ObjectIds
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser.contacts); // Return the updated contacts array
  } catch (err) {
    console.error("Error deleting contact:", err.message);
    res.status(500).json({ message: err.message });
  }
};
