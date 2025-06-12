import React, {useEffect, useState} from 'react';
import styles from '@/styles/Pet.module.scss';
import {FaUserCircle} from "react-icons/fa";
import {FaUserSlash} from "react-icons/fa";
import {MdAdminPanelSettings} from "react-icons/md";
import {useRouter} from "next/router";
import {Pet} from "@/types/petType";


const Index = () => {

    const [users, setUsers] = useState<Pet[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [countResults, setCountResults] = useState(0);
    // member type sort
    const [filter, setFilter] = useState('all');
    // member date sort
    const [isDescendingCreatedAt, setIsDescendingCreatedAt] = useState(true);
    const [isDescendingLastLoginAt, setIsDescendingLastLoginAt] = useState(true);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
    // member search
    const [searchOption, setSearchOption] = useState("name");
    const [searchWord, setSearchWord] = useState("");

    const router = useRouter();
    const handleClick = (userId: number) => {
        router.push(`/admin/member/details/${userId}`);
    };

    const fetchPets = async (page: number, size: number) => {
        const url = `http://localhost:8089/pet/all?page=${page}&size=${size}`;
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data);
        return data;
    }

    const searchPets = async (page: number, size: number, option: string, word: string) => {
        const searchUrl = `http://localhost:8089/pet/search?${option}=${word}&page=${page}&size=${size}&`;
        console.log(searchUrl);
        const res = await fetch(searchUrl);
        const data = await res.json();
        console.log(data.data);
        return data;
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchWord.trim() === "") {
                fetchPets(page, 8).then(data => {
                    setUsers(data.data.content);
                    setTotalPages(data.data.totalPages);
                    setCountResults(data.data.totalElements);
                });
            } else {
                searchPets(page, 8, searchOption, searchWord).then(data => {
                    console.log(searchWord);
                    setUsers(data.data.content);
                    setTotalPages(data.data.totalPages);
                    setCountResults(data.data.totalElements);
                });
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchWord, searchOption, page]);


    return (
        <div className="main-container">

            <article className={styles.article_container}>
                <section className={styles.upper_section}>
                    <div className={styles.search_container}>
                        <div className={styles.select_box}>
                            <select onChange={(e) => setSearchOption(e.target.value)}>
                                <option value="byName">이름</option>
                                <option value="byBreed">품종</option>
                            </select>
                        </div>

                        <input type="text" placeholder="반려견 정보를 입력하세요."
                               onChange={(e) => {
                                   setSearchWord(e.target.value);
                                   setPage(0);
                               }}
                        />
                        <div className={styles.resultBox}> 총 <strong>{countResults}</strong>개의 데이터가 조회되었습니다. </div>
                    </div>

                </section>
                <section className={styles.lower_section}>
                    <div className={styles.user_table}>
                        <div className={`${styles.user_header} ${styles.header}`}>
                            <div>반려견 이름</div>
                            <div>생년월일</div>
                            <div>품종</div>
                            <div>몸무게</div>
                            <div>성별</div>
                            <div>동물등록번호</div>
                        </div>

                        <div className={styles.user_body}>
                            {
                                users.map((pet) => (
                                    <div key={pet.id}
                                         className={`${styles.user_row}`}
                                         onClick={() => {handleClick(pet.memberId)}}>
                                        <div className={styles.user_info}>
                                            <img
                                                className={`${styles.profile_icon}`}
                                                src={`http://localhost:8089/${pet.profileImageUrl}`}
                                                onError={(e) => {
                                                    e.currentTarget.src = 'http://localhost:8089/uploads/petProfile/pic-default.png';
                                                }}
                                                alt="반려견 프로필"
                                            />

                                            <div>
                                                <div><strong>{pet.name}</strong></div>
                                                <div className={styles.email}>{pet.memberUserName}</div>
                                            </div>
                                        </div>
                                        <div>{pet.birthDate}</div>
                                        <div>{pet.petBreed}</div>
                                        <div>{pet.weight} kg</div>
                                        <div>{pet.gender}</div>
                                        <div>{pet.registrationNumber}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/*paging button*/
                    }
                    <div className={styles.paging_button_container}>
                        <button onClick={() => setPage(page - 1)} disabled={page <= 0}>
                            &lt;
                        </button>

                        {
                            [...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={i === page ? styles.active_page : ''}
                                    onClick={() => setPage(i)}
                                >
                                    {i + 1}
                                </button>
                            ))
                        }
                        {/*<span>{page + 1}</span><span>/</span><span>{totalPages}</span>*/}

                        <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>
                            &gt;
                        </button>
                    </div>
                </section>
            </article>
        </div>
    )
        ;
};

export default Index;