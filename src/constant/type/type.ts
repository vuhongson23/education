export type PostTypes = {
  id: string;
  title: string;
  thumbnail: string;
  viewCount: string;
  slug: string;
  status: number;
  authorId: number;
  author: {
    userName: string;
  };
  category: {
    id: number;
    title: string;
    image: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type PostDetailTypes = {
  id: number;
  thumbnail: string;
  title: string;
  slug: string;
  viewCount: number;
  status: number;
  categoryId: number;
  authorId: number;
  content: string;
  author: {
    id: number;
    avatar: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    address: string;
    phoneNumber: string;
    age: number;
    status: number;
    role: number;
    createdAt: string;
    updatedAt: string;
  };
  category: {
    id: number;
    title: string;
    image: string;
    status: number;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};
