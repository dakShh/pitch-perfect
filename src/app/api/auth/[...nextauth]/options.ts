import { prisma } from '@/lib/prismaClient';
import { User } from '@prisma/client';
import { AuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (!user.email) return false;

            let existingUser = await prisma.user.findUnique({
                where: {
                    email: user.email,
                },
            });

            if (!existingUser) {
                console.log('creating an account..');
                existingUser = await prisma.user.create({
                    data: {
                        email: user.email,
                        profileImage: user?.image || null,
                        name: user?.name || '',
                        provider: account?.provider || null,
                    },
                });
            }
            if (account) account.user = existingUser;
            return true;
        },

        async jwt({ token, account }) {
            if (account) token.user = account.user;
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as User;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
