import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
	const session = await auth();

	if (!session?.user) redirect('/');

	return (
		<div className="flex flex-col items-center m-4">
			<h1 className="text-3xl my-2">{session?.user?.name}</h1>

			<Image src={session?.user?.image} width={72} height={72}></Image>
		</div>
	);
};

export default Dashboard;
