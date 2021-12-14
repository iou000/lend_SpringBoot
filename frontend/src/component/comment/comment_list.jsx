import React, { memo, useEffect, useState } from 'react';
import { getCurrentUser } from '../../service/getCurrentUser';
import CommentItem from './comment_item';
import styles from './comment_list.module.css';

const CommentList = memo(({comments}) => {
    
    const [currentUserId, setCurrentUserId] = useState();

    useEffect(() => {
        getCurrentUser()
        .then(res => setCurrentUserId(res.data.userId))
        .catch(error => setCurrentUserId(null))

    },[])

    return(
        <div className={styles.commentBox}>
            <ul className={styles.commentList}>
                {
                    comments.map(comment => 
                        <CommentItem 
                            key={comment.id}
                            comment={comment}
                            currentUserId={currentUserId}
                        />
                    )
                }
            </ul>
        </div>
    );
});

export default CommentList;