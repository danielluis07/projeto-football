type CurrentUser = {
  currentUser: Array<{
    apikey: string;
    createdAt: string;
    email: string;
    id: string;
    name: string;
    updatedAt: string;
  }>;
};

type UserProps = {
  currentUser: User | null;
};
