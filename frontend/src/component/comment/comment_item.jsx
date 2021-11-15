import axios from 'axios';
import React, { memo, useEffect, useState } from 'react';
import styles from './comment_item.module.css';

const CommentItem = memo(({comment, currentUserId}) => {
    
    //수정,삭제버튼 렌더링 조건(현재 userId와 댓글 userId가 같으면 렌더링함)
    const[showUpdateDeleteBtn,setShowUpdateDeleteBtn] = useState(false);

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

    useEffect(() => {
        console.log(comment.user.userId)
        console.log(currentUserId)
        if(comment.user.userId === currentUserId){
            setShowUpdateDeleteBtn(true);
        }

    },[])

    
    return(
        <li className={styles.commentItem}>
            <div className={styles.commentWriter}>
                <span>{comment.user.nickname}</span>
            </div>
            <div className={styles.comment}>
                <div className={styles.commentData}>
                    <span>{comment.content}</span>
                </div>
                    <div className={styles.commentUpdate}>
                        {showUpdateDeleteBtn &&
                            <>
                                <button className={styles.commentUpdateBtn}> 수정</button>
                                <button className={styles.commentDeleteBtn} onClick={handleDelete}> 삭제</button>
                            </>
                        }
                    </div>
            </div>
        </li>
    );
});

export default CommentItem;