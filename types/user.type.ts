type UserType = {
  id: number;
  name: string;
  username: string | null;
  bio: string | null;
  email: string;
  dateOfBirth: string | null;
  emailVerified: boolean | null;
  image: string;
  coverImage: string | null;
  profileImage: string | null;
  createdAt: string;
  updatedAt: string;
  followingIds: number[];
  hasNotification: boolean | null;
  isVerified: boolean;
  plan: string;
  followersCount?: number;
};
