export default function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
    const year = String(today.getFullYear()).slice(); // Lấy 2 chữ số cuối của năm
  
    return `${day}/${month}/${year}`;
  }