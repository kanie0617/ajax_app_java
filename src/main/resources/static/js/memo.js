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
    XHR.responseType ="json";
    // フォームに入力された内容をサーバー側に送信する
    XHR.send(formData);
  });
};

window.addEventListener('load', post);