const Hospital = require('../models/hospitalModel');

const createHospital = async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json(hospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHospitalsByCity = async (req, res) => {
  try {
    const city = req.query.city;
    
    // Ensure city is a string and trim any extra whitespace
    if (typeof city !== 'string') {
      return res.status(400).json({ message: 'Invalid city name' });
    }

    // Use a case-insensitive regex to search for hospitals by city with partial match support
    const hospitals = await Hospital.find({ city: { $regex: new RegExp(city, 'i') } });
    
    // const hospitals = await Hospital.find({
    //   city: { $regex: city, $options: 'i' }
    // });

    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteHospital = async (req, res) => {
  try {
    await Hospital.findByIdAndDelete(req.query.id);
    res.status(200).json({ message: 'Hospital deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.query.id, req.body, { new: true });
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addHospitalDetails = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.query.id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    hospital.description = req.body.description || hospital.description;
    hospital.images = req.body.images || hospital.images;
    hospital.numberOfDoctors = req.body.numberOfDoctors || hospital.numberOfDoctors;
    hospital.numberOfDepartments = req.body.numberOfDepartments || hospital.numberOfDepartments;

    await hospital.save();
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createHospital,
  getHospitalsByCity,
  deleteHospital,
  updateHospital,
  addHospitalDetails
};
