import { Client,Databases, Query,Storage,ID} from "appwrite";
import config from "../config";

 class documentservice{
    client = new Client();
    database;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appwriteurl)
        .setProject(config.projectid)
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client);
    }
    async createdocument ({Day,Month,Year,category,Desc,Amount,featuredimage,userid,Method}){
        try {
            console.log(typeof Amount);
            return await this.database.createDocument(config.database,config.expenses,ID.unique(),{
                Day,Month,Year,category,Desc,Amount,featuredimage,userid,Method
            }
                )
        } catch (error) {
            console.log('appwrite error' + error)
        }
    }
    async getdocument(id){
        try {
            return await this.database.getDocument(config.appwritedatabaseid,config.appwritecollectionid,id)
        } catch (error) {
            console.log("appwrite error" + error)
        }
    }
    async updatedocument(id,{Day,Month,Year,category,Desc,Amount,featuredimage,Method}){
        try {
            
            return await this.database.updateDocument(config.database,config.expenses,id,{
                Day,Month,Year,Desc,category,featuredimage,Amount,Method })
         } catch (error) {
            console.log("appwrite error " + error)
        }
    }
    async deletedocument(id){
        try {
            return await this.database.deleteDocument(
                config.database,config.expenses,id
            )
        } catch (error) {
            console.log("appwrite error" + error)
        }
    }
    async getGuestdocuments(){
        try{
            return await this.database.listDocuments(
                config.database,config.Guest,
                [Query.equal("type",['Expenses'])]
            )
        }
        catch (error) {
            console.log("appwrite error " + error)
        }
    }
    async listdocuments(userid){
        try {
           
            
            return await this.database.listDocuments(
                config.database,config.expenses,[
                Query.equal("userid",[userid])
                ]
            )
        } catch (error) {
            console.log("appwrite error " + error)
        }
    }
 
    //creating methods to upload and delete data
    async uploadfile(file){
        try {
            return await this.bucket.createFile(config.bucketid,ID.unique(),file)
        } catch (error) {
            console.log("appwrite error" + error)
            return false;
        }
    }
    async deletefile(id){
        try {
            return await this.bucket.deleteFile(config.bucketid,id)
        } catch (error) {
            console.log("appwrite error" + error)
            return false;
        }
    }
    getfilepreview(id){
        return this.bucket.getFilePreview(config.bucketid,id)
    }
    getfileview(id){
    return this.bucket.getFileView(config.bucketid,id)
    }
}

const expense_object = new documentservice();

export default expense_object