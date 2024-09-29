export default function Fail() {
  return (
    <div className="flex flex-col justify-center gap-6 p-20 w-full h-full">
      <h1 className="text-3xl text-red-500 font-extrabold text-center">
        Error
      </h1>
      <h1 className="font-bold text-center">출석 체크에 실패했습니다.</h1>
    </div>
  );
}
