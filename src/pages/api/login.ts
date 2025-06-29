// Next.js API Route
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log('요청 도착:', req.method);
  console.log('req.body 내용:', req.body);

  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  console.log(req.body); // 이거

  try {
    const response = await axios.post('http://localhost:8089/auth/login', {
      username,
      password,
    });

    const token = response.data.accessToken;

    // httpOnly 쿠키로 저장
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
    }));

    res.status(200).json({ message: 'Login success' });
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: 'Login failed' });
  }
}
