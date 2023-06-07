import * as yup from 'yup';
import { subscriptionValidationSchema } from 'validationSchema/subscriptions';

export const mentorshipValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  team_id: yup.string().nullable().required(),
  subscription: yup.array().of(subscriptionValidationSchema),
});
