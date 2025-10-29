const canvas = document.getElementById('tshirtCanvas');
const ctx = canvas.getContext('2d');
let elements = [];
let currentColor = 'white';

function drawTshirt(color) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const bgColor = color === 'red' ? '#e53935' : color === 'black' ? '#222' : '#fff';
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = color === 'white' ? '#ccc' : '#999';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(100, 450);
  ctx.lineTo(300, 450);
  ctx.lineTo(300, 50);
  ctx.arc(200, 50, 50, 0, Math.PI, false);
  ctx.stroke();
  elements.forEach(el => drawElement(el));
}

function addText() {
  const text = prompt("اكتب النص:");
  if (text) {
    elements.push({ type: 'text', content: text, x: 200, y: 250, font: 'bold 28px Tajawal', color: '#000' });
    drawTshirt(currentColor);
  }
}

function drawElement(el) {
  if (el.type === 'text') {
    ctx.font = el.font;
    ctx.fillStyle = el.color;
    ctx.textAlign = 'center';
    ctx.fillText(el.content, el.x, el.y);
  } else if (el.type === 'image') {
    ctx.drawImage(el.img, el.x - el.width/2, el.y - el.height/2, el.width, el.height);
  }
}

document.getElementById('uploadImage').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  const url = URL.createObjectURL(file);
  img.onload = () => {
    elements.push({ type: 'image', img, x: 200, y: 250, width: 100, height: 100 });
    drawTshirt(currentColor);
    URL.revokeObjectURL(url);
  };
  img.src = url;
});

function changeTshirt() {
  currentColor = document.getElementById('tshirtColor').value;
  drawTshirt(currentColor);
}

function exportImage() {
  const link = document.createElement('a');
  link.download = 'تصميم-التيشيرت.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function openStickerMenu() {
  document.getElementById('stickerMenu').classList.remove('hidden');
}

function closeStickerMenu() {
  document.getElementById('stickerMenu').classList.add('hidden');
}

function addSticker(name) {
  const img = new Image();
  img.src = `stickers/${name}.png`;
  img.onload = () => {
    elements.push({ type: 'image', img, x: 200, y: 250, width: 80, height: 80 });
    drawTshirt(currentColor);
    closeStickerMenu();
  };
}

drawTshirt('white');
