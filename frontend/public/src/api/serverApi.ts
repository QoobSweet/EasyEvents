export interface ServerApi {
    socket: any;
    setUserId: { (String): void };
    subscribeToServer: { (): void };
    getApiKey: { (callback: { (apiKey: String): void }): void };
    getConfig: { (callback: {(config: Object): void}): void };
    setFieldValue: { (collectionKey: String, docKey: String, fieldKey: String, fieldValue: String | String[]): void };
    removeDoc: { (collectionKey: String, docKey: String): void };
    createDoc: { (collectionKey: String, doc, callback: Function): void };
}

/**
 * 
 * @param socket socket to bind API to
 * @returns 
 */
const ServerApi = (socket): ServerApi => {
    let userId = null;
    
    return {
        socket: socket,

        setUserId: (newId) => { userId = newId; },

        subscribeToServer: () => {
            const data = {
                secret: 'QuickEvents_v1',
                userId: userId,
            }

            socket.emit('subscribeToServer', data, (response) => {
                if (response && response.status === "ok") {
                    console.log("Connection to Server established.");
                }
            })
        },

        getApiKey: (callback) => {
            const data = {
                secret: 'QuickEvents_v1',
                userId: userId,
            }

            socket.emit('getApiKey', data, (response) => {
                if(response && response.status === "ok"){
                    callback(response.apiKey);
                } else {
                    console.log('failed to get ApiKey from server');
                }
            })
        },

        getConfig: (callback) => {
            const data = {
                secret: 'QuickEvents_v1',
                userId: userId,
            }

            socket.emit('getConfig', data, (response) => {
                if(response && response.status === "ok"){
                    callback(response.config)
                } else {
                    console.log('failed to get config')
                }
            })
        },

        setFieldValue: (collectionKey, docKey, fieldKey, fieldValue) => {
            const data = {
                userId: userId,
                collectionKey: collectionKey,
                docKey: docKey,
                fieldKey: fieldKey,
                fieldValue: fieldValue
            }

            socket.emit('setFieldValue', data, (response) =>{ })
        },

        removeDoc: (collectionKey, docKey) => { 
            const data = {
                userId: userId,
                collectionKey: collectionKey,
                docKey: docKey
            }  

            socket.emit('removeDoc', data, (response) => { })
        },

        createDoc: (collectionKey, doc, callback) => {
            console.log([collectionKey, doc]);
            const data = {
                userId: userId,
                collectionKey: collectionKey,
                doc: doc
            }

            socket.emit('createDoc', data, (response) => {
                callback(response.id);
            })
        }
    }
}

export default ServerApi;