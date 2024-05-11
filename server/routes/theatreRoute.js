const router = require("express").Router();
const Theatre = require("../model/theatreModel");

// Add a theatre

router.post("/add-theatre", async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();

    res.send({
      success: true,
      message: "New theatre has been added successfully",
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// Update theatre route

router.put("/update-theatre", async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    res.send({
      success: true,
      message: "Theatre has been updated successfully",
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// Delete theatre route

router.delete("/delete-theatre", async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.theatreId);
    res.send({
      success: true,
      message: "Theatre has been deleted successfully",
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// Get theatre route

router.get("/get-all-theatres", async (req, res) => {
  try {
    const allTheatres = await Theatre.find().populate("owner");
    res.send({
      success: true,
      message: "Theatres has been fetched successfully",
      data: allTheatres,
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

router.get("/get-all-theatres-by-owner", async (req, res) => {
  try {
    const owner = req.query.owner;
    const allTheatres = await Theatre.find({ owner });
    res.send({
      success: true,
      message: "Theatres has been fetched successfully based on owner",
      data: allTheatres,
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

module.exports = router;
