import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Logout from '@/components/Logout';

const Dashboard = async () => {
	const session = await auth();

	if (!session?.user) redirect('/');

	console.log(session?.user);

	return (
		<div className="flex flex-col items-center m-4">
			<h1 className="text-3xl my-2">{session?.user?.name}</h1>

			<Image
				//@ts-ignore
				src={session?.user?.image}
				//@ts-ignore
				alt={session?.user?.name}
				width={72}
				height={72}
				className="rounded-full"
			></Image>

			<Logout />
		</div>
	);
};

export default Dashboard;
