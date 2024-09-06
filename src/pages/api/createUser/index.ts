import { createUser } from '@lib/mongo/users';
import type { NextApiRequest, NextApiResponse } from 'next';

// @ts-ignore
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		try {
			const { _id, error } = await createUser(req.body);
			if (error) throw new Error(error);

			return res.status(200).json({ _id });
		} catch (error) {
			if (error instanceof Error)
				return res.status(500).json({ error: error.message });
		}
	}

	res.setHeader('Allow', ['POST']);
	res.status(425).end(`Method ${req.method} not allowed`);
};

export default handler;
