import './NovelPageComment.less';
import {Image} from "../../component/mika-ui";

type NovelPageCommentProps = {
    id: string;
    time: string;
    content: string;
    user: {
        id: string;
        name: string;
        avatar: string;
    };
}


const NovelPageCommentBox = (props: NovelPageCommentProps) => {
    return (
        <div className="mika-novel-page-comment-box">
            <div className="mika-novel-page-comment-box-user">
                <Image src={props.user.avatar} width={32} height={32} alt=""/>
                <h3>{props.user.name}</h3>
            </div>
            <div>
                <p>{props.content}</p>
                <p>{props.time}</p>
            </div>
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