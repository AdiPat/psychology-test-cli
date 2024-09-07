import { UserResponse } from "./user-response";

interface Scorecard {
  id: string;
  responses: UserResponse[];
}

export type { Scorecard };
