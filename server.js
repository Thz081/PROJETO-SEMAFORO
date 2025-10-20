require('dotenv').config();
const app = require('./src/app');
const PORTA = 3000;

app.listen(PORTA, () => {
  console.log(`  SERVIDOR NO AR NA PORTA ${PORTA}`);
});