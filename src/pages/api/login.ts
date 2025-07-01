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
    const response = await axios.post('http://localhost:8089/auth/admin/login', {
      username,
      password,
    });

    console.log(response.data);
    const token = response.data.accessToken;

    console.log('token', token);

    // httpOnly 쿠키로 저장
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60,
      path: '/',
    }));

    const data = await response.data;
    console.log(data);
    res.status(200).json(response.data);
    console.log('로그인 성공 응답 보냄');
  } catch (error) {
    // console.error(error);
    // console.log(error.response.data);
    // res.status(401).json(response.data);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const data = error.response?.data || { message: 'Unknown error' };

      // 여기서 백엔드가 보낸 message, code 등을 그대로 전달
      res.status(status).json(data);
    } else {
      res.status(500).json({ message: 'Unexpected error' });
    }
  }
}
