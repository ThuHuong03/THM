import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div>
        <h1>Đây là nội dung để in</h1>
        <p>In nội dung này bằng cách nhấn vào nút bên dưới.</p>
      </div>
    );
  }
}

export default function PrintPDF() {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>In nội dung</button>}
        content={() => componentRef.current}
      />
      <ComponentToPrint ref={componentRef} />
    </div>
  );
}