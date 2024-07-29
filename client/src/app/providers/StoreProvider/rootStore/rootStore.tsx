/* eslint-disable indent */
import { observable, action, makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';

import { User } from '@/entities/User';
import { UserNavType } from '@/features/getUserNav';
import { DEV_MODE_LOCALSTORAGE_KEY, LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';

// Создатель общего стора приложения

const isDevMode = localStorage.getItem(DEV_MODE_LOCALSTORAGE_KEY) === 'true' ? true : false;
const isDarkTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === 'app_dark_theme' ? true : false;

class RootStore {
    
    constructor() {
        makeAutoObservable(this)
    }

    @observable 

        devMode: boolean = isDevMode;
        darkTheme: boolean = isDarkTheme;

        userNavData?: IPromiseBasedObservable<UserNavType>
        user?: User;
        auth?: boolean;

        focusedCardNumber: number = -1;
        focusedPersonId: string = "";

    @action
    updateAuth( value?: boolean) {   
        if (value !== undefined) {
            this.auth = value
        } else {
            this.auth = Boolean(this.user?.fullName)                
        }
    }
        updateFocusedCardNumber(newResult: number) {
            this.focusedCardNumber = newResult;
        }

        updateFocusedPersonId(newResult: string) {
            this.focusedPersonId = newResult;
        }

        updateDevMode(newStatus: boolean) {
            localStorage.setItem(DEV_MODE_LOCALSTORAGE_KEY, newStatus.toString())
            this.devMode = newStatus;
        }
        
        updateDarkTheme(newStatus: boolean) {
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newStatus.toString())
            this.darkTheme = newStatus;
        }

        updateUserNav(newData: PromiseLike<UserNavType>) {
            this.userNavData = fromPromise(newData, this.userNavData);
        }
        updateUser(newUser: User) {
            this.user = newUser
        }

}

export default RootStore;