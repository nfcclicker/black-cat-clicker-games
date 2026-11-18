"use strict";

const seaStages = [
  ["coast", "いつもの海", 1, "#7e81ad", "#404361", "#635a81", "#eed7a4"],
  ["reef", "サンゴ礁", 5, "#9a87b4", "#534b77", "#795675", "#eeb6d0"],
  ["tropical", "南国の海", 10, "#7b9eaf", "#385b70", "#575878", "#e4e9ba"],
  ["deep", "深海", 20, "#64678f", "#272b50", "#403e62", "#a2cdd8"],
  ["starlit", "星空の海", 35, "#8e82bc", "#40365f", "#655484", "#ffdfa1"],
  ["phantom", "幻の海", 50, "#ac9ac6", "#695082", "#8b6e9b", "#a9f2de"],
].map(([id, label, level, top, bottom, sand, accent]) => ({ id, label, level, top, bottom, sand, accent }));

const stagesById = Object.fromEntries(seaStages.map((stage) => [stage.id, stage]));
const defaultSea = seaStages[0];

function availableSea(id, level) {
  const stage = Object.hasOwn(stagesById, id) && stagesById[id];
  return stage && stage.level <= level ? stage : defaultSea;
}

function drawSeaScenery(ctx, stage, width, height) {
  ctx.save();
  const moonX = width * .79;
  const moonY = height * .22;
  const radius = Math.min(width, height) * .075;
  const glow = ctx.createRadialGradient(moonX, moonY, radius * .65, moonX, moonY, radius * 3.5);
  glow.addColorStop(0, "#fff1c299");
  glow.addColorStop(1, "#fff1c200");
  ctx.fillStyle = glow;
  ctx.fillRect(moonX - radius * 3.5, moonY - radius * 3.5, radius * 7, radius * 7);
  ctx.fillStyle = "#fff1c2";
  ctx.beginPath();
  ctx.arc(moonX, moonY, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = stage.accent;
  ctx.fillStyle = stage.accent;
  ctx.lineWidth = 2.6;
  ctx.lineCap = "round";
  ctx.globalAlpha = .47;
  for (let i = 0; i < 5; i += 1) {
    const x = width * (.07 + i * .21);
    const y = height - 17 - (i % 2) * 6;
    ctx.beginPath();
    if (stage.id === "reef" || stage.id === "tropical") {
      const rise = stage.id === "reef" ? 24 : 35;
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x - 8, y - rise / 2, x, y - rise);
      ctx.moveTo(x - 3, y - 12);
      ctx.quadraticCurveTo(x - 13, y - 16, x - 12, y - rise + 8);
      ctx.moveTo(x - 2, y - 14);
      ctx.quadraticCurveTo(x + 10, y - 20, x + 8, y - rise + 5);
    } else if (stage.id === "deep") {
      ctx.ellipse(x, y - 8, 11 + i % 2 * 5, 6, 0, 0, Math.PI * 2);
    } else {
      const size = 5 + i % 3 * 2;
      ctx.moveTo(x, y - size * 2);
      ctx.lineTo(x + size, y - size);
      ctx.lineTo(x, y);
      ctx.lineTo(x - size, y - size);
      ctx.closePath();
    }
    ctx.stroke();
  }
  ctx.restore();
}
