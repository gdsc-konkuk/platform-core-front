import { Link, NavLink } from 'react-router-dom';
import Logo from '/logo.png';
import SettingIcon from '/icons/setting-gray.svg';
import BlackAttendaceIcon from '/icons/attendance-black.svg';
import WhiteAttendanceIcon from '/icons/attendance-white.svg';
import BlackStatusIcon from '/icons/status-black.svg';
import WhiteStatusIcon from '/icons/status-white.svg';
import BlackMailIcon from '/icons/mail-black.svg';
import WhiteMailIcon from '/icons/mail-white.svg';
import BlackSessionIcon from '/icons/session-black.svg';
import WhiteSessionIcon from '/icons/session-white.svg';
import { cn } from '@/lib/utils';

const NavData = [
  {
    link: '/app/attendance',
    iconBlack: BlackAttendaceIcon,
    iconWhite: WhiteAttendanceIcon,
    text: '출석 관리',
  },
  {
    link: '/app/status',
    iconBlack: BlackStatusIcon,
    iconWhite: WhiteStatusIcon,
    text: '출석 현황',
  },
  {
    link: '/app/mail',
    iconBlack: BlackMailIcon,
    iconWhite: WhiteMailIcon,
    text: '메일 전송 관리',
  },
  {
    link: '/app/session',
    iconBlack: BlackSessionIcon,
    iconWhite: WhiteSessionIcon,
    text: '세션 운영/관리',
  },
];

export default function NavMenu() {
  return (
    <nav className="absolute left-0 top-0 z-10 h-full w-[300px] bg-[#F3F4EF]">
      <Link to="/app/attendance">
        <img src={Logo} alt="logo" className="mt-[72px] ml-[50px]" />
      </Link>
      <ul className="mt-[75px] flex flex-col gap-[46px]">
        {NavData.map((data) => (
          <NavLink
            to={data.link}
            className={({ isActive }) =>
              cn(
                'w-[210px] h-[52px] flex gap-[18px] pl-12 items-center',
                isActive && 'bg-background rounded-r-[26px]',
              )
            }
          >
            {({ isActive }) => {
              return (
                <>
                  <img
                    src={isActive ? data.iconWhite : data.iconBlack}
                    alt="attendance"
                  />
                  <span
                    className={cn(
                      'text-[17px] font-semibold text-white',
                      isActive ? 'text-white' : 'text-[#333335]',
                    )}
                  >
                    {data.text}
                  </span>
                </>
              );
            }}
          </NavLink>
        ))}
        <div className="flex gap-[18px] pl-12">
          <img src={SettingIcon} alt="setting" />
          <span className="text-[17px] font-semibold text-[#9B9B9C]">설정</span>
        </div>
      </ul>
    </nav>
  );
}
