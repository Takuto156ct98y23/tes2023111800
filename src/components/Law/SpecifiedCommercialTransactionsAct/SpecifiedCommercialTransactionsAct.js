import Law from "../Law/Law";

const SpecifiedCommercialTransactionsAct = () => {
  return (
    <div>
      <Law title={title} text={text} />
      <Law title={title_promo} text={text_promo} />
      <Law title={title_card} text={text_card} />
    </div>
  );
};

export default SpecifiedCommercialTransactionsAct;

const title = "特定商取引法に基づく表示";
const text = `アプリ名：
RiceSpeak（ライスピーク）（以下「本アプリ」といいます。）
‍
運営事業者の名称：
言語研究開発合同会社

所在地：
東京都中央区銀座一丁目22番11号 銀座大竹ビジデンス2階

お問い合わせ先：
言語研究開発合同会社
カスタマーサポート係
support@languagerd.com
080-6569-2733

提供する商品やサービス：
本アプリはユーザーの語学力向上を目的として、語学学習コンテンツ、語学交流機能を中心とした商品・サービスを提供します。2023年6月14日時点で販売中または販売予定の商品の詳細につきましては下記の通りです（各商品の「ページ」の閲覧には無料の会員登録が必要です）。

＜１＞
商品名：プレミアム会員
詳細内容：毎月課金型のサブスクリプションです。チャットルームの検索時に性別・年齢・フリーワード検索といった詳細設定が可能になる等のプレミアム会員限定特典をお楽しみ頂けます。
価格：990円/月（税込み）
ページ：https://ricespeak.com/upgrade

＜２＞
商品名：ライス
詳細内容：アプリ内で使用できるポイントです。1000ライスが毎回の購入ごとに付与されます。
価格：110円（税込み）
ページ：https://ricespeak.com/rice

＜３＞
商品名：無敵モード
詳細内容：HPが減少しなくなるスペシャルアイテムです。近日発売開始。
価格：2023年6月14日現在未定
ページ：https://ricespeak.com/invincible

利用料金：
本アプリの基本使用料は無料です。本アプリ内の有償コンテンツの利用料金は、各商品ページに個別に記載をしております。消費税は内税表示としております。利用料金以外の必要料金、本アプリを利用するための機器・インターネット接続料金、通信料金等はお客様のご負担となります。

取引通貨：
日本円

利用条件：
本アプリは「利用規約」（https://ricespeak.com/terms-of-service）に基づき、お客様にご提供するものです。当該規約にて利用条件をご確認・ご理解のうえ、ご利用ください。

消費者データのプライバシーポリシー：
「プライバシーポリシー」（https://ricespeak.com/privacy-policy）をご覧ください。

プロモーションの利用規約：
当ページ下記にございます「プロモーション利用規約」をご覧ください。

支払いカード詳細の送信に関するセキュリティー機能とポリシー：
当ページ下記にございます「支払いカード詳細の送信に関するセキュリティー機能とポリシー」をご覧ください。

お支払方法：
有償コンテンツのご購入時のお支払いは、ご利用のプラットフォームが定めるお支払い方法に基づきます。

引渡し時期：
有償コンテンツは購入手続後、直ちにご利用可能です（特別な条件がある場合を除く）。

キャンセル・返金ポリシー：
有償コンテンツについて購入手続後のキャンセル・返金はお受けできません。

推奨動作環境：
本アプリをご利用いただくための推奨される動作環境は、次の通りです。ただし、記載された環境での動作を保証するものではありません。
iOS端末：　iOS 10.0以上（iPhone 5以上）
Android端末： Android OS 6.0以上（搭載メモリ2GB以上）`;

const title_promo = "プロモーション利用規約";
const text_promo = `適用範囲：
本規約は、「RiceSpeak」（以下、「我々」）が運営するすべてのプロモーションに適用されます。

プロモーションの詳細：
プロモーションの詳細、包括的な条件、有効期限などは各プロモーション発表時に明記されます。

利用資格：
プロモーションは、我々のサービスの登録ユーザーに限ります。未成年者の参加については、保護者の許可が必要です。

プロモーションの適用除外：
本規約に違反した行為が確認された場合、または不正な手段でプロモーションを利用しようとした場合、我々はそのユーザーをプロモーションから除外する権利を有します。

個人情報の取り扱い：
プロモーションに参加することにより、ユーザーは我々がその個人情報をプライバシーポリシーに従って取り扱うことに同意したものとみなされます。

責任の範囲：
プロモーションに関連する損害について、我々は法律で許される最大限度まで一切の責任を免責します。

規約の改訂：
我々は、法律の改訂やサービスの変更に応じて、この利用規約を随時改訂する権利を有します。

適用法と裁判管轄：
本規約は日本法に準拠し、本規約に関するすべての紛争については、東京地方裁判所を専属的合意管轄裁判所とします。`;

const title_card = "支払いカード詳細の送信に関するセキュリティー機能とポリシー";
const text_card = `クレジットカード情報の保有：
当社の語学アプリ「RiceSpeak」では、お客様のクレジットカード情報の保有は行っておりません。全ての決済は第三者決済処理会社であるStripe, Inc.を通じて処理されます。

情報の暗号化：
Stripe, Inc.は高度なセキュリティーメジャーを持っており、お客様のクレジットカード情報は安全に送信、保存されます。

個人情報の保護：
当社では、お客様の個人情報を保護するためのポリシーと手順を持っております。お客様の個人情報は、適用可能な法律と規制に従い、合理的な措置を講じて保護されます。

お客様が当社のサービスをご利用いただく際は、これらのポイントを理解し、ご同意いただくようお願いいたします。


以上
‍
2023年6月14日制定
最終更新日：2023年7月16日`;