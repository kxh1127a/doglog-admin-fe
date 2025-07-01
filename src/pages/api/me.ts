// /pages/api/me.ts
import { NextApiRequest, NextApiResponse } from 'next';
import * as cookie from 'cookie';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("토큰 유저정보 가져오기");
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
        const data = response.data;
        console.log("정보 가져오기 완료", data);
        res.status(200).json({ user: response.data });
    } catch (e) {
        console.error('error', e);
        res.status(200).json({ user: null });
    }
}
