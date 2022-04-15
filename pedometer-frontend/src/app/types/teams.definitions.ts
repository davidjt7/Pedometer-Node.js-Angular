export interface Team {
  teamName: string;
  score: number;
  users: User[];
}

export interface User {
  userName: string;
  stepCount: number;
}
