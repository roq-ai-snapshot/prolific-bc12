import * as yup from 'yup';

export const teamMemberValidationSchema = yup.object().shape({
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  team_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
