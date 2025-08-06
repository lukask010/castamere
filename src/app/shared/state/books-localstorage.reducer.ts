import { ActionReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";

export function booksLocalStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ 
        keys: ["books"],
        rehydrate: true, 
    })(reducer);
}
