// app.js
// 自爆スイッチを押すとカウントダウン、アラートと音を鳴らすjs

const sound = document.getElementById("sound");
const btn = document.getElementById("btn");
const countdown = document.getElementById("countdown");
let countdownInt;

btn.addEventListener("click", function() {
  let second = 10;
  countdown.textContent = `爆発まであと${second}秒`;

  btn.disabled = true;

  countdownInt = setInterval(function() {
    second = second - 1;
    if (second > 0) {
      countdown.textContent = `爆発まであと${second}秒`;
    }
    else {
      clearInterval(countdownInt);
      countdown.textContent = "";

      document.body.classList.add("exploded");

      setTimeout(function() {
        sound.currentTime = 0;
        const playPromise = sound.play();

        if (playPromise !== undefined) {
          playPromise.then(function() {
            alert("爆発しました！！");
            document.body.classList.remove("exploded");
            btn.disabled = false;

          }).catch(function(e) {
            console.warn("音声再生に失敗しました", e);
            alert("爆発しました！！（音は鳴りませんでした）");
            document.body.classList.remove("exploded");
            btn.disabled = false; // エラー時もボタンを有効にする
          });

        } else {
          alert("爆発しました！！");
          document.body.classList.remove("exploded");
          btn.disabled = false;
        }
      }, 100);
    }
  }, 1000);
});
