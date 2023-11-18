export const maxHitPoint = 100;
export const minHitPoint = 0;
// hitPoint barが１回変動するのにかかる秒数
// export const secondsTransition = 0.2;
export const secondsTransition = 0.5;

if (maxHitPoint < minHitPoint) {
  console.log("invalid hitPoint value.");
}

export const defaultHitPoint = 100;

// 英単語一個あたりの回復ポイント
export const pointsRestore = 5;
// export const pointsRestore = 2;

// 課題をクリアするなどしたユーザーにボーナスポイントを与える場合
const bonusRate = 0.5;
export const pointsRestoreWithBonus = pointsRestore * (1 + bonusRate);

// 日本語一文字あたりのダメージポイント
export const weightDamage = -1;
// export const weightDamage = -0.3;
