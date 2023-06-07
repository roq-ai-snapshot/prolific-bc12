import axios from 'axios';
import queryString from 'query-string';
import { MentorshipInterface } from 'interfaces/mentorship';
import { GetQueryInterface } from '../../interfaces';

export const getMentorships = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/mentorships${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMentorship = async (mentorship: MentorshipInterface) => {
  const response = await axios.post('/api/mentorships', mentorship);
  return response.data;
};

export const updateMentorshipById = async (id: string, mentorship: MentorshipInterface) => {
  const response = await axios.put(`/api/mentorships/${id}`, mentorship);
  return response.data;
};

export const getMentorshipById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/mentorships/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMentorshipById = async (id: string) => {
  const response = await axios.delete(`/api/mentorships/${id}`);
  return response.data;
};
