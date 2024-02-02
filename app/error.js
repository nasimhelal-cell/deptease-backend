const notfound=(req,res,next)=>{
    const error = new Error('Resource not found');
    error.status= 404;
     next(error)
}

const error = (error,req,res)=>{
    if(error.status){
        return res.status(error.status).json({message:error.message})
    }
    
    return res.status(500).json({message:'Something went wrong'})
   

}

const globalError = [notfound,error];

export default globalError