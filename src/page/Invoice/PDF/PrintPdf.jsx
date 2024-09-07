import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const Invoice = React.forwardRef((props, ref) => (
  <div ref={ref} className="p-8">
    <h1 className="text-3xl font-bold">Phiếu Xuất</h1>
    {/* Your content here */}
    <p>Tên khách hàng: Nguyễn Văn A</p>
    <p>Số điện thoại: 0123456789</p>
    <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
    {/* Add more content */}
  </div>
));

export default function InvoicePDF() {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button className="btn btn-primary">Xuất PDF</button>}
        content={() => componentRef.current}
      />
      <Invoice ref={componentRef} />
    </div>
  );
}
