import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import styles from '@/styles/QnaDetails.module.scss';
import {RiArrowGoBackLine} from "react-icons/ri";
import {QnaDetailResponse} from '@/types/qnaDetailsType';
import {FiEdit3} from "react-icons/fi"; // ✨ edit 아이콘
import {FaSave} from "react-icons/fa"; // ✨ 저장 아이콘 (선택)

const QnaDetailPage = () => {

    const router = useRouter();
    const {qnaId} = router.query;
    const [data, setData] = useState<QnaDetailResponse | null>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [answerText, setAnswerText] = useState("");
    const [savedAnswer, setSavedAnswer] = useState("");

    const handleRegisterClick = async () => {
        setSavedAnswer(answerText);
        setIsEditing(false);

        // 🔜 여기에 저장 API 연동 가능
        // await fetch('/api/save-answer', { method: 'POST', body: JSON.stringify(answerText) });
        try {
            const res = await fetch('http://localhost:8089/qna/details/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId: qnaId,
                    comment: answerText
                })
            });

            if (!res.ok) throw new Error("등록 실패");

            const result = await res.text(); // 또는 res.json()
            console.log(result); // '답변이 등록되었습니다.'

            setSavedAnswer(answerText);
            setIsEditing(false);
            alert("답변이 등록되었습니다!");
        } catch (err) {
            console.error(err);
            alert("답변 등록에 실패했습니다.");
        }
    };


    const fetchUserDetails = async (qnaId: string | string[] | undefined) => {
        if (!qnaId) return;

        const url = `http://localhost:8089/qna/details/${qnaId}`;
        const res = await fetch(url);
        const result = await res.json();
        return result.data;
    }

    useEffect(() => {
        if (qnaId) {
            fetchUserDetails(qnaId).then(data => {
                console.log(data);
                setData(data);
                if(data.answerComment != null) {
                    setSavedAnswer(data.answerComment);
                    setAnswerText(data.answerComment);
                }
            });
        }
    }, [qnaId]);

    if (!data) return <div>Loading...</div>;

    return (
        <div className="main-container">
            <div className={styles.backward} onClick={() => {
                // router.push('/admin/member');
                router.back();
            }}>
                <RiArrowGoBackLine/>
            </div>

            <div className={styles.totalContainer}>

                <div className={styles.totalTitle}>

                    <h1 className={styles.heading}>유저 1:1 문의 상세보기</h1>
                </div>

                <div className={styles.wrapper}>
                    <div className={styles.block}>
                        <div className={styles.label}>문의 제목</div>
                        <div className={styles.value}>{data?.askTitle}</div>
                    </div>

                    <div className={styles.block}>
                        <div className={styles.label}>작성자</div>
                        <div className={styles.value}>{data?.writer}</div>
                    </div>

                    <div className={styles.block}>
                        <div className={styles.label}>문의일</div>
                        <div className={styles.value}>{data?.editDate}</div>
                    </div>

                    <div className={styles.block}>
                        <div className={styles.label}>문의 내용</div>
                        <div className={styles.content}>
                            {data?.askContent.split('\n').map((line, idx) => (
                                <p key={idx}>{line}</p>
                            ))}
                        </div>
                    </div>

                    <div className={data.isAnswer ? styles.answerBoxDone : styles.answerBox}>
                        <div className={styles.answerTitle}>
                            등록된 답변
                            {!isEditing && (
                                <span className={data.isAnswer ? styles.editIconDone : styles.editIcon} onClick={() => setIsEditing(true)}>
                                    <FiEdit3/>
                                </span>
                            )}
                        </div>

                        {isEditing ? (
                            <>
                                <textarea
                                    className={styles.textarea}
                                    value={answerText}
                                    onChange={(e) => setAnswerText(e.target.value)}
                                    rows={8}
                                />
                                <button className={styles.submitButton} onClick={handleRegisterClick}>
                                    등록하기
                                </button>
                            </>
                        ) : (
                            <div className={styles.answerContent}>{savedAnswer}</div>
                        )}

                        <div className={styles.answerDate}>{data?.answerDate} 작성</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QnaDetailPage;