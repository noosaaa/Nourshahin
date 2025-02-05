module.exports=(err,req,res,nxt)=>{
    for(let e in err.erros){
        console.log(err.errors[e].message); // Log the validation error message
        res.status(500).send("Internal Server Error"); // Send a response with the validation error message
    }
}