import { AccessData, Message, UserI } from "./definitions";
import { ServerApi } from "../api/serverApi";
export declare class DbDoc implements DbDoc {
    [key: string]: AccessData | number | string | string[] | Function | Message[];
    identifierLabel: string;
    collectionKey: string;
    id: string;
    lockedFields: string[];
    init: (user: UserI, serverApi: ServerApi, callback?: Function | undefined) => void;
    toggleFieldLock: (key: string) => void;
    accessField: (label: string, value: string | {}, type: AccessData["type"], positionIndex: Number, selectionOptions?: string[] | null | undefined) => AccessData;
    mergeModel(dataObj?: DbDoc): void;
    accessibleFields: () => AccessData[];
    updateField: (serverApi: ServerApi, key: string, value: unknown) => void;
    remove: (user: UserI, serverApi: ServerApi) => boolean;
}
//# sourceMappingURL=dbDoc.d.ts.map