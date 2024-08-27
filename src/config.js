

 const config = {
   appwriteurl: import.meta.env.VITE_APPWRITE_URL,
   projectid: import.meta.env.VITE_APPWRITE_PROJECT_ID,
   database: import.meta.env.VITE_APPWRITE_DATABASE_ID,
   expenses: import.meta.env.VITE_APPWRITE_EXPENSES_COLLECTION_ID,
   lendings: import.meta.env.VITE_APPWRITE_LENDINGS_COLLECTION_ID,
   queries: import.meta.env.VITE_APPWRITE_Queries_COLLECTION_ID,
   Admin:import.meta.env.VITE_APPWRITE_Admin_COLLECTION_ID,
   bucketid: import.meta.env.VITE_APPWRITE_BUCKET_ID
}
export default config