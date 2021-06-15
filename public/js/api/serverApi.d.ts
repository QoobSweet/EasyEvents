import firebase from "firebase";
import "@firebase/auth";
import "firebase/firestore";
import { DbDoc } from "../definitions/dbDoc";
import { Observable } from "rxjs";
import { UserI } from "../definitions/definitions";
export interface ServerApi {
    rxUsers: Observable<unknown[]>;
    rxClients: Observable<unknown[]>;
    rxInquiries: Observable<unknown[]>;
    firestore: firebase.firestore.Firestore;
    getApiKey: {
        (): string;
    };
    getConfig: {
        (callback: {
            (config: Object): void;
        }): void;
    };
    setFieldValue: {
        (collectionKey: string, docKey: string, fieldKey: string, fieldValue: unknown): void;
    };
    removeDoc: {
        (user: UserI, collectionKey: string, docKey: string): void;
    };
    createDoc: {
        (user: UserI, collectionKey: string, doc: DbDoc, callback: Function): void;
    };
}
declare const ServerApi: () => ServerApi;
export default ServerApi;
//# sourceMappingURL=serverApi.d.ts.map