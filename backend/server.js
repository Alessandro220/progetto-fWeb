const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connessioneDB = require('./config/db');
const routDoc = require('./routes/dottoreRou');
const autentRoutes = require('./routes/autenRoutes');
const slotRoutes = require('./routes/slotRoutes');
const prenoRoutes = require('./routes/prenotazioneRoutes');
const socketMiddleware = require('./middleware/socketMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
//Socket
const http = require('http');
const {Server} = require('socket.io');

//Leggo il file .env
dotenv.config();
connessioneDB();


const app = express();
//Creazione server
const server = http.createServer(app);

const sockeT = new Server(server,{
  cors: {
    origin: "*"
  }
});
//Per ogni connessione nuova esegui la seguente funzione
sockeT.on('connection', (socket) => {
  console.log('Nuovo client connesso',socket.id);
  socket.on('entraStanza',(dottoreId)=>{
   socket.join(dottoreId);
   console.log(`Client ${socket.id} è entrato nella stanza del dottore ${dottoreId}`);
  });
});



/**Definizione Middlware
 * cor --> verifica gli header delle richieste aggiungendo anche i permessi 
 * exp.json --> gestisce richieste in formato JSON
 * cookieParser --> rende dispobili i cookie
 */
app.use(socketMiddleware(sockeT));
app.use(cors({
  origin: 'https://mydoc12.netlify.app',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/dottori',routDoc);
app.use('/api/aute',autentRoutes);
app.use('/api/slot',slotRoutes);
app.use('/api/prenotazioni',prenoRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//Definzione rotte 
app.get('/', (req,res) => {
    res.send("API funzionante!!");
} );

server.listen(process.env.PORT, () => {
  console.log("Server in Ascolto");
});


