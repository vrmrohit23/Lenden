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
    async createdocument ({Day,Month,Year,Desc,Amount,userid,Method,Borrower_or_Lender,Return,category}){
        try {
            
            return await this.database.createDocument(config.database,config.lendings,ID.unique(),{
                Day,Month,Year,Desc,Amount,userid,Method,Borrower_or_Lender,Return,category
            }
            )
        } catch (error) {
            console.log('appwrite error' + error)
        }
    }
    async getdocument(id){
        try {
            return await this.database.getDocument(config.database,config.lendings,id)
        } catch (error) {
            console.log("appwrite error" + error)
        }
    }

    async updatedocument_Repayments(id,{Repayments,Repaid}){
        try {
            
            return await this.database.updateDocument(config.database,config.lendings,id,{
                Repayments,Repaid })   
         } catch (error) {
            console.log("appwrite error" + error)
        }
    }
    async updatedocument(id,{Day,Month,Year,category,Desc,Amount,featuredimage,Return}){
        try {
            return await this.database.updateDocument(config.database,config.lendings,id,{
                Day,Month,Year,Desc,category,featuredimage,Amount,Return })
         } catch (error) {
            console.log("appwrite error" + error)
        }
    }
    async deletedocument(id){
        try {
            return await this.database.deleteDocument(
                config.database,config.lendings,id
            )
        } catch (error) {
            console.log("appwrite error" + error)
        }
    }
    async getGuestdocuments(){
        try{
            return await this.database.listDocuments(
                config.database,config.Guest,
                [Query.equal("type",['Lendings'])]
            )
        }
        catch (error) {
            console.log("appwrite error " + error)
        }
    }
    async listdocuments(userid){
        try {
            console.log(userid)
            return await this.database.listDocuments(
                config.database,config.lendings,
                [Query.equal("userid",[userid])]
            )
        } catch (error) {
            console.log("appwrite error " + error)
            throw new Error(error)
        }
    }
    // for admin files
    // async admindocuments(){
    //     try {
    //         return await this.database.listDocuments(config.database,config.Admin)
    //     } catch (error) {
    //         console.log("appwrite error " + error)
    //     }
    // }
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

const lending_object = new documentservice();

export default lending_object