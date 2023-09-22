import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/projects/:path*',
    '/tasks/:path*',
    '/team/:path*',
  ],
};

export default withMiddlewareAuthRequired();
