import React from 'react';
import styles from './comment_list.module.css';

const CommentList = ({commentInput, commentChange, commentSubmit}) => {
            

    return(
        <div className={styles.commentInputBox}>
                    {/* 댓글리스트 컴포넌트로 만들어줘야함 */}
                    <ul className={styles.commentList}>
                        {/* 댓글 컴포넌트로 만들어줘야함*/}
                        <li className={styles.commentItem}>
                            <div className={styles.commentWriter}>
                                댓글 작성자
                            </div>
                            <div className={styles.comment}>
                                <div className={styles.commentData}>
                                댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글
                                </div>
                            <div className={styles.commentUpdate}>
                                <button className={styles.commentUpdateBtn}> 수정</button>
                                <button className={styles.commentDeleteBtn}> 삭제</button>
                            </div>
                            </div>
                        </li>

                        <li className={styles.commentItem}>
                            <div className={styles.commentWriter}>
                                댓글 작성자
                            </div>
                            <div className={styles.comment}>
                                <div className={styles.commentData}>
                                댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글
                                </div>
                            <div className={styles.commentUpdate}>
                                <button className={styles.commentUpdateBtn}> 수정</button>
                                <button className={styles.commentDeleteBtn}> 삭제</button>
                            </div>
                            </div>
                        </li>

                        {/* 댓글 입력 폼 */}
                        <form className={styles.commentForm} onSubmit={commentSubmit}>
                            <textarea className={styles.commentInput} name="comment" type="text" placeholder="댓글을 입력해 주세요." 
                            value={commentInput} onChange={commentChange}/>
                            <button className={styles.commentSubmitBtn}>댓글쓰기</button>
                        </form>
                    </ul>
        </div>
    );
};

export default CommentList;