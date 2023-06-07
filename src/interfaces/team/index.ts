import { CourseInterface } from 'interfaces/course';
import { MentorshipInterface } from 'interfaces/mentorship';
import { TeamMemberInterface } from 'interfaces/team-member';
import { UserInterface } from 'interfaces/user';

export interface TeamInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  course?: CourseInterface[];
  mentorship?: MentorshipInterface[];
  team_member?: TeamMemberInterface[];
  user?: UserInterface;
  _count?: {
    course?: number;
    mentorship?: number;
    team_member?: number;
  };
}
