import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { firebaseConfig, firebaseMethods } from './resources/firebase/firebase.js';
import rxUsers from './resources/firebase/rxUsers.js';
import rxClients from './resources/firebase/rxClients.js';
import rxInquiries from './resources/firebase/rxInquiries.js';

const router = express.Router();
const port = process.env.PORT || 5000
const app = express();

const __dirname = path.resolve();

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
app.use(express.static(path.join(__dirname, '/../frontend')));

console.log(path.join(__dirname, '/build/client'));
app.get('*', (req, res) => {
    res.send(path.join(__dirname + '/../frontend/index.html'));
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
const io = new Server(server);


//#region subscrition distribution
let connections = [];
let gUsers = [];
let gClients = [];
let gInquiries = [];

rxUsers.subscribe((users) => {
  console.log("Users de-sync. Triggering update");
  gUsers = users;

  //update connected clients
/*    connections.forEach(connection => {
    connection.instance.sendUsers(gUsers);
  }) */
})

rxClients.subscribe((clients) => {
  console.log("Clients de-sync. Triggering update");
  gClients = clients;

  //update connected clients
  connections.forEach(connection => {
    connection.instance.sendClients(gUsers, clients);
  })
})

rxInquiries.subscribe((inquiries) => {
  console.log("Inquiries de-sync. Triggering update");
  gInquiries = inquiries;

  //update connected clients
  connections.forEach(connection => {
    connection.instance.sendInquiries(gUsers, inquiries);
  })
})



//#region socket handling 
io.on("connection", (socket) => {
  console.log("New client connected");


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
    console.log('User has logged in and is subscribing to server');
    //check if first time user
    if (!gUsers.filter((user) => user.id === data.userId)[0]) {
      console.log('setting up first time user');
      firebaseMethods.createUser(data.userId);
      gUsers.push({ id: data.userId });
      console.log(gUsers);
    }
    
    const connection = {
      instance: firebaseMethods.getNewInstance(socket, data),
    }
    connection.instance.sendClients(gUsers, gClients);
    connection.instance.sendInquiries(gUsers, gInquiries);
    connections.push(connection);
  })

  socket.on('setFieldValue', (data, callback) => {
      firebaseMethods.setFieldValue(data)
      callback({status: 'ok'})
  })
  
  socket.on('removeDoc', (data, callback) => {
      firebaseMethods.removeDoc(data, gUsers);
      callback({status: 'ok'})
  })

  socket.on('createDoc', (data, callback) => {
      firebaseMethods.createDoc(data, gUsers).then((docRef: any) => {
          console.log(docRef.id)
          callback({status: 'ok', id: docRef.id})
      })  
  })

  socket.on("disconnect", () => {
    console.log("User disconnected");
    connections = connections.filter(connection => connection.socket !== socket)
  });
});
//#endregion