import './NovelPageComment.less';
import {Button, Image} from "../../component/mika-ui";

type NovelPageCommentReply = {
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
    reply?: NovelPageCommentReply[];
}


const NovelPageCommentBox = (props: NovelPageCommentProps) => {
    return (
        <div className="mika-novel-page-comment-box">
            <div className="mika-novel-page-comment-box-container">
                <Image src={props.user.avatar} width={36} height={36} error="/defaultAvatar.webp"/>
                <div>
                    <h3>{props.user.name}</h3>
                    <p>{props.time}</p>
                    <div className="mika-novel-page-comment-box-content">
                        <p>{props.content}</p>
                    </div>
                    <div>
                        <Button style={{paddingLeft: 0}} styleType="link">回复</Button>
                    </div>
                    <NovelPageCommentReplyBox reply={props.reply}/>
                </div>
            </div>
        </div>
    );
}

const NovelPageCommentReply = (props: NovelPageCommentReply) => {
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
                        <Button style={{paddingLeft: 0}} styleType="link">回复</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const NovelPageCommentReplyBox = (props: { reply?: NovelPageCommentReply[] }) => {
    if (!props.reply) {
        return null;
    }

    return (
        <div className="mika-novel-page-comment-reply-box">
            {props.reply?.map((reply, index) => {
                return (
                    <NovelPageCommentReply key={index} {...reply}/>
                )
            })}
        </div>
    );
}


const NovelPageComment = (props: { comment: NovelPageCommentProps[] }) => {
    return (
        <div className="mika-novel-page-novel-comment">
            <h2>评论</h2>
            <div>
                {props.comment.map((comment, index) => {
                    return (
                        <NovelPageCommentBox key={index} {...comment}/>
                    )
                })}
            </div>
        </div>
    )
}

export default NovelPageComment;