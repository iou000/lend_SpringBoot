import React from 'react';
import CommentItem from './comment_item';
import styles from './comment_list.module.css';

const CommentList = ({commentInput, commentChange, commentSubmit}) => {
            

    return(
        <div className={styles.commentBox}>
            <ul className={styles.commentList}>
                
                <CommentItem />
                
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