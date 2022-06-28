const { Member } = require("../models");

const createMember = async (req, res) => {
  const { name, image, role, description } = req.body;

  try {
    await Member.create({
      name,
      image,
      role,
      description,
    });
    return res.status(200).json({
      msg: "Member created successfully",
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      ok: false,
    });
  }
};

const listMembers = async (req, res) => {
  try {
    const results = await Member.findAll({
      attributes: ["id", "name", "image", "role", "description"],
    });
    return res.status(200).json({
      results,
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      ok: false,
    });
  }
};

const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    const member = await Member.findOne({
      where: {
        id,
      },
    });

    if (!member)
      return res.status(404).json({
        msg: "Member not found.",
        ok: false,
      });

    if (member.deletedAt)
      return res.status(404).json({
        msg: "Member not found.",
        ok: false,
      });

    await member.destroy();

    return res.status(200).json({
      results: {
        msg: "Member deleted successfully.",
      },
      ok: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Internal Server Error.",
      ok: false,
    });
  }
};

const updateMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, image, description, role } = req.body;
    const member = await Member.findByPk(id);

    if (member && !member.deletedAt) {
      await member.update({
        name,
        image,
        role,
        description,
      });
      await member.save();
      return res.status(200).json({
        msg: "Member updated succesfully",
        ok: true,
      });
    }
    return res.status(404).json({
      error: "Member not found.",
      ok: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
      ok: false,
    });
  }
};

module.exports = {
  createMember,
  deleteMember,
  listMembers,
  updateMember,
};
