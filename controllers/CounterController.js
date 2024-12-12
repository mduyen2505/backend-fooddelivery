const Counter = require('../models/counter');
const Product = require('../models/productsModel');
const Type = require('../models/TypesModel');

// Hàm khởi tạo Counter cho cả ID_Type và ID_Product
const initializeCounters = async () => {
    try {
        const counters = ['ID_Type', 'ID_Product'];
        for (const counter of counters) {
            const existingCounter = await Counter.findById(counter); // Kiểm tra xem counter đã tồn tại chưa
            if (!existingCounter) {
                const newCounter = new Counter({ _id: counter, sequenceValue: 1 });
                await newCounter.save();
                console.log(`Counter initialized for ${counter}.`);
            } else {
                console.log(`Counter for ${counter} already exists.`);
            }
        }
    } catch (error) {
        console.error('Error initializing counters:', error.message);
    }
};

// Hàm để lấy ID tự động cho một chuỗi bất kỳ
const getNextSequence = async (sequenceName) => {
    try {
        const sequenceDocument = await Counter.findOneAndUpdate(
            { _id: sequenceName },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true } // Tạo mới nếu không tồn tại
        );
        return sequenceDocument.sequenceValue;
    } catch (error) {
        console.error('Error getting next sequence:', error.message);
        throw error; // Đẩy lỗi lên trên để xử lý ở nơi khác nếu cần
    }
};

// Gọi hàm khởi tạo khi khởi động ứng dụng
initializeCounters();

// Xuất các hàm cần thiết
module.exports = {
    initializeCounters,
    getNextSequence,
};


