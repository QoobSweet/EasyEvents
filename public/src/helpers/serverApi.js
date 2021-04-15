const ServerApi = (socket) => {
    console.log('building Server API');
    let userId = null;
    return {
        socket: socket,
        setUserId: (newId) => {
            console.log('userId set to: ' + newId);
            userId = newId;
        },
        subscribeToServer: () => {
            const data = {
                secret: 'QuickEvents_v1',
                userId: userId,
            };
            socket.emit('subscribeToServer', data, (response) => {
                if (response && response.status === "ok") {
                    console.log(response);
                }
            });
        },
        getApiKey: (callback) => {
            console.log("grabbing api key");
            const data = {
                secret: 'QuickEvents_v1',
                userId: userId,
            };
            socket.emit('getApiKey', data, (response) => {
                if (response && response.status === "ok") {
                    console.log(response);
                    callback(response.apiKey);
                }
            });
        },
        getConfig: (callback) => {
            const data = {
                secret: 'QuickEvents_v1',
                userId: userId,
            };
            //emit data
            socket.emit('getConfig', data, (response) => {
                if (response && response.status === "ok") {
                    callback(response.config);
                }
                else {
                    console.log('failed to get config');
                }
            });
        },
        setFieldValue: (collectionKey, docKey, fieldKey, fieldValue) => {
            const data = {
                userId: userId,
                collectionKey: collectionKey,
                docKey: docKey,
                fieldKey: fieldKey,
                fieldValue: fieldValue
            };
            //emit data
            socket.emit('setFieldValue', data, (response) => {
                console.log(response);
            });
        },
        removeDoc: (collectionKey, docKey) => {
            const data = {
                userId: userId,
                collectionKey: collectionKey,
                docKey: docKey
            };
            //emit data
            socket.emit('removeDoc', data, (response) => {
                console.log(response);
            });
        },
        createDoc: (collectionKey, doc, callback) => {
            const data = {
                userId: userId,
                collectionKey: collectionKey,
                doc: doc
            };
            //emit data
            socket.emit('createDoc', data, (response) => {
                callback(response.id);
            });
        }
    };
};
export default ServerApi;
