const { Types } = require('mongoose');
const Type = require('../models/TypesModel');
const { getNextSequence } = require('./CounterController');


// Tạo loại sản phẩm mới
exports.createType = async (req, res) => {
  try {
    const { Type_name } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!Type_name) {
      return res.status(400).json({ message: 'Tên loại sản phẩm không được để trống.' });
    }

    // Kiểm tra xem loại sản phẩm với tên đã cho có tồn tại không
    const existingType = await Type.findOne({ Type_name });
    if (existingType) {
      return res.status(400).json({ message: 'Tên loại sản phẩm đã tồn tại.' });
    }

    // Lấy ID_Type tự động
    const ID_Type = await getNextSequence('ID_Type');

    const newType = new Type({ ID_Type, Type_name });
    await newType.save();

    res.status(201).json({ message: 'Thêm loại sản phẩm thành công', type: newType });
  } catch (error) {
    console.error('Error creating type:', error.message);
    res.status(500).json({ message: 'Lỗi khi thêm loại sản phẩm: ' + error.message }); // Trả về mã trạng thái 500 nếu có lỗi server
  }
};

// Lấy tất cả loại sản phẩm
exports.getAllTypes = async (req, res) => {
  try {
    const types = await Type.find();
    res.status(200).json(types);
  } catch (error) {
    console.error('Error retrieving types:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getTypeById = async (req, res) => {
  try {
    const types = await Type.findOne({ ID_Type: req.params.id }); 
    if (!types) {
      console.log('Type not found with ID_Type:', req.params.id);
      return res.status(404).json({ message: 'Type not found' });
    }
    console.log('Retrieved Type:', types);
    res.status(200).json(types);
  } catch (error) {
    console.error('Error retrieving Type:', error.message);
    res.status(500).json({ message: error.message });
  }
};
// Cập nhật loại sản phẩm
exports.updateType = async (req, res) => {
  try {
    const updatedType = await Type.findOneAndUpdate(
      { ID_Type: req.params.id }, // Sử dụng ID_Type để tìm kiếm
      req.body,
      { new: true }
    );
    if (!updatedType) {
      console.log('Type not found for update with ID_Type:', req.params.id);
      return res.status(404).json({ message: 'Type not found' });
    }
    console.log('Type updated:', updatedType);
    res.status(200).json({
      message: 'Cập nhật loại sản phẩm thành công',
      type: updatedType 
    });
  } catch (error) {
    console.error('Error updating type:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Xóa loại sản phẩm
exports.deleteType = async (req, res) => {
  try {
    const Types = await Type.findOneAndDelete({ ID_Type: req.params.id }); 
    if (!Types) {
      console.log('Type not found for deletion with ID_Type:', req.params.id);
      return res.status(404).json({ message: 'Type not found' });
    }
    console.log('Type deleted:', Types);
    res.status(200).json({ message: 'Xóa loai sản phẩm thành công', Types }); 
  } catch (error) {
    console.error('Error deleting Type:', error.message);
    res.status(500).json({ message: error.message });
  }
};
