import React from 'react';

const MyComponent = React.forwardRef((props, ref) => {
  // Destructure the invoice object from props
  const { invoice = {} } = props;

  return (
    <div ref={ref} className="hidden print:block m-5">
      <h1 className="text-4xl font-bold mb-4 uppercase">Phiếu nhập</h1>
      <h2 className="text-3xl font-bold mb-4 uppercase">Công ty Trách nhiệm hữu hạn MTV Toản Hải Đăk Nông</h2>
      <p className='text-2xl m-4 '><strong className='font-bold text-dark-rust'>Họ tên:</strong> {invoice.customer?.name || 'N/A'}</p>
      <p className='text-2xl m-4'><strong className='font-bold text-dark-rust'>Ngày xuất:</strong> {invoice.date || 'N/A'}</p>
      <p className='text-2xl m-4'><strong className='font-bold text-dark-rust'>Số lượng:</strong> {invoice.totalAmount?.toLocaleString('vi-VN') || 'N/A'}  {invoice.type=='tiền' ?"VND":"Kg"}  </p>
     {invoice.type=='tiền' ?"":  <div><p className='text-2xl m-4'><strong className='font-bold text-dark-rust'>Số tiền:</strong> {invoice.price?.toLocaleString('vi-VN') || 'N/A'} VND</p>
      <p className='text-2xl m-4'><strong className='font-bold text-dark-rust'>Đơn giá:</strong> {invoice.unitPrice?.toLocaleString('vi-VN') || 'N/A'} VND/kg</p> </div>}
      <p className='text-2xl m-4'><strong className='font-bold text-dark-rust'>Tình trạng:</strong> {invoice.status || 'N/A'}</p>
      <p className='text-2xl m-4'><strong className='font-bold text-dark-rust'>Ghi chú:</strong> {invoice.note || 'N/A'}</p>
      <div className='flex justify-between'>
      <p className='text-3xl m-4'><strong className='font-bold text-dark-rust'>Xác nhận của doanh nghiệp</strong> </p>
      <p className='text-3xl m-4'><strong className='font-bold text-dark-rust'>Xác nhận của khách hàng</strong> </p>
      </div>
    </div>
  );
});

export default MyComponent;
