import { getUsers } from '@lib/mongo/users';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST' || req.method === 'GET') {
		try {
			const { users, error } = await getUsers(req.body || {});
			if (error) throw new Error(error);

			return res.status(200).json({ users });
		} catch (error) {
			if (error instanceof Error)
				return res.status(500).json({ error: error.message });
		}
	}

	res.setHeader('Allow', ['POST', 'GET']);
	res.status(425).end(`Method ${req.method} not allowed`);
};

export default handler;
