import React from 'react';
import styles from './comment_item.module.css';

const CommentItem = (props) => {
            
    
    return(
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
    );
};

export default CommentItem;