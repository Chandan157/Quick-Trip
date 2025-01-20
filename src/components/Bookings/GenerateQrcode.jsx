import React, { useEffect, useState } from "react";
import qrcode from "qrcode";

const GenerateQrcode = ({ roomID }) => {
  const [qrSrc, setQrSrc] = useState("");

  useEffect(() => {
    qrcode.toDataURL(roomID).then((data) => {
      setQrSrc(data);
    });
  }, [roomID]);

  return (
    <div className="qr_code_wrapper">
      <img src={qrSrc} alt="check_quote" />
      <p className="qr_alert">
        Use this QR code at the time of checkin & checkout
      </p>
    </div>
  );
};

export default GenerateQrcode;
