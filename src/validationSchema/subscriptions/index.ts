import * as yup from 'yup';

export const subscriptionValidationSchema = yup.object().shape({
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  course_id: yup.string().nullable(),
  mentorship_id: yup.string().nullable(),
});
