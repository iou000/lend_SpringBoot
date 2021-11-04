import React, { memo } from 'react';
import CommentItem from './comment_item';
import styles from './comment_list.module.css';

const CommentList = memo(({comments}) => {
            

    return(
        <div className={styles.commentBox}>
            <ul className={styles.commentList}>
                {
                    comments.map(comment => 
                        <CommentItem 
                            key={comment.id}
                            comment={comment}
                        />
                    )
                }
            </ul>
        </div>
    );
});

export default CommentList;