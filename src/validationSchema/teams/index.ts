import * as yup from 'yup';
import { courseValidationSchema } from 'validationSchema/courses';
import { mentorshipValidationSchema } from 'validationSchema/mentorships';
import { teamMemberValidationSchema } from 'validationSchema/team-members';

export const teamValidationSchema = yup.object().shape({
  name: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  course: yup.array().of(courseValidationSchema),
  mentorship: yup.array().of(mentorshipValidationSchema),
  team_member: yup.array().of(teamMemberValidationSchema),
});
