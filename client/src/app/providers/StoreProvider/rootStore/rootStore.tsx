/* eslint-disable indent */
import { observable, action, makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';

import { UserNavType } from '@/entities/Navigation';
import { Favorites, User } from '@/entities/User';
import { DEV_MODE_LOCALSTORAGE_KEY, LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage'

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
        auth: string | null = null;
        isNavChange: boolean = false;
        favorites: Favorites = []

        focusedCardNumber: number = -1;
        focusedPersonId: string = "";

    @action
        updateAuth( value: string | null) {   
            this.auth = value
            if (!value) {
                this.user = undefined;
                this.favorites = [];
                this.userNavData = undefined;
                this.focusedCardNumber = -1;
                this.focusedPersonId = "";
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

        updateNavChanged(value: boolean) {
            this.isNavChange = value;
        }

        updateFavorites(value: Favorites) {
            this.favorites = value;
        }

}

export default RootStore;