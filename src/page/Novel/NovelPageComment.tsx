import './NovelPageComment.less';
import {Button, Image, Pagination, showMessage, withLockTime} from "../../component/mika-ui";
import {useStore} from "../../common/mika-store";
import {memo, useCallback, useRef, useState} from "react";
import {addComment, deleteComment, getComments} from "../../common/novel";
import InfinityList from "../../component/mika-ui/InfinityList/InfinityList.tsx";
import {useUser} from "../../common/user";

type NovelPageCommentReply = {
    parent?: string;

    id: string;
    time: string;
    content: string;
    replyTo: {
        id: string;
        name: string;
    }
    user: {
        id: string;
        name: string;
        avatar: string;
    }
};


type NovelPageCommentProps = {
    id: string;
    time: string;
    content: string;
    user: {
        id: string;
        name: string;
        avatar: string;
    };
    reply: NovelPageCommentReply[];
}

const NovelPageCommentBox = memo((props: NovelPageCommentProps & { novelId: string }) => {
    const [currentInputIndex, setCurrentInputIndex] = useStore('novel-page-current-input-index', -1);
    const [replyTo, setReplyTo] = useStore('novel-page-reply-to', '-1');
    const [comment, setComment] = useStore<NovelPageCommentProps[]>(`novel-page-comment`);
    const [total, setTotal] = useStore<number>(`novel-page-comment-total`, 0);

    const userInfo = useUser();

    const _deleteComment = useCallback(async () => {
        return deleteComment(props.id).then(() => {
            showMessage({children: '删除成功'});
            setComment(comment.filter((item) => item.id !== props.id));
            setTotal(total - 1);
        }, () => {
            showMessage({children: '删除失败'});
        });
    }, [comment, props.id, setComment, setTotal, total]);

    return (
        <div className="mika-novel-page-comment-box">
            <div className="mika-novel-page-comment-box-container">
                <Image lazy src={props.user.avatar} width={36} height={36} error="/defaultAvatar.webp"/>
                <div>
                    <h3>{props.user.name}</h3>
                    <p>{props.time}</p>
                    <div className="mika-novel-page-comment-box-content">
                        <p>{props.content}</p>
                    </div>
                    <div>
                        <Button onClick={() => {
                            if (currentInputIndex === parseInt(props.id)) {
                                setCurrentInputIndex(-1);
                                setReplyTo('-1');
                            } else {
                                setCurrentInputIndex(parseInt(props.id));
                                setReplyTo(props.id);
                            }
                        }} style={{paddingLeft: 0}} styleType="link">回复</Button>
                        {userInfo?.userId.toString() === props.user.id &&
                            <Button styleType="link" onClick={_deleteComment}>删除</Button>}
                    </div>
                    <NovelPageCommentReplyBox reply={props.reply} id={props.id}/>
                </div>

            </div>
            {currentInputIndex === parseInt(props.id) && <NovelPageCommentInput nid={props.novelId} toId={replyTo}/>}
        </div>
    );
});

const NovelPageCommentReply = (props: NovelPageCommentReply) => {
    const [currentInputIndex, setCurrentInputIndex] = useStore('novel-page-current-input-index', -1);
    const [_replyTo, setReplyTo] = useStore('novel-page-reply-to', '-1');
    const [comment, setComment] = useStore<NovelPageCommentProps[]>(`novel-page-comment`);
    const [total, setTotal] = useStore<number>(`novel-page-comment-total`, 0);

    const userInfo = useUser();
    const _deleteComment = useCallback(async () => {
        return deleteComment(props.id).then(() => {
            showMessage({children: '删除成功'});
            if (props.parent != null && props.parent !== '-1') {
                const item = findCommentItem(comment, props.parent);
                if (item) {
                    item.parent.reply = item.parent.reply.filter((item) => item.id !== props.id);
                    setComment([...comment]);
                    setTotal(total - 1);
                }
            }
        }, () => {
            showMessage({children: '删除失败'});
        });
    }, [comment, props.id, props.parent, setComment, setTotal, total]);

    return (
        <div className="mika-novel-page-comment-box reply">
            <div className="mika-novel-page-comment-box-container">
                <Image src={props.user.avatar} width={30} height={30} error="/defaultAvatar.webp"/>
                <div>
                    <h3>{props.user.name}</h3>
                    <p>{props.time}</p>
                    <div className="mika-novel-page-comment-box-content">
                        <p>回复<span>@{props.replyTo.name}</span>: {props.content}</p>
                    </div>
                    <div>
                        <Button onClick={() => {
                            if (currentInputIndex === parseInt(props.parent as string)) {
                                setCurrentInputIndex(-1);
                                setReplyTo('-1');
                            } else {
                                setCurrentInputIndex(parseInt(props.parent as string));
                                setReplyTo(props.id);
                            }
                        }} style={{paddingLeft: 0}} styleType="link">回复</Button>
                        {userInfo?.userId.toString() === props.user.id &&
                            <Button styleType="link" onClick={_deleteComment}>删除</Button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

const NovelPageCommentReplyBox = (props: { reply?: NovelPageCommentReply[], id: string }) => {
    const [activePage, setActivePage] = useState(1);
    if (!props.reply) {
        return null;
    }

    return (
        <div className="mika-novel-page-comment-reply-box">
            {props.reply.slice((activePage - 1) * 5, activePage * 5).map((reply, index) => {
                return (
                    <NovelPageCommentReply key={index} {...reply} parent={props.id}/>
                )
            })}
            {props.reply && props.reply.length > 5 &&
                <Pagination style={{
                    width: "fit-content",
                }}
                            onChange={(page) => setActivePage(page)} pageNum={Math.ceil(props.reply.length / 5)}/>}
        </div>
    );
}

const findCommentItem = (comment: NovelPageCommentProps[], toId: string) => {
    for (let i = 0; i < comment.length; i++) {
        if (comment[i].id === toId) {
            return {
                parent: comment[i],
                toUserId: comment[i].user.id,
                toUserName: comment[i].user.name,
            }
        }
        for (let j = 0; j < comment[i].reply?.length; j++) {
            if (comment[i].reply![j].id === toId) {
                return {
                    parent: comment[i],
                    toUserId: comment[i].reply![j].user.id,
                    toUserName: comment[i].reply![j].user.name,
                };
            }
        }
    }
    return undefined;
}

const NovelPageCommentInput = memo((props: {
    toId: string,
    nid: string,
}) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const [comment, setComment] = useStore<NovelPageCommentProps[]>(`novel-page-comment`);
    const [_replyTo, setReplyTo] = useStore('novel-page-reply-to', '-1');
    const [_currentInputIndex, setCurrentInputIndex] = useStore('novel-page-current-input-index', -1);
    const userInfo = useUser();
    const reply = useCallback(async () => {
        const content = ref.current?.value;
        if (!content) return;
        ref.current!.value = '';
        ref.current!.blur();

        return addComment(props.nid, props.toId, content).then((res) => {
            if (res.code === 401) {
                showMessage({children: '请先登录'});
                return;
            }

            if (res.code !== 200) {
                showMessage({children: '评论失败'});
                return;
            }

            if (props.toId !== '-1') {
                const item = findCommentItem(comment, props.toId);
                item?.parent.reply.push({
                    id: (res.data as number).toString(),
                    time: new Date().toLocaleString(),
                    content: content,
                    replyTo: {
                        id: item.toUserId,
                        name: item.toUserName
                    },
                    user: {
                        id: userInfo?.userId.toString() || '0',
                        name: userInfo?.nickname || '我',
                        avatar: userInfo?.avatar || '/defaultAvatar.webp'
                    }
                });
                setComment([...comment]);
            } else {
                setComment([...comment, {
                    id: (res.data as number).toString(),
                    time: new Date().toLocaleString(),
                    content: content,
                    user: {
                        id: userInfo?.userId.toString() || '0',
                        name: userInfo?.nickname || '我',
                        avatar: userInfo?.avatar || '/defaultAvatar.webp'
                    },
                    reply: []
                }]);
            }

            setCurrentInputIndex(-1);
            setReplyTo('-1');
            showMessage({children: '评论成功'});
        }, () => {
            showMessage({children: '评论失败'});
        });
    }, [comment, props.nid, props.toId, setComment, setCurrentInputIndex, setReplyTo, userInfo?.avatar, userInfo?.nickname, userInfo?.userId]);

    return (
        <div className="mika-novel-page-comment-input">
            <Image width={36} height={36} src="/defaultAvatar.webp" error="/defaultAvatar.webp"/>
            <textarea placeholder="写下你的评论" ref={ref}/>
            <Button styleType="primary" onClick={reply}>评论</Button>
        </div>
    );
});

const NovelPageComment = memo(({novelId}: { novelId: string }) => {
    const [comment, setComment] = useStore<NovelPageCommentProps[]>(`novel-page-comment`);
    const [total, setTotal] = useStore<number>(`novel-page-comment-total`, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getCommentList = useCallback(withLockTime((unloading: () => unknown) => {
        const curPage = comment ? Math.floor(comment.length / 10) + 1 : 1;
        if (total !== 0 && comment && comment.length >= total) {
            unloading();
            return;
        }
        getComments(novelId!, curPage, 10).then(async (res) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            if (res && res.records.length > 0) {
                const newComment = comment ? comment.concat(res.records) : res.records;
                const map = new Map();
                newComment.forEach((item) => {
                    map.set(item.id, item);
                });
                setComment([...map.values()]);
            }
            res && setTotal(res.total);
            unloading();
        });

    }, 500), [comment, novelId, total]);

    return (
        <div className="mika-novel-page-novel-comment">
            <h2>评论</h2>
            <div>
                <NovelPageCommentInput nid={novelId} toId={'-1'}/>
                <InfinityList className="mika-novel-page-comment-infinity-list" style={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                }} onIntersect={getCommentList} limit={total} itemNum={comment ? comment.length : 0}>
                    {comment.map((_comment, index) => {
                        return (
                            <NovelPageCommentBox key={index} novelId={novelId} {..._comment}/>
                        )
                    })}
                </InfinityList>

                <div style={{
                    textAlign: "center",
                    display: total === comment.length ? "block" : "none",
                    padding: "10px 0",
                    color: "#999",
                    userSelect: "none"
                }}>
                    没有更多了
                </div>
            </div>
        </div>
    )
});

export default NovelPageComment;