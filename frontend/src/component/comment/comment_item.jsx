import axios from 'axios';
import React, { memo } from 'react';
import styles from './comment_item.module.css';

const CommentItem = memo(({comment}) => {
    
    const handleDelete = (e) => {
        e.preventDefault();
        if(window.confirm('댓글을 삭제할까요?')) {
            axios({
                method: 'delete',
                url: `/api/product/comment/${comment.id}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                }
            })
            .then(res => {
                alert('댓글이 삭제되었습니다.')
                window.location.reload();
            })
            .catch(error => alert('댓글 삭제 실패..'))
        }
    }

    

    
    return(
        <li className={styles.commentItem}>
            <div className={styles.commentWriter}>
                {comment.user.nickname}
            </div>
            <div className={styles.comment}>
                <div className={styles.commentData}>
                    {comment.content}
                </div>
                <div className={styles.commentUpdate}>
                    <button className={styles.commentUpdateBtn}> 수정</button>
                    <button className={styles.commentDeleteBtn} onClick={handleDelete}> 삭제</button>
                </div>
            </div>
        </li>
    );
});

export default CommentItem;