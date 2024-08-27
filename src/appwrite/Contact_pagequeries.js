import config from "../config";
import {Client,Databases,ID} from 'appwrite'

class queryservice {
     client = new Client()
     database;
     constructor(){
        this.client
        .setEndpoint(config.appwriteurl)
        .setProject(config.projectid)
        this.database = new Databases(this.client)
     }
     async sendquery({Name,Email,Purpose,Message}){
        let date = new Date()
        date = date.toDateString()
        console.log(Name)
        try {
            return await this.database.createDocument(config.database,config.queries,ID.unique(),{
                Name,Email,Purpose,Message,date
            })
        } catch (error) {
            console.log("appwrite error --> " + error)
        }
     }

     
     
     
    }
    const queryobject = new queryservice()
    export default queryobject
