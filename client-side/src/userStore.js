import {extendObservable} from 'mobx';


class UserStore{
    constructor(){
        extendObservable(this)
    }
}