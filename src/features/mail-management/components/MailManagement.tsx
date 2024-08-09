import { Button } from '@/components/ui/button';
import PencilIcon from '/icons/pencil.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import CheckedIcon from '/icons/checked.svg';
import UncheckedIcon from '/icons/unchecked.svg';
import { Input } from '@/components/ui/input';

const mailData = [...Array(15).keys()].map((i) => ({
  id: i + 1,
  name: '박성근',
  email: 'phd0328@gmail.com',
  time: '2024.10.14(목) 23:30',
  title: '합격을 축하드립니다.',
  isChecked: false,
}));

export default function MailManagement() {
  const [mails, setMails] = useState(mailData);
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="font-nanum text-[24px]">메일 전송 관리</h1>

      <div className="flex gap-4 mt-3 self-end">
        <Link to="/app/mail/create">
          <Button className="flex items-center h-[50px] w-[142px]">
            <img src={PencilIcon} alt="edit" className="w-5 h-5 mr-2" />
            <span>작성하기</span>
          </Button>
        </Link>
        <Button className="w-[86px] h-[50px] border border-primary bg-white px-[28px] py-[12px] text-primary hover:bg-[#EBEBEF]">
          삭제
        </Button>
      </div>

      <div className="flex flex-col border border-[#DADADA] rounded-[20px] w-full h-full mt-6 overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-[#DADADA]">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow className="h-[60px] px-[34px] py-5">
              <TableHead>
                <Label htmlFor="check-all">
                  <img
                    src={isCheckedAll ? CheckedIcon : UncheckedIcon}
                    alt="check"
                    className="w-6 h-6 cursor-pointer"
                  />
                </Label>
                <Input
                  id="check-all"
                  type="checkbox"
                  checked={isCheckedAll}
                  onChange={(e) => {
                    setMails(
                      mails.map((mail) => ({
                        ...mail,
                        isChecked: e.target.checked,
                      })),
                    );
                    setIsCheckedAll(e.target.checked);
                  }}
                  className="hidden"
                />
              </TableHead>
              <TableHead>No</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>예약 시간</TableHead>
              <TableHead>제목</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {mails.map((mail) => (
              <TableRow key={mail.id} className="h-[60px] px-[34px] py-5">
                <TableCell>
                  <Label htmlFor={`check-${mail.id}`}>
                    <img
                      src={mail.isChecked ? CheckedIcon : UncheckedIcon}
                      alt="check"
                      className="w-6 h-6 cursor-pointer"
                    />
                  </Label>
                  <Input
                    id={`check-${mail.id}`}
                    type="checkbox"
                    checked={mail.isChecked}
                    onChange={(e) =>
                      setMails(
                        mails.map((m) =>
                          m.id === mail.id
                            ? { ...m, isChecked: e.target.checked }
                            : m,
                        ),
                      )
                    }
                    className="hidden"
                  />
                </TableCell>
                <TableCell>{mail.id}</TableCell>
                <TableCell>{mail.name}</TableCell>
                <TableCell>{mail.email}</TableCell>
                <TableCell>{mail.time}</TableCell>
                <TableCell>{mail.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
