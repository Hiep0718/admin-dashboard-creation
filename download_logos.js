const https = require('https');
const fs = require('fs');
const path = require('path');

const logos = [
  { name: 'coca-cola.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/800px-Coca-Cola_logo.svg.png' },
  { name: 'pepsi.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pepsi_logo_2014.svg/800px-Pepsi_logo_2014.svg.png' },
  { name: 'heineken.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Heineken_logo.svg/800px-Heineken_logo.svg.png' },
  { name: 'tiger.png', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Tiger_Beer_Logo.svg/800px-Tiger_Beer_Logo.svg.png' },
  { name: 'sabeco.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Logo_Sabeco.png/800px-Logo_Sabeco.png' },
  { name: 'abbott.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Abbott_Laboratories_logo.svg/800px-Abbott_Laboratories_logo.svg.png' },
  { name: 'nutifood.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Nutifood_logo.png/800px-Nutifood_logo.png' },
  { name: 'vinamilk.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Vinamilk_logo.svg/800px-Vinamilk_logo.svg.png' }
];

const dir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

logos.forEach(logo => {
  const filePath = path.join(dir, logo.name);
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  };
  https.get(logo.url, options, (res) => {
    if (res.statusCode === 200) {
      const file = fs.createWriteStream(filePath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${logo.name}`);
      });
    } else if (res.statusCode === 301 || res.statusCode === 302) {
       https.get(res.headers.location, options, (res2) => {
           const file = fs.createWriteStream(filePath);
           res2.pipe(file);
       });
    } else {
      console.log(`Failed to download ${logo.name}: ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.log(`Error downloading ${logo.name}: ${err.message}`);
  });
});
