import { getUsers } from '@lib/mongo/users';

// @ts-ignore
const handler = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const { users, error } = await getUsers();
			if (error) throw new Error(error);

			return res.status(200).json({ users });
		} catch (error) {
			if (error instanceof Error)
				return res.status(500).json({ error: error.message });
		}
	}

	res.setHeader('Allow', ['GET']);
	res.status(425).end(`Method ${req.method} not allowed`);
};

export default handler;
