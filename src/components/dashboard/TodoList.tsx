import React, { useState } from 'react';
import styles from '@/styles/dashboard/TodoList.module.scss';

interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
    dueDate?: string;
}

interface TodoListProps {
    title?: string;
    maxItems?: number;
}

const TodoList: React.FC<TodoListProps> = ({
                                               title = "오늘의 할일 리스트",
                                               maxItems = 6
                                           }) => {
    const [todos, setTodos] = useState<TodoItem[]>([
        {
            id: 1,
            text: "대시보드 UI 컴포넌트 개발 완료하기",
            completed: false,
            priority: 'high',
            dueDate: '오늘'
        },
        {
            id: 2,
            text: "클라이언트 미팅 준비 및 자료 정리",
            completed: true,
            priority: 'medium',
            dueDate: '어제'
        },
        {
            id: 3,
            text: "API 문서 업데이트 및 테스트 코드 작성",
            completed: false,
            priority: 'medium',
            dueDate: '내일'
        },
        {
            id: 4,
            text: "프로젝트 진행상황 보고서 작성",
            completed: false,
            priority: 'low',
            dueDate: '이번 주'
        },
        {
            id: 5,
            text: "새로운 팀원 온보딩 가이드 준비",
            completed: true,
            priority: 'medium'
        },
        {
            id: 6,
            text: "서버 성능 최적화 작업",
            completed: false,
            priority: 'high',
            dueDate: '긴급'
        }
    ]);

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    };

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case 'high': return '높음';
            case 'medium': return '보통';
            case 'low': return '낮음';
            default: return '';
        }
    };

    const completedCount = todos.filter(todo => todo.completed).length;
    const completionRate = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

    return (
        <div className={styles.todoList}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.progress}>
            <span className={styles.progressText}>
              {completedCount}/{todos.length} 완료 ({completionRate}%)
            </span>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${completionRate}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className={styles.controls}>
                    <button className={styles.controlButton}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                    <button className={styles.controlButton}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="5" r="2" fill="currentColor"/>
                            <circle cx="12" cy="12" r="2" fill="currentColor"/>
                            <circle cx="12" cy="19" r="2" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className={styles.todoItems}>
                {todos.slice(0, maxItems).map((todo, index) => (
                    <div
                        key={todo.id}
                        className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className={styles.todoContent}>
                            <button
                                className={styles.checkbox}
                                onClick={() => toggleTodo(todo.id)}
                            >
                                <div className={styles.checkboxInner}>
                                    {todo.completed && (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M20 6L9 17l-5-5"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </button>

                            <div className={styles.todoDetails}>
                                <p className={styles.todoText}>{todo.text}</p>
                                <div className={styles.todoMeta}>
                  <span
                      className={styles.priority}
                      style={{
                          backgroundColor: `${getPriorityColor(todo.priority)}15`,
                          color: getPriorityColor(todo.priority)
                      }}
                  >
                    {getPriorityLabel(todo.priority)}
                  </span>
                                    {todo.dueDate && (
                                        <span className={styles.dueDate}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                                            {todo.dueDate}
                    </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={styles.todoActions}>
                            <button className={styles.actionButton}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            </button>
                            <button className={styles.actionButton}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.footer}>
                <button className={styles.viewAllButton}>
                    모든 할일 보기 ({todos.length})
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TodoList;