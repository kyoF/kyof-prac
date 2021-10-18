// TETRIS

// ステージ
const block_size = 24;
const block_raws = 22;
const block_cols = 12;
const screen_width = block_size * block_cols;
const screen_height = block_size * block_raws;
// ゲームの状態
const game = 1;
const gameover = 0;
const effect = 2;
// ブロックの状態
const non_block = 0;
const normal_block = 1;
const lock_block = 2;
const clear_block = 3;
const wall = 9;
// エフェクト
const effect_animation = 2;
// 色
const back_color = "#ddd";
const gameover_color = "palevioletred";
const block_color = "steelblue";
const lock_color = "lightslategray";
const wall_color = "#666";
const error_color = "tomato";
const effect_color1 = "whitesmoke";
const effect_color2 = "#000";
const o_mino = "yellow";
const i_mino = "skyblue";
const z_mino = "red";
const s_mino = "lightgreen";
const j_mino = "blue";
const l_mino = "orange";
const t_mino = "purple";
// ゲーム要素
const nextlevel = 10;

let canvas = null;
let g = null;
let stage = new Array(block_cols);
let field = new Array(block_cols);
let bs;
let speed;
let frame;
let block = new Array();
let oBlock = new Array();
let blockType;
let x, y;
let sx, sy;
let mode;
let timer1;
let FPS;
let clearLine;
let effectState = { flipFlop: 0, speed: 0, count: 0 };
let nextBlockList = [];
let tmpNextBlockList = [];
let nowBlock;

// 初期化
function init() {
  clearTimeout(timer1);
  FPS = 30;
  clearLine = 0;
  // キャンバスの設定
  canvas = document.getElementById("canvas");
  canvas.width = screen_width;
  canvas.height = screen_height;
  g = canvas.getContext("2d");
  // エフェクト設定
  effectState.flipFlop = 0;
  effectState.speed = 4;
  effectState.count = 0;
  // ブロック設定
  bs = block_size;
  block = [
    // oミノ
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    // iミノ
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    // zミノ
    [
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    // sミノ
    [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
    // jミノ
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    // lミノ
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    // tミノ
    [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
    ],
  ];
  // ステージ設定
  stage = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
}

/* ステージ設定 */
function setStage() {
  // 表示するための配列
  for (i = 0; i < block_raws; i++) {
    field[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  // 操作ブロックの配列
  oBlock = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  // ステージデータをコピー
  for (i = 0; i < block_raws; i++) {
    for (j = 0; j < block_cols; j++) {
      field[i][j] = stage[i][j];
    }
  }
}

/* ゲーム開始処理 */
function newGame() {
  setStage();
  mode = game;
  frame = 1;
  speed = 30;
  clearTimeout(timer1);
  createBlock();
  mainLoop();
}

// 七種一巡を設定
function sevenLoopRule() {
  if (nextBlockList.length < 20) {
    tmpNextBlockList = [];
    for (i = 0; i < 7; i++) {
      while (tmpNextBlockList.length < 7) {
        tmp = Math.floor(Math.random() * 7);
        if (!tmpNextBlockList.includes(tmp)) {
          tmpNextBlockList.push(tmp);
          break;
        }
      }
    }
    nextBlockList = nextBlockList.concat(tmpNextBlockList);
  }
  nowBlock = nextBlockList[0];
  nextBlockList.shift();
  console.log(nextBlockList);
  return nowBlock;
}

/* 新しいブロックを作成 */
function createBlock() {
  if (mode == effect) return;
  x = sx = Math.floor(block_cols / 3);
  y = sy = 0;
  blockType = sevenLoopRule();
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      oBlock[i][j] = block[blockType][i][j];
    }
  }
  if (hitCheck()) {
    mode = gameover;
    console.log("GAMEOVER!");
  }
  putBlock();
}

/* ブロックをロックする */
function lockBlock() {
  if (mode == effect) return;
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      if (oBlock[i][j]) field[i + y][j + x] = lock_block;
    }
  }
}

/* ブロックをステージにセットする */
function putBlock() {
  if (mode == effect) return;
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      if (oBlock[i][j]) field[i + y][j + x] = oBlock[i][j];
    }
  }
}

/* ブロックを消去する */
function clearBlock() {
  if (mode == effect) return;
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      if (oBlock[i][j]) field[i + y][j + x] = non_block;
    }
  }
}

/* ブロックの回転処理 */
function rotateBlock() {
  if (mode == effect) return;
  clearBlock();
  // 回転ブロック退避の配列
  let tBlock = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      tBlock[i][j] = oBlock[i][j];
    }
  }
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      oBlock[i][j] = tBlock[3 - j][i];
    }
  }
  if (hitCheck()) {
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 4; j++) {
        oBlock[i][j] = tBlock[i][j];
      }
    }
  }
  putBlock();
  return 0;
}

/* ブロックの当たり判定処理 */
function hitCheck() {
  if (mode == effect) return;
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      if (field[i + y][j + x] && oBlock[i][j]) return 1;
    }
  }
  return 0;
}

// ラインが揃ったかチェックする
function lineCheck() {
  if (mode == effect) return;
  let count;
  let lineCount = 0;
  for (i = 1; i < block_raws - 2; i++) {
    count = 0;
    for (j = 0; j < block_cols; j++) {
      if (field[i][j]) count++;
      else break;
    }
    if (count >= block_cols) {
      lineCount++;
      clearLine++;
      for (j = 1; j < block_cols - 1; j++) field[i][j] = clear_block;
      console.log("lineCount = " + lineCount);
      console.log("clearLine = " + clearLine);
    }
  }
  return lineCount;
}

// 揃ったラインを消去する
function deleteLine() {
  if (mode == effect) return;
  for (i = block_raws - 1; i >= 1; i--) {
    for (j = 1; j < block_cols - 1; j++) {
      if (field[i][j] == clear_block) {
        field[i][j] = field[i - 1][j];
        for (above = i - 1; above >= 1; above--) {
          field[above][j] = field[above - 1][j];
        }
        i++;
      }
    }
  }
}

// ゲーム画面クリア
function clearWindow() {
  g.fillStyle = back_color;
  g.fillRect(0, 0, screen_width, screen_height);
}

// 描画処理
function draw() {
  clearWindow();
  for (i = 0; i < block_raws; i++) {
    for (j = 0; j < block_cols; j++) {
      switch (field[i][j]) {
        case non_block:
          g.fillStyle = back_color;
          break;
        case normal_block:
          switch (blockType) {
            case 0:
              g.fillStyle = o_mino;
              break;
            case 1:
              g.fillStyle = i_mino;
              break;
            case 2:
              g.fillStyle = z_mino;
              break;
            case 3:
              g.fillStyle = s_mino;
              break;
            case 4:
              g.fillStyle = j_mino;
              break;
            case 5:
              g.fillStyle = l_mino;
              break;
            case 6:
              g.fillStyle = t_mino;
              break;
          }
          break;
        case lock_block:
          g.fillStyle = lock_color;
          break;
        case clear_block:
          g.fillStyle = block_color;
          break;
        case wall:
          g.fillStyle = wall_color;
          break;
        default:
          g.fillStyle = error_color;
      }
      g.fillRect(j * bs, i * bs, bs - 1, bs - 1);
    }
  }
}

// ラインを消去するときのエフェクト
function Effect() {
  let colors = [effect_color1, effect_color2];
  g.fillStyle = colors[effectState.flipFlop];
  for (i = 0; i < block_raws; i++) {
    for (j = 0; j < block_cols; j++) {
      if (field[i][j] == clear_block) {
        g.fillRect(j * bs, i * bs, bs - 1, bs - 1);
      }
    }
  }
  effectState.flipFlop = 1 - effectState.flipFlop;
  if (effectState.count > effect_animation) {
    mode = game;
    effectState.count = 0;
    effectState.flipFlop = 0;
    deleteLine();
    createBlock();
  }
  effectState.count++;
}

// ゲームオーバー処理
function gameOver() {
  for (i = 0; i < block_raws; i++) {
    for (j = 0; j < block_cols; j++) {
      if (field[i][j] && field[i][j] != wall) {
        g.fillStyle = gameover_color;
        g.fillRect(j * bs, i * bs, bs - 1, bs - 1);
      }
    }
  }
}

// ゲームメイン
function mainLoop() {
  if (mode == game) {
    sx = x;
    sy = y;
    if (frame % speed == 0) {
      clearBlock();
      y++;
      if (hitCheck()) {
        y = sy;
        lockBlock();
        if (lineCheck() > 0) {
          mode = effect;
        }
        createBlock();
      }
      putBlock();
    }
    draw();
  } else if (mode == gameover) {
    gameOver();
  } else if (mode == effect) {
    if (frame % effectState.speed == 0) {
      Effect();
    }
  }
  frame++;
  if (clearLine >= nextlevel) {
    clearLine = 0;
    speed--;
    console.log("speedUP! : " + speed);
  }
  if (speed < 1) speed = 1;
  timer1 = setTimeout(mainLoop, 1000 / FPS);
}

// 操作
function keyDownFunc(e) {
  if (mode == effect) return;
  if (mode == game) {
    clearBlock();
    sx = x;
    sy = y;
    if (e.keyCode == 32) {
      rotateBlock();
    } else if (e.keyCode == 37) {
      x--;
    } else if (e.keyCode == 39) {
      x++;
    } else if (e.keyCode == 40) {
      y++;
    }
    if (hitCheck()) {
      x = sx;
      y = sy;
    }
    putBlock();
  } else if (mode == gameover) {
    if (e.keyCode == 13) {
      newGame();
    }
  }
}

// 起動処理
window.addEventListener("load", function () {
  init();
  window.addEventListener("keydown", keyDownFunc, false);
  newGame();
});
