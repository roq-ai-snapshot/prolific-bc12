import { UserInterface } from 'interfaces/user';
import { CourseInterface } from 'interfaces/course';
import { MentorshipInterface } from 'interfaces/mentorship';

export interface SubscriptionInterface {
  id?: string;
  user_id: string;
  course_id?: string;
  mentorship_id?: string;
  created_at?: Date;
  updated_at?: Date;

  user?: UserInterface;
  course?: CourseInterface;
  mentorship?: MentorshipInterface;
  _count?: {};
}
