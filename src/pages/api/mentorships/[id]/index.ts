import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { mentorshipValidationSchema } from 'validationSchema/mentorships';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.mentorship
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMentorshipById();
    case 'PUT':
      return updateMentorshipById();
    case 'DELETE':
      return deleteMentorshipById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMentorshipById() {
    const data = await prisma.mentorship.findFirst(convertQueryToPrismaUtil(req.query, 'mentorship'));
    return res.status(200).json(data);
  }

  async function updateMentorshipById() {
    await mentorshipValidationSchema.validate(req.body);
    const data = await prisma.mentorship.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteMentorshipById() {
    const data = await prisma.mentorship.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
