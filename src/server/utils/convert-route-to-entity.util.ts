const mapping: Record<string, string> = {
  courses: 'course',
  mentorships: 'mentorship',
  subscriptions: 'subscription',
  teams: 'team',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
