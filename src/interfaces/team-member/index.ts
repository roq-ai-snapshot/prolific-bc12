import { TeamInterface } from 'interfaces/team';
import { UserInterface } from 'interfaces/user';

export interface TeamMemberInterface {
  id?: string;
  team_id: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;

  team?: TeamInterface;
  user?: UserInterface;
  _count?: {};
}
