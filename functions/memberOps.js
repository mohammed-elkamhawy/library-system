const Member = require("../models/Member");

// Create a new member
async function createMember(data) {
  const member = new Member(data);
  await member.save();
  console.log("Member created:", member);
}

// Get all members
async function getAllMembers() {
  const members = await Member.find();
  console.log("All members:", members);
}

// Update a member by ID
async function updateMember(id, data) {
  const updated = await Member.findByIdAndUpdate(id, data, { new: true });
  console.log("Member updated:", updated);
}

// Delete a member and their borrowings
const Borrowing = require("../models/Borrowing");

async function deleteMember(id) {
  await Borrowing.deleteMany({ member_id: id });
  await Member.findByIdAndDelete(id);
  console.log("Member and borrowings deleted.");
}

module.exports = {
  createMember,
  getAllMembers,
  updateMember,
  deleteMember
};
