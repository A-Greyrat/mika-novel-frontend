import './Register.less';
import {useTypePrint} from "../../common/hooks";
import {Button} from "../../component/mika-ui";

const text =
    "「はじめまして」した日から\n" +
    "ずっと待っていた\n" +
    "この日を想っていた\n" +
    "キラキラその目に宿った\n" +
    "光を見たんだ\n" +
    "広がるこの大地を歩いて\n" +
    "新たな出会いに触れてきっと\n" +
    "見つけ出せる きみだけのジュエル\n" +
    "その軌跡をセーブ\n" +
    "全部全部 hurry up\n" +
    "赤青緑色とりどり\n" +
    "宝探し たまに寄り道\n" +
    "手合わせ願う それじゃ一緒に\n" +
    "３ ２ １\n" +
    "「キミにきめた」\n" +
    "今日も幕が開けた\n" +
    "Let meそうlet me feel\n" +
    "ドキドキがもう\n" +
    "止まらない止められない\n" +
    "磨き続けた\n" +
    "一撃をビリビリと今\n" +
    "狙い定めて keep it up\n" +
    "さあpick out\n" +
    "実りある瞬間を駆けるの\n" +
    "行こうno limit よ\n" +
    "ビリビリと今きみと\n" +
    "ジリジリを give me give me more\n" +
    "ヒリヒリの living living oh\n" +
    "ギリギリも楽しむの\n" +
    "金銀クリスタル\n" +
    "欲しいのはそんなんじゃないんだ\n" +
    "新人？リーダー？誰でも構わないや\n" +
    "蒼天の下 エメラルドの海超え\n" +
    "探し出す紅一点\n" +
    "難しい問題パスして\n" +
    "面白いが眠る街へ\n" +
    "白黒付ける 知ってるバトルの\n" +
    "How toならABCからXYZ\n" +
    "きみに会えた やっと巡り会えた\n" +
    "Let meそうlet me feel\n" +
    "ドキドキしてるの きみも同じかな\n" +
    "陽が差す朝も 月が見える夜も\n" +
    "積み上げてきたもの ぶつけ合おう\n" +
    "真剣勝負\n" +
    "どうしたってもう止まんない\n" +
    "夢に見たこのステージで\n" +
    "「キミにきめた」\n" +
    "待ち侘びたこの時をさあ\n" +
    "ドクドクと感じる\n" +
    "鼓動の先に行こう\n" +
    "磨き続けた\n" +
    "一撃をビリビリと今\n" +
    "狙い定めて keep it up\n" +
    "さあpick out\n" +
    "実りある瞬間にしよう\n" +
    "いつでもno limit よ\n" +
    "スカした顔のきみも\n" +
    "人見知りなきみも\n" +
    "下向いてた過去にバイバイを\n" +
    "未来をゲット\n" +
    "ビリビリと今きみと\n" +
    "ジリジリを give me give me more\n" +
    "ヒリヒリの living living oh\n" +
    "ギリギリも楽しむの\n";

const textArr = text.split("\n");
const newArr: string[] = [];

for (let i = 0; i < textArr.length / 3; i++) {
    newArr[i] = textArr[i * 3];
    if (i * 3 + 1 < textArr.length) {
        newArr[i] += "\n" + textArr[i * 3 + 1];
    }
    if (i * 3 + 2 < textArr.length) {
        newArr[i] += "\n" + textArr[i * 3 + 2];
    }
}

const Register = () => {
    const displayText = useTypePrint(newArr, 100);

    return (<div className="mika-novel-register-root">
        <div className="mika-novel-register-container">
            <div className="mika-novel-register-container">
                <h1>注 册</h1>
                <form className="mika-novel-register-form">
                    <input type="text" placeholder="账号 / 邮箱"/>
                    <input type="password" placeholder="密码"/>
                    <input type="password" placeholder="确认密码"/>
                    <input type="text" placeholder="验证码"/>
                    <Button type="submit" styleType="primary" size="large">注册</Button>
                </form>
            </div>
        </div>
        <div className="mika-novel-register-side">
            <p>{displayText}</p>
        </div>
    </div>);
}

export default Register;
