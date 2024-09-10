const users = [
	{
		email: 'abc@gmail.com',
		password: 'password',
	},
	{
		email: 'def@gmail.com',
		password: 'password',
	},
	{
		email: 'ghi@gmail.com',
		password: 'password',
	},
];

export const getUserByEmail = (email: string) => {
	const found = users.find((u) => u.email == email);
	return found;
};
