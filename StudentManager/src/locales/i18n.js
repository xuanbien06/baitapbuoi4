import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

const translations = {
  en: {
    listTitle: 'Student List',
    addStudent: 'Add Student',
    name: 'Full Name',
    studentId: 'Student ID',
    email: 'Email',
    avatar: 'Avatar',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    confirmMsg: 'Bạn có muốn sửa / xóa thông tin SV không?', // Giữ nguyên câu hỏi yêu cầu
    yes: 'Có',
    no: 'Không',
    details: 'Student Details',
    close: 'Close',
    pickImage: 'Upload Avatar',
  },
  vi: {
    listTitle: 'Danh sách sinh viên',
    addStudent: 'Thêm sinh viên',
    name: 'Họ tên SV',
    studentId: 'Mã số SV',
    email: 'Email',
    avatar: 'Ảnh Avatar',
    save: 'Lưu',
    edit: 'Sửa',
    delete: 'Xóa',
    confirmMsg: 'Bạn có muốn sửa / xóa thông tin SV không?', 
    yes: 'Có',
    no: 'Không',
    details: 'Chi tiết sinh viên',
    close: 'Đóng',
    pickImage: 'Chọn ảnh tải lên',
  },
};

const i18n = new I18n(translations);
// Tự động nhận diện ngôn ngữ thiết bị (lấy mã đầu tiên như 'en' hoặc 'vi')
i18n.locale = getLocales()[0].languageCode;
i18n.enableFallback = true;

export default i18n;