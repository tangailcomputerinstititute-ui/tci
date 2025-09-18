const Student = require("../model/student.model");
const streamifier = require("streamifier"); // নতুন যোগ করতে হবে
const cloudinary = require("../config/cloudinary");

const createStudent = async (req, res) => {
  try {
    const { studentName, studentMobile, courseName, courseDuration, address } =
      req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    // Cloudinary-তে buffer আপলোড
    const uploadFromBuffer = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "students" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await uploadFromBuffer(file.buffer);

    // নতুন স্টুডেন্ট তৈরি
    const newStudent = new Student({
      studentName,
      studentMobile,
      courseName,
      courseDuration,
      address,
      studentImageUrl: result.secure_url,
      studentImageId: result.public_id,
    });

    await newStudent.save();
    return res
      .status(201)
      .json({ message: "New Student Added", student: newStudent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getAllStudent = async (req, res) => {
  try {
    const getStudent = await Student.find();
    if (!getStudent) {
      return res.status(400).json({ message: "No Student Exist" });
    }
    return res.status(200).json(getStudent);
  } catch (error) {
    console.error(error);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Cloudinary থেকে ছবি মুছে দিন
    if (student.studentImageId) {
      await cloudinary.uploader.destroy(student.studentImageId);
    }

    // MongoDB থেকে ডিলিট করুন
    await student.deleteOne();

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllStudent, createStudent, deleteStudent };
