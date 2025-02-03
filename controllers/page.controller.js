const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPage = async (req, res) => {
  try {
    const { block } = req.body;

    if (!block) {
      return res.status(422).json({ error: "Block is a required field." });
    }

    const createBlock = await prisma.page.create({
      data: {
        block,
      },
    });

    return res.status(201).json(createBlock);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const getPage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(422).json({ error: "Provide an id." });
    }

    const page = await prisma.page.findUnique({
      where: {
        id,
      },
    });

    return res.status(200).json(page);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const { block } = req.body;

    if (!id) {
      return res.status(422).json({ error: "Provide an id." });
    }

    if (!block) {
      return res.status(422).json({ error: "Block is a required field." });
    }

    const updatePage = await prisma.page.update({
      where: {
        id,
      },
      data: {
        block,
      },
    });

    return res.status(200).json(updatePage);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deletePage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(422).json({ error: "Provide an id." });
    }
    console.log(id);

    const existingPage = await prisma.page.findUnique({
      where: {
        id,
      },
    });

    console.log(existingPage);

    if (!existingPage) {
      return res.status(404).json({ error: "Page not found." });
    }

    await prisma.page.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({ success: "Page deleted successfully." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPage,
  getPage,
  updatePage,
  deletePage,
};
