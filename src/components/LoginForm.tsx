import { doSocialLogin, doLogout } from '@/app/actions/userAuthentication';

const LoginForm = () => {
	return (
		<form action={doSocialLogin}>
			<button
				className="bg-green-400 text-white p-1 rounded-md m-1 text-1g"
				type="submit"
				name="action"
				value="googleLogin"
			>
				Sign In With Google
			</button>
		</form>
	);
};

export default LoginForm;
