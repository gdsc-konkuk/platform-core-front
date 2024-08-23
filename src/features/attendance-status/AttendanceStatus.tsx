import ErrorPopup from '@/components/ui/ErrorPopup';
import { SelectYearMonth, AttendanceTable } from './AttendanceComponents';
import { useAttendanceStatus } from './hooks/useAttendanceStatus';
import { useSaveAttendances } from './hooks/useSaveAttendances';

export default function AttendanceStatus() {
  const {
    recordsData,
    isLoading,
    error,
    selectedYear,
    selectedMonth,
    handleYearChange,
    handleMonthChange,
  } = useAttendanceStatus();
  const {
    handleSaveClick,
    isEditing,
    setIsEditing,
    handleCheckboxChange,
    editedData,
  } = useSaveAttendances(recordsData, selectedYear, selectedMonth);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {error && <ErrorPopup />}
      <div className="flex justify-center">
        <div className="flex flex-col items-start">
          <h1 className="mb-[2vh] font-['NanumSquareRoundEB'] text-[24px] font-extrabold ">
            출석 현황
          </h1>
          <div className="p-4 border w-[70vw] h-[80vh] rounded-[20px]">
            <div className="flex justify-between">
              <SelectYearMonth
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                handleYearChange={handleYearChange}
                handleMonthChange={handleMonthChange}
              />

              <div className="flex gap-4 self-start">
                {isEditing ? (
                  <button
                    onClick={handleSaveClick}
                    className="self-start bg-white text-[#0DAA5C] hover:text-[#ffffff] font-[500] px-[20px] py-[9px] border border-[#0DAA5C] rounded-[8px] hover:bg-[#0DAA5C] duration-200"
                  >
                    저장
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="self-start bg-white text-[#171719] font-[500] px-[20px] py-[9px] border border-[var(--grey-6,#BEBEBF)] rounded-[8px] hover:bg-[#f7f7f7] duration-200"
                  >
                    수정
                  </button>
                )}
                <button
                  disabled
                  className="self-start bg-white text-[#BEBEBF] font-[500] px-[20px] py-[9px] border border-[var(--grey-6,#BEBEBF)] rounded-[8px]"
                >
                  Export
                </button>
              </div>
            </div>

            <AttendanceTable
              recordsData={recordsData}
              editedData={editedData}
              isEditing={isEditing}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
