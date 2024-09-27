import { doSocialLogin } from '@/app/actions/userAuthentication';

// import { cookies } from 'next/headers';

// const csrfToken = cookies().get('authjs.csrf-token')?.value ?? '';

const SocialLogin = () => {
	return (
		<>
			<form action={doSocialLogin}>
				{/* <input type="hidden" name="csrfToken" value={csrfToken} /> */}

				<button
					className="bg-green-400 text-white p-1 rounded-md m-1 text-1g"
					type="submit"
					name="action"
					value="google"
				>
					Sign In With Google
				</button>
			</form>
		</>
	);
};

export default SocialLogin;
