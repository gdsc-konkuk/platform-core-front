import React, { useState } from 'react';

const ErrorPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[365px] h-[160px]">
        <p className="my-[32px] text-[#171719] text-center font-pretendard text-[17px] font-normal leading-[30px]">
          알 수 없는 오류가 발생했습니다.
        </p>
        <div className="w-full h-[1px] border"></div>
        <button
          onClick={() => setIsVisible(false)}
          className="py-[18px] bg-none hover:bg-[#f2f2f2] transition duration-200 w-full rounded-md text-[#171719] text-center font-pretendard text-[18px] font-medium leading-[27px] tracking-[0.103px]"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
