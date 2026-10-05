# Hướng Dẫn Từng Bước Kết Nối Thiệp Mời Với Google Sheet

Chỉ mất **2 - 3 phút** để bạn tạo một Google Sheet tự động nhận danh sách khách mời gửi từ thiệp mời web.

---

### Bước 1: Tạo Google Sheet mới
1. Truy cập [Google Sheets (Trang tính)](https://sheets.google.com) và tạo một bảng tính mới.
2. Đổi tên bảng tính ở góc trên bên trái, ví dụ: **`Danh Sách Khách Mời - Lễ Tốt Nghiệp Bích Phượng`**.

---

### Bước 2: Mở trình soạn thảo Apps Script
1. Trên thanh menu của Google Sheet, bấm chọn: **Tiện ích mở rộng** (Extensions) ➔ **Apps Script**.
2. Một tab mới sẽ mở ra trình soạn thảo mã nguồn.
3. Xóa hết tất cả các dòng mã mặc định hiện có trong ô soạn thảo (`function myFunction() { ... }`).

---

### Bước 3: Dán mã tự động ghi dữ liệu
1. Mở file [google-sheets-script.js](file:///c:/Users/nguye/OneDrive/Desktop/web%20thi%E1%BB%87p%20m%E1%BB%9Di%20cho%20b%C3%A9%20M%C3%A8o/google-sheets-script.js) (được tạo sẵn trong thư mục dự án của bạn).
2. Sao chép (Copy) toàn bộ nội dung trong file đó và Dán (Paste) vào trình soạn thảo Apps Script.
3. Bấm biểu tượng chiếc đĩa mềm 💾 (hoặc phím tắt **Ctrl + S**) để **Lưu dự án**.

---

### Bước 4: Triển khai thành Web App (Rất quan trọng)
1. Ở góc trên bên phải của trang Apps Script, bấm nút **Triển khai** (Deploy) ➔ Chọn **Tùy chọn triển khai mới** (New deployment).
2. Ở cửa sổ hiện ra:
   - Bấm vào biểu tượng bánh răng ⚙️ (bên cạnh dòng *Chọn loại*) ➔ Chọn **Ứng dụng web** (Web app).
   - Ô **Mô tả** (Description): Nhập `RSVP Thiệp mời Bích Phượng`.
   - Ô **Thực thi dưới dạng** (Execute as): Chọn **Tôi (email_cua_ban@gmail.com)**.
   - Ô **Người có quyền truy cập** (Who has access): Chọn **Bất kỳ ai** (Anyone). *(Lưu ý: Bắt buộc chọn "Bất kỳ ai" để khách bấm trên điện thoại không cần đăng nhập Google mà vẫn gửi được).*
3. Bấm nút **Triển khai** (Deploy).

---

### Bước 5: Cấp quyền truy cập (Chỉ làm 1 lần đầu)
1. Google sẽ hiện hộp thoại yêu cầu cấp quyền ➔ Bấm **Ủy quyền truy cập** (Authorize access).
2. Chọn tài khoản Google của bạn.
3. Nếu màn hình cảnh báo "Google chưa xác minh ứng dụng này" (Google hasn’t verified this app):
   - Bấm vào dòng chữ nhỏ: **Nâng cao** (Advanced).
   - Bấm tiếp vào liên kết: **Đi tới ... (không an toàn)** / *Go to ... (unsafe)*.
4. Bấm **Cho phép** (Allow).

---

### Bước 6: Lấy link và dán vào file index.html
1. Sau khi triển khai xong, Google sẽ cung cấp cho bạn một đường dẫn dạng:
   `https://script.google.com/macros/s/AKfycb.../exec`
2. Bấm nút **Sao chép** (Copy) đường link này.
3. Mở file [index.html](file:///c:/Users/nguye/OneDrive/Desktop/web%20thi%E1%BB%87p%20m%E1%BB%9Di%20cho%20b%C3%A9%20M%C3%A8o/index.html), tìm dòng khoảng 1060:
   ```javascript
   const GOOGLE_SHEET_SCRIPT_URL = "";
   ```
4. Dán link vừa copy vào giữa hai dấu ngoặc kép:
   ```javascript
   const GOOGLE_SHEET_SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
5. Lưu file `index.html` lại là hoàn tất!

---

### Kết quả bạn sẽ nhận được:
- Mỗi khi có người thân / bạn bè bấm gửi xác nhận:
  1. Hàng mới sẽ tự động xuất hiện trên Google Sheet của bạn tức thì.
  2. Bảng tính tự động tạo tiêu đề chuẩn màu nhận diện trường HCMOU `#003D7A`.
  3. Cột trạng thái sẽ tự động tô màu nổi bật (Xanh lá: Tham dự / Cam: Không tham gia).
  4. Bạn có thể mở Google Sheet trên điện thoại hoặc máy tính để kiểm tra danh sách bất cứ lúc nào!

| Thời Gian Gửi | Họ Và Tên | Trạng Thái Tham Dự | Lời Nhắn / Lời Chúc |
| :---: | :---: | :---: | :---: |
| 05/10/2026 09:30:15 | Tuấn Anh | **Tham dự** (màu xanh lá) | Chúc Phượng tốt nghiệp xuất sắc nha! |
| 05/10/2026 10:15:00 | Chị Mai | Không tham gia | Chúc mừng em gái nhé, chị bận công tác mất rồi ♡ |
