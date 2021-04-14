import { createRequire } from 'module';
import router from './routes';
const require = createRequire(import.meta.url);
import express from 'express';
import io from 'socket.io';
import cors from 'cors';
import path from 'path';

import { firebaseConfig, firebaseMethods } from './resources/firebase/firebase.js';
import rxUsers from './resources/firebase/rxUsers';
import rxClients from './resources/firebase/rxClients';
import rxInquiries from './resources/firebase/rxInquiries';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

const port = process.env.PORT || 5000
const app = express();

const __dirname = path.resolve();

//#region subscrition distribution

let gUsers = [];
let gClients = [];
let gClientsUpdate = false;
let gInquiries = [];
let gInquiriesUpdate = false;

rxClients.subscribe((clients) => {
  gClients = clients;      //update global records
  gClientsUpdate = true;   //flag for update
})
rxInquiries.subscribe((inquiries) => {
  gInquiries = inquiries;  //update global records
  gInquiriesUpdate = true; //flag for update
})
rxUsers.subscribe((users) => {
  gUsers = users;

})
//#endregion

//#region configuration

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

// Configure the express middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());
app.use('/api', router);

// This middleware informs the express application to serve our compiled React files
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    console.log('attempt')
    res.send(path.join(__dirname + '/client/build/index.html'));
});

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});
//#endregion 

// Configure our server to listen on the port defiend by our port variable
const server = app.listen(port, () => {
  console.log(`SOCKET_END_SERVICE_PORT ${port}`)
});
io(server);


let connections = [];

const interval = setInterval(() => {
  if(connections.length > 0) { //has connections..proceed to update them
    for(let i = 0; i < connections.length; i++){
      const instance = connections[i].instance;
      const socket = connections[i].socket;

      if(gClientsUpdate){
        instance.sendClients(socket);
      }

      if(gInquiriesUpdate && gInquiries.length > 0){
        instance.sendInquiries(socket);
      }
    }
  }
}, 2000)


//#region socket handling 
io.on("connection", (socket) => {
  console.log("New client connected");
  gClientsUpdate = true;
  gInquiriesUpdate = true;


  socket.on('getApiKey', (data, callback) => {
    if(data.secret === "QuickEvents_v1"){
      console.log('Api key requested')
      callback({status: "ok", apiKey: firebaseConfig.apiKey});
    }
  })
  
  socket.on('getConfig', (data, callback) => {
    if(data.secret === "QuickEvents_v1"){
      console.log('Config key requested')
      callback({status: "ok", config: firebaseConfig});
    }
  })

  socket.on('subscribeToServer', (data) => {
    const connection = {
      instance: firebaseMethods.getNewInstance(data, gUsers, gClients, gInquiries),
      socket: socket,
    }
    
    connections.push(connection);
  })

  socket.on('setFieldValue', (data, callback) => {
      console.log('setting field value')
      firebaseMethods.setFieldValue(data)
      callback({status: 'ok'})
  })
  
  socket.on('removeDoc', (data, callback) => {
      firebaseMethods.removeDoc(data, gUsers);
      callback({status: 'ok'})
  })

  socket.on('createDoc', (data, callback) => {
      firebaseMethods.createDoc(data, gUsers).then((docRef: unknown) => {
          console.log(docRef.id)
          callback({status: 'ok', id: docRef.id})
      })  
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    connections = connections.filter(connection => connection.socket !== socket)
  });
});
//#endregion