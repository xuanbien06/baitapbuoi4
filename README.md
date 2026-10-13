# 📱 Student Manager App - Báo cáo Bài tập React Native

> **Ứng dụng Quản lý Sinh viên trên nền tảng di động (React Native / Expo)**  
> Hỗ trợ đầy đủ chu trình CRUD, kiểm tra tính hợp lệ dữ liệu (Form Validation), lưu trữ dữ liệu cục bộ bền vững (`AsyncStorage`) và hỗ trợ song ngữ Tiếng Việt - Tiếng Anh (`i18n`).

---

## 🎥 Video Thuyết Trình & Demo Ứng Dụng (4 - 5 phút)

*Thao tác demo toàn diện các tính năng: Khởi động app, chuyển đổi ngôn ngữ, bắt lỗi form, thêm/sửa/xóa sinh viên và kiểm tra tính lưu trữ bền vững khi reload ứng dụng.*
* 📁 **Link thuyết trình (Google Drive):** [Xem video trên Google Drive](https://drive.google.com/file/d/1XTohQl-JizoH9r4_MM-5tLQC_uUcmL8T/view?usp=drive_link)  

---

## 👤 Thông Tin Sinh Viên Thực Hiện

* **Họ và tên:** Lại Xuân Biển
* **Mã số sinh viên (MSSV):** BIT240041

---

## 🚀 Công Nghệ Sử Dụng (Tech Stack)

| Thành phần | Công nghệ / Thư viện | Vai trò |
| :--- | :--- | :--- |
| **Framework** | [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/) (SDK 52+) | Xây dựng ứng dụng đa nền tảng (Android/iOS) |
| **Navigation** | `@react-navigation/stack`, `@react-navigation/native` | Quản lý điều hướng màn hình (Stack Navigation) |
| **Local Storage** | `@react-native-async-storage/async-storage` | Lưu trữ dữ liệu danh sách sinh viên bền vững offline |
| **Đa ngôn ngữ** | `i18n-js` / Translation Dictionary | Hỗ trợ chuyển đổi giao diện Tiếng Việt (`vi`) & Tiếng Anh (`en`) |
| **Giao diện & Icon** | React Native Core Components & Vector Icons | Tối ưu trải nghiệm UI/UX, hỗ trợ hiển thị thẻ và cảnh báo |

---

## 🌟 Các Tính Năng Nổi Bật

### 1. Chu trình quản lý CRUD toàn diện
* **Create (Thêm mới):** Nhập thông tin sinh viên (Họ tên, Mã SV, Lớp, Điểm GPA, Số điện thoại...).
* **Read (Xem danh sách & Chi tiết):** Hiển thị danh sách thẻ sinh viên trực quan; xử lý trạng thái danh sách trống (*Empty State*) chuyên nghiệp.
* **Update (Cập nhật):** Tự động điền dữ liệu cũ vào biểu mẫu, hỗ trợ chỉnh sửa nhanh chóng.
* **Delete (Xóa bản ghi):** Tích hợp hộp thoại xác nhận an toàn (`Confirmation Alert`) trước khi xóa để phòng tránh thao tác nhầm lẫn.

### 2. Kiểm tra dữ liệu đầu vào (Form Validation)
* Bắt buộc điền các trường thông tin then chốt (Họ tên, Mã sinh viên).
* Kiểm tra tính hợp lệ của định dạng dữ liệu (ví dụ: GPA phải là số trong thang điểm hợp lệ).
* Hiển thị cảnh báo lỗi tức thì khi người dùng bấm Lưu.

### 3. Đa ngôn ngữ (i18n)
* Chuyển đổi nhanh Tiếng Việt 🇻🇳 / Tiếng Anh 🇬🇧 chỉ với 1 chạm ngay tại thanh công cụ.
* Cập nhật tức thì toàn bộ nhãn hiển thị, tiêu đề và câu thông báo lỗi mà không cần tải lại ứng dụng.

### 4. Lưu trữ dữ liệu ngoại tuyến (Data Persistence)
* Tách riêng tầng **Data Access Layer** (`storage.js`).
* Tự động đồng bộ hóa với bộ nhớ máy qua `AsyncStorage`, đảm bảo dữ liệu không bị mất khi thoát ứng dụng hoặc reload.

---

## 📂 Cấu Trúc Mã Nguồn (Project Structure)

```text
StudentManager/
├── src/
│   ├── components/         # Các UI component dùng chung
│   ├── database/
│   │   └── storage.js      # Tầng truy xuất dữ liệu AsyncStorage (CRUD methods)
│   ├── locales/
│   │   └── i18n.js         # Cấu hình đa ngôn ngữ (vi, en)
│   ├── screens/
│   │   ├── ListScreen.js   # Màn hình danh sách sinh viên & Chuyển đổi ngôn ngữ
│   │   └── EditScreen.js   # Màn hình thêm mới & chỉnh sửa sinh viên (kèm Validation)
│   └── constants/          # Biến hằng số, cấu hình theme màu sắc
├── App.js                  # Điểm khởi động ứng dụng & Cấu hình React Navigation Stack
├── app.json                # Cấu hình Expo Project
├── package.json            # Quản lý dependencies & scripts
└── README.md               # Tài liệu hướng dẫn & báo cáo dự án
```

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### Yêu cầu môi trường
* Đã cài đặt **Node.js** (khuyến nghị phiên bản LTS 18.x hoặc 20.x).
* Đã cài đặt máy ảo Android (Android Studio / Pixel Emulator) hoặc điện thoại thật có cài app **Expo Go**.

### Các bước thực hiện

1. **Clone repository về máy tính:**
   ```bash
   git clone <URL_REPO_CUA_BAN>
   cd StudentManager
   ```

2. **Cài đặt các gói phụ thuộc (Dependencies):**
   ```bash
   npm install
   ```

3. **Khởi động Expo Metro Bundler:**
   ```bash
   npx expo start
   ```

4. **Chạy ứng dụng:**
   * **Trên máy ảo Android:** Nhấn phím `a` trong cửa sổ dòng lệnh (Terminal).
   * **Trên máy ảo iOS (macOS):** Nhấn phím `i`.
   * **Trên thiết bị thật:** Dùng camera hoặc ứng dụng **Expo Go** quét mã QR hiển thị ở Terminal.
   * **Reload lại ứng dụng nhanh:** Nhấn phím `r`.

---

## 📋 Kịch Bản Kiểm Thử Nhanh (Test Cases Checklist)

- [x] **TC01 - Khởi động & Empty State:** Danh sách hiển thị thông báo trống khi chưa có dữ liệu.
- [x] **TC02 - Chuyển đổi i18n:** Nhấn cờ VN/EN, toàn bộ giao diện đổi ngôn ngữ tức thì.
- [x] **TC03 - Validation Thêm mới:** Bấm Lưu khi bỏ trống dữ liệu -> Xuất hiện cảnh báo đỏ.
- [x] **TC04 - Thêm mới thành công:** Nhập dữ liệu hợp lệ -> Quay về danh sách và hiển thị bản ghi mới.
- [x] **TC05 - Chỉnh sửa:** Bấm vào sinh viên -> Biểu mẫu hiển thị đúng dữ liệu cũ -> Sửa điểm GPA -> Cập nhật thành công.
- [x] **TC06 - Xác nhận Xóa:** Bấm Xóa -> Chọn Hủy (dữ liệu giữ nguyên) -> Bấm Xóa -> Chọn Đồng ý (bản ghi biến mất).
- [x] **TC07 - Lưu trữ bền vững:** Nhấn `r` tại Terminal để reload app -> Dữ liệu vừa thao tác vẫn còn nguyên vẹn.