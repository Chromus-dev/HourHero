import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

export default function Login() {
	return (
		<div className="flex flex-col justify-center items-center m-4">
			<h1 className="text-3xl my-3">Hey, time to sign in!</h1>
			<LoginForm />

			<p className="my-3">
				<Link href="register" className="mx-2 underline">
					Don&apos;t have an account?
				</Link>
			</p>
		</div>
	);
}
