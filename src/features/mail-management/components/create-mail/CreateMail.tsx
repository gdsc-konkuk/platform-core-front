import { Button } from '@/components/ui/button';
import DateTimePicker from '@/components/ui/DateTimePicker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CheckedIcon from '/icons/checked.svg';
import UncheckedIcon from '/icons/unchecked.svg';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import BlackCloseIcon from '/icons/close-black.svg';
import GrayCloseIcon from '/icons/close-gray.svg';

const userData = [
  {
    id: 1,
    name: '박성근',
    email: 'phd0328@gmail.com',
    isChecked: false,
  },
  {
    id: 2,
    name: '박성근',
    email: 'phd0328@gmail.com',
    isChecked: false,
  },
  {
    id: 3,
    name: '박성근',
    email: 'phd0328@gmail.com',
    isChecked: false,
  },
  {
    id: 4,
    name: '박성근',
    email: 'phd0328@gmail.com',
    isChecked: false,
  },
  {
    id: 5,
    name: '박성근',
    email: 'phd0328@gmail.com',
    isChecked: false,
  },
  {
    id: 6,
    name: '박성근',
    email: 'phd0328@gmail.com',
    isChecked: false,
  },
  {
    id: 7,
    name: '박성근',
    email: 'phd0328@gmail.com',
    isChecked: false,
  },
  {
    id: 8,
    name: '박성근',
    email: 'phd0328@gmail.com',
    isChecked: false,
  },
  {
    id: 9,
    name: '박성근',
    email: 'phd0328@gmail.com',
    isChecked: false,
  },
];

export default function CreateMail() {
  const [title, setTitle] = useState('');
  const [users, setUsers] = useState(userData);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nameCloseHovered, setNameCloseHovered] = useState(false);
  const [titleCloseHovered, setTitleCloseHovered] = useState(false);
  const [emailCloseHovered, setEmailCloseHovered] = useState(false);

  return (
    <form className="flex h-full w-full flex-col overflow-y-scroll scrollbar-hide">
      <h1 className="font-nanum text-[24px]">메일 전송 관리</h1>

      <Button className="h-[50px] w-[86px] self-end px-[28px] py-3 text-white">
        저장
      </Button>

      <h1 className="mt-[70px] text-[18px] font-semibold text-[#171719]">
        예약 시간
      </h1>

      <DateTimePicker className="mt-[18px]" />

      <div className="mt-[46px] flex w-full flex-col gap-[18px]">
        <Label
          htmlFor="title"
          className="text-[18px] font-semibold text-[#171719]"
        >
          제목
        </Label>
        <div className="flex items-end gap-[6px]">
          <div className="relative w-1/3">
            <Input
              id="title"
              maxLength={30}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-[44px] rounded-[10px] border border-[#DADADA] bg-white px-[21px] py-[20px] text-[18px] text-[#171719]"
            />
            <img
              src={titleCloseHovered ? BlackCloseIcon : GrayCloseIcon}
              alt="close"
              className="absolute right-4 top-[10px] cursor-pointer"
              onMouseEnter={() => setTitleCloseHovered(true)}
              onMouseLeave={() => setTitleCloseHovered(false)}
              onClick={() => setTitle('')}
            />
          </div>
          <span
            className={cn(
              'text-[14px] text-[#BEBEBF]',
              title.length >= 30 && 'text-[#EA4335]',
            )}
          >{`${title.length}/30`}</span>
        </div>

        <div className="flex flex-col gap-5 mt-[46px]">
          <div className="flex gap-6">
            <div className="flex flex-col gap-[18px]">
              <Label
                htmlFor="name"
                className="text-[18px] font-semibold text-[#171719]"
              >
                이름
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  className="h-[44px] w-[191px] rounded-[10px] border border-[#DADADA] bg-white px-[21px] py-[20px] text-[18px] text-[#171719] pr-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <img
                  src={nameCloseHovered ? BlackCloseIcon : GrayCloseIcon}
                  alt="close"
                  className="absolute right-4 top-[10px] cursor-pointer"
                  onMouseEnter={() => setNameCloseHovered(true)}
                  onMouseLeave={() => setNameCloseHovered(false)}
                  onClick={() => setName('')}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[18px]">
              <Label
                htmlFor="email"
                className="text-[18px] font-semibold text-[#171719]"
              >
                이메일
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  className="h-[44px] w-[317px] rounded-[10px] border border-[#DADADA] bg-white px-[21px] py-[20px] text-[18px] text-[#171719] pr-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <img
                  src={emailCloseHovered ? BlackCloseIcon : GrayCloseIcon}
                  alt="close"
                  className="absolute right-4 top-[10px] cursor-pointer"
                  onMouseEnter={() => setEmailCloseHovered(true)}
                  onMouseLeave={() => setEmailCloseHovered(false)}
                  onClick={() => setEmail('')}
                />
              </div>
            </div>
            <div className="flex gap-[14px] self-end">
              <Button>추가</Button>
              <Button>삭제</Button>
            </div>
          </div>

          <div className="mt-6 flex h-[400px] overflow-y-scroll w-full flex-col rounded-[20px] border border-[#DADADA] scrollbar scrollbar-thumb-[#DADADA] scrollbar-track-transparent">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-white">
                <TableRow className="h-[60px] px-[34px] py-5">
                  <TableHead>
                    <Label htmlFor="check-all">
                      <img
                        src={isCheckedAll ? CheckedIcon : UncheckedIcon}
                        alt="check"
                        className="h-6 w-6 cursor-pointer"
                      />
                    </Label>
                    <Input
                      id="check-all"
                      type="checkbox"
                      checked={isCheckedAll}
                      onChange={(e) => {
                        setUsers(
                          users.map((user) => ({
                            ...user,
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
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="h-[60px] px-[34px] py-5">
                    <TableCell>
                      <Label htmlFor={`check-${user.id}`}>
                        <img
                          src={user.isChecked ? CheckedIcon : UncheckedIcon}
                          alt="check"
                          className="h-6 w-6 cursor-pointer"
                        />
                      </Label>
                      <Input
                        id={`check-${user.id}`}
                        type="checkbox"
                        checked={user.isChecked}
                        onChange={(e) =>
                          setUsers(
                            users.map((u) =>
                              u.id === user.id
                                ? { ...u, isChecked: e.target.checked }
                                : u,
                            ),
                          )
                        }
                        className="hidden"
                      />
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <Textarea
          className="mt-[38px] h-[500px] w-full rounded-[10px] border border-[#DADADA] bg-white px-[21px] py-[20px] text-[18px] text-[#171719] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="내용을 입력해주세요."
        />
      </div>
    </form>
  );
}
