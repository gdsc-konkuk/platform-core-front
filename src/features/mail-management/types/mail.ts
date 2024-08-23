export interface Mail {
  id: number;
  subject: string;
  receiverInfos: {
    email: string;
    name: string;
  }[];
  sendAt: string;
  isSent: boolean;
}

export interface MailData extends Mail {
  isChecked?: boolean;
}
