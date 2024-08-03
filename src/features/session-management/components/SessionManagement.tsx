import CreateSessionDialog from './CreateSessionDialog';

const sessionData = [
  {
    id: 1,
    title: '이병직 사우로스 1호',
    date: '2024.01.01',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    description: '예시예시예시예시예시예시예시예시예시예시예시예시예시예시예시',
  },
  {
    id: 2,
    title: '이병직 사우로스 1호',
    date: '2024.01.01',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    description: '예시예시예시예시예시예시예시예시예시예시예시예시예시예시예시',
  },
  {
    id: 3,
    title: '이병직 사우로스 1호',
    date: '2024.01.01',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    description: '예시예시예시예시예시예시예시예시예시예시예시예시예시예시예시',
  },
  {
    id: 4,
    title: '이병직 사우로스 1호',
    date: '2024.01.01',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    description: '예시예시예시예시예시예시예시예시예시예시예시예시예시예시예시',
  },
  {
    id: 5,
    title: '이병직 사우로스 1호',
    date: '2024.01.01',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    description: '예시예시예시예시예시예시예시예시예시예시예시예시예시예시예시',
  },
];

export default function SessionManagement() {
  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="font-nanum text-[24px]">세션 운영/관리</h1>
      <CreateSessionDialog />
      <div className="mt-[60px] overflow-scroll scrollbar-hide">
        <div className="grid grid-flow-row grid-auto-fit gap-[22px]">
          {sessionData.map((data) => (
            <div
              key={data.id}
              className="flex h-[325px] w-[328px] flex-col justify-self-center rounded-[10px] border border-[#DADADA] px-[21px] py-[20px]"
            >
              <h1 className="text-[18px] font-semibold text-[#171719]">
                {data.title}
              </h1>
              <span className="mt-[2px] text-[14px] text-[#868687]">
                {data.date}
              </span>
              <img
                src={data.images[0]}
                alt="session"
                className="mt-[10px] h-[150px] w-[286px] rounded-[10px]"
              />
              <p className="mt-[10px] text-[15px] text-[#333335]">
                {data.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
