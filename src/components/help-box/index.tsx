import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Owner'];
  const roles = ['Owner', 'ContentManager', 'Collaborator', 'User'];
  const applicationName = 'Prolific';
  const tenantName = 'Team';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Owner:
1. As an Owner, I want to create a Team, so that I can manage my content creators and collaborators.
2. As an Owner, I want to invite ContentManagers and Collaborators to join my Team, so that they can help me create and manage content.
3. As an Owner, I want to set subscription pricing for my premium content, so that I can monetize my content.
4. As an Owner, I want to approve or reject content submitted by ContentManagers and Collaborators, so that I can maintain quality control.

ContentManager:
1. As a ContentManager, I want to create and edit courses, so that I can provide valuable content to subscribers.
2. As a ContentManager, I want to submit content for approval, so that the Owner can review and approve it for publication.
3. As a ContentManager, I want to manage one-on-one mentorship sessions, so that I can provide personalized support to subscribers.

Collaborator:
1. As a Collaborator, I want to contribute content to courses, so that I can help create valuable content for subscribers.
2. As a Collaborator, I want to submit content for approval, so that the Owner can review and approve it for publication.

User:
1. As a User, I want to view available courses and mentorship options, so that I can decide which content to subscribe to.
2. As a User, I want to subscribe to premium content, so that I can access valuable courses and mentorship.
3. As a User, I want to manage my subscriptions, so that I can update or cancel my subscriptions as needed.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
