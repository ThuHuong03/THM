const bangTru = {
  15: [0.00, 0.10, 0.20, 0.37, 0.47, 0.57, 0.67, 0.77, 0.88, 0.99],
  16: [1.13, 1.24, 1.35, 1.46, 1.57, 1.68, 1.80, 1.92, 2.04, 2.16],
  17: [2.31, 2.44, 2.57, 2.70, 2.83, 2.96, 3.10, 3.24, 3.38, 3.52],
  18: [3.67, 3.81, 3.96, 4.11, 4.26, 4.41, 4.57, 4.74, 4.87, 5.03],
  19: [5.20, 5.37, 5.54, 5.71, 5.83, 5.96, 6.23, 6.41, 6.59, 6.77],
  20: [6.95, 7.13, 7.32, 7.51, 7.71, 7.91, 8.11, 8.31, 8.51, 8.71],
  21: [8.91, 9.12, 9.34, 9.56, 9.73, 10.00, 10.20, 10.44, 10.61, 10.90],
  22: [11.13, 11.36, 11.60, 11.85, 12.10, 12.36, 12.62, 12.85, 13.13, 13.36],
  23: [13.62, 14.15, 14.34, 14.54, 14.74, 14.94, 15.14, 15.34, 15.54, 15.76],
  24: [16.42, 16.71, 17.01, 17.31, 17.61, 17.91, 18.22, 18.53, 18.84, 19.15],
  25: [19.47]
};

export const calculateTotalAmount = ({ totalAmount, zem, humidity, packaging }) => {
  // Xác thực tham số đầu vào
  if (totalAmount < 0 || packaging < 0 || zem < 0 || humidity < 0) {
    throw new Error('Tất cả các giá trị đầu vào phải không âm.');
  }

  // Các điều kiện tính toán
  if (zem === 0 && humidity === 0) {
    return totalAmount - packaging;
  }

  if (zem === 500 && humidity === 15) {
    return totalAmount - packaging;
  }

  let sum = totalAmount;

  if (zem >= 500) {
    if (humidity <= 15) {
      sum += ((zem - 500) / 10 + 15 - humidity) * totalAmount / 100.0;
    } else if (humidity > 15 && bangTru[humidity]) {
      sum += ((zem - 500) / 10 * totalAmount / 100.0) - (bangTru[humidity][getDecimalPart(humidity)] * totalAmount);
    }
  } else {
    if (humidity <= 15) {
      sum -= ((500 - zem) / 10 * totalAmount / 100.0) + (15 - humidity) * totalAmount / 100.0;
    } else if (humidity > 15 && bangTru[humidity]) {
      sum -= ((500 - zem) / 10 * totalAmount / 100.0) + (bangTru[humidity][getDecimalPart(humidity)] * totalAmount);
    }
  }

  sum -= packaging; // Trừ đi chi phí đóng gói

  return sum;
};

function getDecimalPart(num) {
  const numString = num.toString();
  const index = numString.indexOf('.') !== -1 ? numString.indexOf('.') : numString.indexOf(',');

  // Nếu không có dấu phẩy, trả về 0
  if (index === -1) {
    return 0;
  }

  // Trả về phần sau dấu phẩy
  return Number(numString.slice(index + 1));
}

// Ví dụ gọi hàm
const result = calculateTotalAmount({ totalAmount: 1000, zem: 600, humidity: 20, packaging: 50 });
console.log(result);
