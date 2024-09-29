import RegistrationForm from '@/components/RegistrationForm';
import Link from 'next/link';

const RegisterPage = () => {
	return (
		<div className="flex flex-col justify-center items-center m-4">
			<RegistrationForm />
			<p className="my-3">
				<Link href="/" className="mx-2 underline">
					Already have an account?
				</Link>
			</p>
		</div>
	);
};

export default RegisterPage;
