// /pages/api/me.ts
import { NextApiRequest, NextApiResponse } from 'next';
import * as cookie from 'cookie';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
        return res.status(200).json({ user: null });
    }

    try {
        const response = await axios.get('http://localhost:8089/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        res.status(200).json({ user: response.data });
    } catch (e) {
        console.error(e);
        res.status(200).json({ user: null });
    }
}
