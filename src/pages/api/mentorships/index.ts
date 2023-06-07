import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { mentorshipValidationSchema } from 'validationSchema/mentorships';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getMentorships();
    case 'POST':
      return createMentorship();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMentorships() {
    const data = await prisma.mentorship
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'mentorship'));
    return res.status(200).json(data);
  }

  async function createMentorship() {
    await mentorshipValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.subscription?.length > 0) {
      const create_subscription = body.subscription;
      body.subscription = {
        create: create_subscription,
      };
    } else {
      delete body.subscription;
    }
    const data = await prisma.mentorship.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
