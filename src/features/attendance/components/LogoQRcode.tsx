import React from 'react';
import QRcode from 'qrcode.react';
import Logo from '/qr-logo.png';

interface QRCodeProps {
  attendUrl: string;
}

const LogoQRCode: React.FC<QRCodeProps> = ({ attendUrl }) => {
  const qrSize = 270; // Size of the QR code

  return (
    <>
      <div className="w-[330px] h-[330px] flex justify-center items-center">
        {/* QR Code */}
        <QRcode
          value={attendUrl}
          size={qrSize}
          bgColor={'#d4d4d4'}
          imageSettings={{
            src: Logo,
            width: qrSize * 0.4,
            height: qrSize * 0.25,
            excavate: true,
          }}
          level="H" // High error correction to ensure the QR code is still scannable with the logo
        />
      </div>
    </>
  );
};

export default LogoQRCode;
