/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: ĐỒNG BỘ DANH SÁCH THAM DỰ LỄ TỐT NGHIỆP BÍCH PHƯỢNG
 * =========================================================================
 * 
 * Mã này được thiết kế để tự động:
 * 1. Khởi tạo hàng tiêu đề màu xanh HCMOU (#003D7A) chuyên nghiệp và cố định dòng đầu.
 * 2. Ghi nhận thời gian gửi theo giờ Việt Nam (GMT+7).
 * 3. Điền Họ và tên, Trạng thái (Tham dự / Không tham gia), Lời nhắn.
 * 4. Tự động căn chỉnh độ rộng cột và căn giữa các thông tin cần thiết.
 * 5. Khóa luồng (LockService) để tránh bị mất dữ liệu khi có nhiều khách nộp cùng lúc.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Chờ tối đa 10 giây nếu đang có yêu cầu khác đang ghi vào sheet
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Nếu trang tính còn trống, tự động tạo hàng tiêu đề đẹp mắt (4 cột)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời Gian Gửi",
        "Họ Và Tên",
        "Trạng Thái Tham Dự",
        "Lời Nhắn / Lời Chúc"
      ]);
      
      // Định dạng dòng tiêu đề sang trọng phong cách HCMOU
      var headerRange = sheet.getRange(1, 1, 1, 4);
      headerRange.setBackground("#003D7A");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
      headerRange.setHorizontalAlignment("center");
      headerRange.setVerticalAlignment("middle");
      sheet.setRowHeight(1, 35);
      sheet.setFrozenRows(1);
    }
    
    // Đọc dữ liệu gửi lên từ web
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }
    
    var time = data.time || Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss");
    var name = data.name || "Khách mời";
    var status = data.status || "Chưa rõ";
    var note = data.note || "(Không có)";
    
    // Ghi dữ liệu vào hàng mới
    sheet.appendRow([time, name, status, note]);
    
    var lastRow = sheet.getLastRow();
    sheet.setRowHeight(lastRow, 28);
    
    // Căn giữa cột Thời gian (1), Trạng thái (3)
    sheet.getRange(lastRow, 1).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 3).setHorizontalAlignment("center");
    
    // Đổi màu nhẹ cho trạng thái để dễ nhìn: Xanh lá nếu Tham dự, Cam nhạt nếu Không tham gia
    var statusCell = sheet.getRange(lastRow, 3);
    if (status.indexOf("Tham dự") !== -1) {
      statusCell.setBackground("#E8F5E9");
      statusCell.setFontColor("#1B5E20");
      statusCell.setFontWeight("bold");
    } else {
      statusCell.setBackground("#FFF3E0");
      statusCell.setFontColor("#E65100");
    }
    
    // Tự động căn chỉnh độ rộng các cột
    sheet.autoResizeColumns(1, 4);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      result: "success", 
      row: lastRow 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      result: "error", 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Kiểm tra khi mở link trực tiếp trên trình duyệt
function doGet(e) {
  return ContentService.createTextOutput("Hệ thống đồng bộ Google Sheet RSVP Lễ Tốt Nghiệp Bích Phượng đang hoạt động bình thường!")
    .setMimeType(ContentService.MimeType.TEXT);
}
