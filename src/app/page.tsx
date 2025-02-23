import Header from '@/components/custom/header';
import { getSession } from './api/auth/[...nextauth]/options';

export default async function Home() {
    const session = await getSession();
    console.log('session from home: ', { session });
    return (
        <main className="container mx-auto">
            <Header session={session} />
            <div className="grid place-items-center h-full min-h-[80vh]">
                <div className="text-center">
                    <h1 className={'text-5xl font-extrabold'}>Pitch Perfect</h1>
                    <p className={'text-xl font-thin'}>Crazy Presentation builder</p>
                </div>
            </div>
        </main>
    );
}
