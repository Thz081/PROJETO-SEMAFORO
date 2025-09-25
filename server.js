const app = require('./src/app');
const PORTA = 3000;

app.listen(PORTA, () => {
 
  console.log(`  Ouvindo na porta: http://localhost:${PORTA}`);
  console.log('Aguardando dados da ESP32...');
});