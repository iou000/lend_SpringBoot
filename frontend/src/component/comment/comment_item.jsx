import axios from 'axios';
import React, { memo, useEffect, useRef, useState } from 'react';
import styles from './comment_item.module.css';

const CommentItem = memo(({comment, currentUserId}) => {
    
    //수정,삭제버튼 렌더링 조건(현재 userId와 댓글 userId가 같으면 렌더링함)
    const[showUpdateDeleteBtn,setShowUpdateDeleteBtn] = useState(false);
    
    //댓글 수정 렌더링 조건
    const[handleCommentUpdate, setHandleCommentUpdate] = useState(false);

    //수정된 댓글
    const[updateComment, setUpdateComment] = useState('');

    const commentRef = useRef();

    const handleUpdateComment = (e) => {
        e.preventDefault();
        if(!handleCommentUpdate){
            if(window.confirm('댓글을 수정할까요?')) {
                setHandleCommentUpdate(!handleCommentUpdate);
                setUpdateComment(comment.content)
            }
        }
        else {
            if(window.confirm('수정을 취소할까요?')) {
                setHandleCommentUpdate(!handleCommentUpdate);
            }
        }
    }

    const handleDeleteComment = (e) => {
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

    const updateCommentChange = (e) => {
        setUpdateComment(e.target.value);
    }

    //댓글 수정하기 
    const updateCommentSumbit = (e) => {
        axios({
            method: 'put',
            url: `/api/product/comment/${comment.id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            },
            data: {
                "content": updateComment,
            }
        })
        .then(res => {
            alert('댓글을 수정했습니다.');
            window.location.reload();
        })
        .catch(error => alert('수정에 실패했습니다. 다시 시도해 주세요.'))
    }


    useEffect(() => {
        if(comment.user.userId === currentUserId){
            setShowUpdateDeleteBtn(true);
        }
        console.log(comment.id)
    },[currentUserId, comment.user.userId])

    
    return(
        <li className={styles.commentItem}>
            <div className={styles.commentWriter}>
                <span>{comment.user.nickname}</span>
            </div>
            <div className={styles.comment}>
                {!handleCommentUpdate ?
                    <>
                        <div className={styles.commentData}>
                            <span>{comment.content}</span>
                        </div>
                        <div className={styles.commentUpdateDeleteBox}>
                            {showUpdateDeleteBtn &&
                                <>
                                    <button className={styles.commentUpdateBtn} onClick={handleUpdateComment}> 수정</button>
                                    <button className={styles.commentDeleteBtn} onClick={handleDeleteComment}> 삭제</button>
                                </>
                            }
                        </div>
                    </>
                    :
                    <>
                        <div className={styles.commentForm}>
                            <textarea className={styles.commentInput} name="comment" type="text" placeholder="수정할 댓글을 입력해 주세요." 
                            value={updateComment} ref={commentRef} onChange={updateCommentChange}/>
                        </div>
                        <div className={styles.commentUpdateDeleteBox}>
                            <button className={styles.commentUpdateBtn} id={styles.updateCompleteBtn} onClick={updateCommentSumbit}> 재등록</button>
                            <button className={styles.commentDeleteBtn} onClick={handleUpdateComment}> 취소</button>
                        </div>
                    </>
                }

            </div>
        </li>
    );
});

export default CommentItem;