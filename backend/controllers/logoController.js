const {
  uplodeImagesCloudinary,
} = require("../cloudinary/cloudinaryFileUpload");
const { LogoModel } = require("../models/logoModel");

const CreateLogo = async (req, res) => {
  const { file } = req;

  try {
    const find = await LogoModel.find({});

    const response = await uplodeImagesCloudinary(file.path);

    if (find.length > 0) {
      if (response) {
        const update = await LogoModel.findByIdAndUpdate(find[0]._id, {
          logo: response,
        });
        console.log("========================");
        res.status(200).json(update); 
      } else {
        res.status(400).json({ error: "Failed to upload image to Cloudinary" });
      }
    } else {
      if (response) {
        const newLogo = new LogoModel({
          logo: response,
        });
        await newLogo.save();
        res
          .status(201)
          .json({ message: "Logo uploaded successfully", data: newLogo });
      } else {
        res.status(400).json({ error: "Failed to upload image to Cloudinary" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const GetLogo = async (req, res) => {
  try {
    const findLogo = await LogoModel.find();
    res.send(findLogo);
  } catch {
    res.send("requist is faild");
  }
};

module.exports = { CreateLogo, GetLogo };


