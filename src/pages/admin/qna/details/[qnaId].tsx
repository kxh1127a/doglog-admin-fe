import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import styles from '@/styles/QnaDetails.module.scss';
import {MemberResponse} from '@/types/memberDetailsType';

export default function MemberDetailPage() {
    const mockData = {
        title: '앱에서 반려견 등록이 안돼요',
        date: '2025-05-15',
        content:
            '안녕하세요.\n새로운 반려견을 등록하려고 하는데, 사진 업로드 단계에서 계속 오류가 발생합니다.\n어떤 파일 형식이나 용량 제한이 있는지 알려주시면 감사하겠습니다.\n빠른 답변 부탁드립니다.',
        answer: `안녕하세요, 고객님. 먼저 반려견 등록 과정에서 불편을 드려 죄송합니다.
현재 반려견 사진 업로드 시 지원되는 파일 형식은 JPG, PNG이며, 파일 용량은 최대 5MB까지 가능합니다.
만약 이 조건에 맞는 파일임에도 오류가 발생한다면,
- 앱을 최신 버전으로 업데이트 하셨는지 확인해주시고
- 네트워크 환경이 안정적인지 점검해주시면 감사하겠습니다.

그래도 문제가 계속된다면,
오류 화면의 스크린샷과 함께 사용 중인 기기 정보(기종, OS 버전)를 추가로 보내주시면
더 신속하게 원인 파악과 해결을 도와드리겠습니다.

빠르게 도움드릴 수 있도록 최선을 다하겠습니다.
감사합니다.`,
        answerDate: '2025-05-18',
    };

    const router = useRouter();
    const {qnaId} = router.query;
    const [data, setData] = useState<MemberResponse | null>(null);

    const fetchUserDetails = async (userId: string | string[] | undefined) => {
        if (!userId) return;

        const url = `http://localhost:8089/member/detail/${userId}`;
        const res = await fetch(url);
        const result = await res.json();
        return result.data;


    }

    useEffect(() => {
        if (qnaId) {
            fetchUserDetails(qnaId).then(data => {
                console.log(data);
                setData(data);
            });
        }
    }, [qnaId]);

    if (!data) return <div>Loading...</div>;

    return (
        <div className="main-container">
            <div className={styles.totalContainer}>
                <div className={styles.totalTitle}>
                    <h1 className={styles.heading}>유저 1:1 문의 상세보기</h1>
                </div>
                <div className={styles.wrapper}>

                    <div className={styles.block}>
                        <div className={styles.label}>문의 제목</div>
                        <div className={styles.value}>{mockData.title}</div>
                    </div>

                    <div className={styles.block}>
                        <div className={styles.label}>문의일</div>
                        <div className={styles.value}>{mockData.date}</div>
                    </div>

                    <div className={styles.block}>
                        <div className={styles.label}>문의 내용</div>
                        <div className={styles.content}>{mockData.content}</div>
                    </div>

                    <div className={styles.answerBox}>
                        <div className={styles.answerTitle}>등록된 답변</div>
                        <div className={styles.answerContent}>{mockData.answer}</div>
                        <div className={styles.answerDate}>{mockData.answerDate} 작성</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
