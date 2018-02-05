'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW_X = CLOUD_X + 10;
var CLOUD_SHADOW_Y = CLOUD_Y + 10;
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

var TEXT = 'Ура вы победили!\nСписок результатов:';
var TEXT_FONT = '16px PT Mono';
var TEXT_X = CLOUD_X + 50;
var TEXT_Y = CLOUD_Y + 30;
var TEXT_GAP = 20;
var TEXT_COLOR = '#000';

var BAR_GRAPH_X = CLOUD_X + 50;
var BAR_GRAPH_Y = CLOUD_Y + 90;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP_X = 50;
var BAR_GAP_Y = 15;
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var OTHERS_BAR_COLOR = 'rgba(0, 0, 255, '; // alpha is chosen randomly

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = CLOUD_SHADOW_COLOR;
  ctx.fillRect(CLOUD_SHADOW_X, CLOUD_SHADOW_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, font, x, y) {
  var arrayOfStrings = text.split('\n');
  ctx.font = font;
  ctx.fillStyle = TEXT_COLOR;
  for (var i = 0; i < arrayOfStrings.length; ++i) {
    ctx.fillText(arrayOfStrings[i], x, y + i * TEXT_GAP);
  }
};

var maxValue = function (array) {
  var max = array[0];
  for (var i = 0; i < array.length; ++i) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
};

var renderBarGraph = function (ctx, names, times, font, x, y) {
  var step = Math.floor(maxValue(times) / BAR_HEIGHT);
  var positionX = x;

  for (var i = 0; i < times.length; ++i) {
    ctx.fillStyle = names[i] === 'Вы' ? PLAYER_BAR_COLOR : OTHERS_BAR_COLOR + Math.random() + ')';
    ctx.fillRect(positionX, y + BAR_HEIGHT - times[i] / step, BAR_WIDTH, times[i] / step);

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.round(times[i]), positionX, y + BAR_HEIGHT - times[i] / step - BAR_GAP_Y);
    ctx.fillText(names[i], positionX, y + BAR_HEIGHT + BAR_GAP_Y);

    positionX += BAR_WIDTH + BAR_GAP_X;
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  renderText(ctx, TEXT, TEXT_FONT, TEXT_X, TEXT_Y);

  renderBarGraph(ctx, names, times, TEXT_FONT, BAR_GRAPH_X, BAR_GRAPH_Y);
};
