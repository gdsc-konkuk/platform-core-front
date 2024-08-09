import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Symbol from '/symbol.svg';
import IdIcon from '/icons/id.svg';
import PasswordIcon from '/icons/password.svg';
import BlackCloseIcon from '/icons/close-black.svg';
import GrayCloseIcon from '/icons/close-gray.svg';
import { useRef, useState } from 'react';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idCloseHovered, setIdCloseHovered] = useState(false);
  const [passwordCloseHovered, setPasswordCloseHovered] = useState(false);
  const borderRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-full w-full font-pretendard">
      <div className="flex w-3/5 flex-col justify-between px-[50px] py-11">
        <img src={Symbol} alt="symbol" width="72px" />
        <h1 className="font-suite text-[80px] font-[900] leading-[120px]">
          KONKUK
          <br />
          CLUB
          <br />
          MANAGER
        </h1>
        <div className="w-1"></div>
      </div>
      <div className="flex w-2/5 flex-col items-center justify-between bg-background py-[53px]">
        <div className="w-1"></div>
        <form className="w-[400px] flex flex-col">
          <div className="relative w-full">
            <img src={IdIcon} alt="id" className="absolute left-4 top-[14px]" />
            <Input
              placeholder="아이디"
              className="h-[50px] rounded-b-none border-b-0 bg-white px-[54px] text-[16px] focus:border-[1.5px] focus:border-b-0 focus:border-[#0DAA5C]"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onFocus={() => {
                borderRef.current?.style.setProperty(
                  'background-color',
                  '#0DAA5C',
                );
              }}
              onBlur={() => {
                borderRef.current?.style.setProperty(
                  'background-color',
                  '#E5E5E5',
                );
              }}
            />
            <img
              src={idCloseHovered ? BlackCloseIcon : GrayCloseIcon}
              alt="close"
              className="absolute right-4 top-[14px] cursor-pointer"
              onMouseEnter={() => setIdCloseHovered(true)}
              onMouseLeave={() => setIdCloseHovered(false)}
              onClick={() => setId('')}
            />
          </div>
          <div className="w-full h-[1.5px] bg-[#E5E5E5]" ref={borderRef}></div>
          <div className="relative w-full">
            <img
              src={PasswordIcon}
              alt="password"
              className="absolute left-4 top-[14px]"
            />
            <Input
              placeholder="비밀번호"
              type="password"
              className="h-[50px] rounded-t-none border-t-0 bg-white px-[54px] text-[16px] focus:border-[1.5px] focus:border-t-0 focus:border-[#0DAA5C]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => {
                borderRef.current?.style.setProperty(
                  'background-color',
                  '#0DAA5C',
                );
              }}
              onBlur={() => {
                borderRef.current?.style.setProperty(
                  'background-color',
                  '#E5E5E5',
                );
              }}
            />
            <img
              src={passwordCloseHovered ? BlackCloseIcon : GrayCloseIcon}
              alt="close"
              className="absolute right-4 top-[14px] cursor-pointer"
              onMouseEnter={() => setPasswordCloseHovered(true)}
              onMouseLeave={() => setPasswordCloseHovered(false)}
              onClick={() => setPassword('')}
            />
          </div>
          <Button
            type="submit"
            className="mt-4 h-[50px] w-full text-[17px] font-semibold"
          >
            로그인
          </Button>
        </form>
        <h1 className="font-suite text-[40px] font-[900] leading-[50px] text-[#013318]">
          KUINSIDE
        </h1>
      </div>
    </div>
  );
}
