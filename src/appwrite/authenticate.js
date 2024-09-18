import {Client,Account,ID} from 'appwrite'
import config from '../config'
class authservice{
    client = new Client
    account;
    constructor(){
        this.client
        .setEndpoint(config.appwriteurl)
        .setProject(config.projectid)
        this.account = new Account(this.client)
    }
    async createacc({email,password,Name}){
        try {
            let createacc =  await this.account.create(ID.unique(),email,password,Name)
            if(createacc){
               
              await this.login({email,password})
            }

        } catch (error) {
            console.log('Appwrite error---> &nbsp;'+error)
        }
    }
    async login({email,password}){
        try {  
           let response =  await this.account.createEmailSession(email,password)
           if(response){
               localStorage.setItem('token','login');   
               return response
           }
        } catch (error) {
          console.log('Appwrite error --> ' + error)
        }
    }
    async getacc(){
        try {
            
           let response =  await this.account.get()
            if(response){
                // resp = response
                // console.log(response);
                localStorage.setItem('token','login');   
                return response
            }
        } catch (error) {
            console.log('Appwrite error---> &nbsp;'+error)
        }
    }
    async logout(){
        
            try {
                return await this.account.deleteSession('current')
            } catch (error) {
                console.log('Appwrite error---> &nbsp;'+error)
            }
        
    }
}

const authobject = new authservice()

export default authobject
