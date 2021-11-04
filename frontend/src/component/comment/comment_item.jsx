import React, { memo, useEffect, useState } from 'react';
import styles from './comment_item.module.css';

const CommentItem = memo(({comment}) => {
    
    
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
                    <button className={styles.commentDeleteBtn}> 삭제</button>
                </div>
            </div>
        </li>
    );
});

export default CommentItem;