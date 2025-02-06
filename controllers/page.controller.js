const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPage = async (req, res) => {
  try {
    const { id } = req.user;
    const { block } = req.body;

    if (!block) {
      return res.status(422).json({ error: "Block is a required field." });
    }

    const createBlock = await prisma.page.create({
      data: {
        block,
        userId: [id],
      },
    });

    return res.status(201).json(createBlock);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllPages = async (req, res) => {
  try {
    const { id } = req.user;

    const pages = await prisma.page.findMany({
      where: {
        userId: {
          has: id,
        },
      },
    });
    return res.status(200).json(pages);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getPageById = async (req, res) => {
  try {
    const { pageId } = req.params;
    const { id } = req.user;

    if (!pageId) {
      return res.status(422).json({ error: "Provide an id." });
    }

    const page = await prisma.page.findUnique({
      where: {
        id: pageId,
        userId: {
          has: id,
        },
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
    const { userId } = req.user;

    if (!id) {
      return res.status(422).json({ error: "Provide an id." });
    }

    if (!block) {
      return res.status(422).json({ error: "Block is a required field." });
    }

    const updatePage = await prisma.page.update({
      where: {
        id,
        userId,
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
    const { userId } = req.user;

    if (!id) {
      return res.status(422).json({ error: "Provide an id." });
    }
    console.log(id);

    const existingPage = await prisma.page.findUnique({
      where: {
        id,
        userId,
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
  getPageById,
  getAllPages,
  updatePage,
  deletePage,
};
