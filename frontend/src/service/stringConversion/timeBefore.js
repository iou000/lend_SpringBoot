export const timeBefore = (modifiedAt) => {
    const now = new Date();
    const modifiedTime = new Date(modifiedAt);

    if(now - modifiedTime < 0) {
        return `분 전`;
    }

    const betweenSeconds = Math.floor((now.getTime() - modifiedTime.getTime()) / 1000 );
    const betweenMinutes = Math.floor(betweenSeconds / 60);
    const betweenHours = Math.floor(betweenMinutes / 60);
    const betweenDay = Math.floor(betweenHours / 24);
    const betweenMonth = Math.floor(betweenDay / 30);
    const betweenYear = Math.floor(betweenMonth / 12);
    if(betweenYear > 0) {
        return `${betweenYear}년 전`
    }
    else if(betweenMonth > 0) {
        return `${betweenMonth}달 전`
    }
    else if(betweenDay > 0) {
        return `${betweenDay}일 전`
    }
    else if(betweenHours > 0) {
        return `${betweenHours}시간 전`
    }
    else if(betweenMinutes > 0) {
        return `${betweenMinutes}분 전`
    }
    else if(betweenSeconds > 0) {
        return `${betweenSeconds}초 전`
    }

}