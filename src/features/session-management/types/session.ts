export interface Session {
  id: number;
  title: string;
  content: string;
  startAt: string;
  thumbnail: string;
}

export interface SessionDetail {
  id: number;
  title: string;
  content: string;
  startAt: string;
  endAt: string;
  images: string[];
  retrospect: string;
  location: string;
}
