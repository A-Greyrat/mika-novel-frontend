import {Button, Image} from "../../component/mika-ui";
import "./Login.less";
import {useTypePrint} from "../../common/hooks";
import {useEffect, useState} from "react";
import {getCaptcha} from "../../common/user";

const text =
    "無敵の笑顔で荒らすメディア\n" +
    "知りたいその秘密ミステリアス\n" +
    "抜けてるとこさえ彼女のエリア\n" +
    "完璧で嘘つきな君は\n" +
    "天才的なアイドル様\n" +
    "今日何食べた?\n" +
    "好きな本は?\n" +
    "遊びに行くならどこに行くの?\n" +
    "何も食べてない\n" +
    "それは内緒\n" +
    "何を聞かれてものらりくらり\n" +
    "そう淡々と\n" +
    "だけど燦々と\n" +
    "見えそうで見えない秘密は蜜の味\n" +
    "あれもないないない\n" +
    "これもないないない\n" +
    "好きなタイプは?\n" +
    "相手は?\n" +
    "さあ答えて\n" +
    "「誰かを好きになることなんて\n" +
    "私分からなくてさ」\n" +
    "嘘か本当か知り得ない\n" +
    "そんな言葉にまた一人堕ちる\n" +
    "また好きにさせる\n" +
    "誰もが目を奪われていく\n" +
    "君は完璧で究極のアイドル\n" +
    "金輪際現れない\n" +
    "一番星の生まれ変わり\n" +
    "その笑顔で愛してるで\n" +
    "誰も彼も虜にしていく\n" +
    "その瞳がその言葉が\n" +
    "嘘でもそれは完全なアイ\n" +
    "はいはいあの子は特別です\n" +
    "我々はハナからおまけです\n" +
    "お星様の引き立て役Bです\n" +
    "全てがあの子のお陰なわけない\n" +
    "洒落臭い\n" +
    "妬み嫉妬なんてないわけがない\n" +
    "これはネタじゃない\n" +
    "からこそ許せない\n" +
    "完璧じゃない君じゃ許せない\n" +
    "自分を許せない\n" +
    "誰よりも強い君以外は認めない\n" +
    "誰もが信じ崇めてる\n" +
    "まさに最強で無敵のアイドル\n" +
    "弱点なんて見当たらない\n" +
    "一番星を宿している\n" +
    "弱いとこなんて見せちゃダメダメ\n" +
    "知りたくないとこは見せずに\n" +
    "唯一無二じゃなくちゃイヤイヤ\n" +
    "それこそ本物のアイ\n" +
    "得意の笑顔で沸かすメディア\n" +
    "隠しきるこの秘密だけは\n" +
    "愛してるって嘘で積むキャリア\n" +
    "これこそ私なりの愛だ\n" +
    "流れる汗も綺麗なアクア\n" +
    "ルビーを隠したこの瞼\n" +
    "歌い踊り舞う私はマリア\n" +
    "そう嘘はとびきりの愛だ\n" +
    "誰かに愛されたことも\n" +
    "誰かのこと愛したこともない\n" +
    "そんな私の嘘がいつか\n" +
    "本当になること信じてる\n" +
    "いつかきっと全部手に入れる\n" +
    "私はそう欲張りなアイドル\n" +
    "等身大でみんなのこと\n" +
    "ちゃんと愛したいから\n" +
    "今日も嘘をつくの\n" +
    "この言葉がいつか\n" +
    "本当になる日を願って\n" +
    "それでもまだ\n" +
    "君と君にだけは言えずにいたけど\n" +
    "やっと言えた\n" +
    "これは絶対嘘じゃない\n" +
    "愛してる\n";

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

const TypePrinter = ({texts}: { texts: string[] }) => {
    const displayText = useTypePrint(texts, 100);
    return <p>{displayText}</p>;
}

interface Captcha {
    verifyCodeId: string;
    captcha: string;
}


const Login = () => {
    const [captcha, setCaptcha] = useState<Captcha | undefined>(undefined);

    useEffect(() => {
        getCaptcha().then(res => {
            if (res.code === 200) {
                setCaptcha(res.data!);
            }
        });
    }, []);

    return (
        <div className="mika-novel-login-root">
            <div className="mika-novel-login-side">
                <TypePrinter texts={newArr}/>
            </div>
            <div className="mika-novel-login-container">
                <div className="mika-novel-login-form-container">
                    <h1>登 录</h1>
                    <form className="mika-novel-login-form">
                        <input type="text" placeholder="账号 / 邮箱"/>
                        <input type="password" placeholder="密码"/>
                        <input type="password" placeholder="确认密码"/>
                        <div>
                            <input type="text" placeholder="验证码"/>
                            <Image src={captcha?.captcha} alt="验证码" width={100} height={40}/>
                        </div>
                        <div className="mika-novel-login-form-btn-container">
                            <Button type="submit" styleType="primary" size="large">登录</Button>
                            <div>
                                <Button styleType="link" size="medium">忘记密码</Button>
                                <Button styleType="link" size="medium" onClick={e => {
                                    e.preventDefault();
                                    window.location.href = "/register";
                                }}>注册</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Login;