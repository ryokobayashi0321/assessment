'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentBtn = document.getElementById('assessment-btn');
const resultArea = document.getElementById('result-area');
const tweetArea = document.getElementById('tweet-area');

const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声はみんなを惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます',
  '{userName}のいいところは厳しさです。{userName}の厳しさが物事をいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴がみんなを楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さにみんなが気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けれている人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気にかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことにみんなが共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えにみんなが感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に移ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思った時にしっかりと衝動を抑えられる{userName}がみんなから評価されます。',
  '{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒されています。'
];

assessmentBtn.onclick = () => {
  const userName = userNameInput.value;

  // 名前が空の時は処理を終了する
  if (userName.length === 0) {
    return;
  }

  // 診断結果エリア作成
  removeAllChildren(resultArea); // 連続防止、子要素があるかぎり削除

  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultArea.appendChild(header);

  const pTag = document.createElement('p');
  const result = assessment(userName);
  pTag.innerText = result;
  resultArea.appendChild(pTag);

  // TODO ツイートエリア作成
  removeAllChildren(tweetArea);

  const aTag =document.createElement('a');
  const hrefValue = `https://twitter.com/intent/tweet?button_hashtag=${encodeURIComponent('あなたのいいところ')}&ref_src=twsrc%5Etfw`;

  aTag.setAttribute('href', hrefValue);
  aTag.className = 'twitter-hashtag-button';
  aTag.setAttribute('data-text', result);
  aTag.innerText = 'Tweet #あなたのいいところ';
  tweetArea.appendChild(aTag);

  // widgets.jsの設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetArea.appendChild(script);
}

/**
 * 名前の文字列を渡すと、診断結果を返す
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName)
{
  // 全文字コード番号を取得して、それを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字コード番号の合計を解答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replace(/\{userName\}/g, userName);
  return result;
}

/**
 * 指定した要素の子要素を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element)
{
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Enterキーでも診断できるようにする
userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentBtn.onclick();
  }
}

// テストコード
console.assert(
  assessment('ラスカル') ===
    'ラスカルのいいところは決断力です。ラスカルがする決断にいつも助けれている人がいます。', '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

console.assert(
  assessment('ラスカル') ===
    assessment('ラスカル'), '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
