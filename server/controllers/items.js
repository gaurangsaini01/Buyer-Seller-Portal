const Item = require("../models/item");
const User = require("../models/user");

async function addItem(req, res) {
  try {
    const userId = req.user.id;
    const file = req.file;
    const { itemName, price, description, category } = req.body;

    const newItem = await Item.create({
      itemName,
      price,
      category,
      description,
      sellerId: userId,
      image: file.path,
    });

    await User.findByIdAndUpdate(
      userId,
      { $push: { createdItems: newItem._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      item: newItem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Backend Error in adding item",
    });
  }
}

async function getAllItems(req, res) {
  try {
    const items = await Item.find({});
    return res.status(200).json({
      success: true,
      message: "All Items fetched successfully !",
      data: items,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Backend Error in fetching items",
    });
  }
}
module.exports = { addItem, getAllItems };
