import { SubscriptionInterface } from 'interfaces/subscription';
import { TeamInterface } from 'interfaces/team';

export interface CourseInterface {
  id?: string;
  title: string;
  description: string;
  team_id: string;
  created_at?: Date;
  updated_at?: Date;
  subscription?: SubscriptionInterface[];
  team?: TeamInterface;
  _count?: {
    subscription?: number;
  };
}
