// 投稿したメモのHTMLを生成する関数
const buildHTML = (XHR) => {
  // レスポンスの中から投稿されたメモの情報を抽出し、変数item二格納
      const item = XHR.response;
      // item内に格納されたメモの情報を元にしてブラウザに描画するためのHTMLを格納
      const html = `
        <div class="post">
          <div class="post-date">
            投稿日時：${item.createdAt}
          </div>
          <div class="post-content">
            ${item.content}
          </div>
        </div>`;
      return html;
};

function post (){
  //リクエストを送信する処理
  //  ページが読み込まれた時に正常にイベント発火しているか確認
  // console.log("イベント発火")

  // 投稿ボタンの要素を取得
  const submit = document.getElementById("submit");

  // 投稿ボタンがクリックされたらイベントが発火するように設定
  submit.addEventListener("click", (e) => {
    // 投稿ボタンをクリックしたという現象を無効化してブラウザからリクエストを送信しないようにする
    e.preventDefault();
    // フォーム自体の要素を取得
    const form = document.getElementById("form");
    // フォームに入力された値を取得
    const formData = new FormData(form);
    // XMLHttpRequestオブジェクトの生成
    const XHR = new XMLHttpRequest();
    // リクエストの内容（非同期で投稿したメモをデータベースに保存）
    XHR.open("POST", "/posts", true);
    // サーバーからのレスポンスの形式（データフォーマット）を指定
    XHR.responseType = "json";
    // フォームに入力された内容をサーバー側に送信する
    XHR.send(formData);
    // リクエストの送信に成功したときに行う処理を定義
    XHR.onload = () => {
      // レスポンスの内容を確認
      // console.log(XHR.response);
      // HTTPステータスコードが200以外の場合（レスポンスに何らかの問題があった場合）で条件分岐
      if (XHR.status != 200) {
        // ステータスコードに応じたエラーをアラートで表示
        alert(`Error ${XHR.status}: ${XHR.response.error}`);
        // JavaScriptの処理から抜け出してこれ以降の処理を行わないようにする
        return null;
      };
      // 新しいメモを挿入するための要素を取得して格納
      const list = document.getElementById("list");
      // リセット対象となるフォームの要素contentを取得して格納
      const formText = document.getElementById("content");
      // コンソールでメモの内容が格納されていることを確認
      // console.log(formText.value);
      // 変数listに格納された要素の直後に生成したHTML(buildHTML)を挿入
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      // formTextのvalue属性に空文字を指定してフォームの中身をリセット
      formText.value = "";
    };
  });
};

window.addEventListener('load', post);