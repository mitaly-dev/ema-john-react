const getLocalData=()=>{
    let cart=JSON.parse(localStorage.getItem('cart'))
    if(!cart){
        cart={}
    }
    return cart;
}

const addCartDB=(title)=>{
    let cart=getLocalData()
    let newQuantity=cart[title]
    if(newQuantity){
        cart[title]=newQuantity+1
    }
    else{
        cart[title]=1
    }
    localStorage.setItem('cart',JSON.stringify(cart))
}

const clearDB=()=>{
    localStorage.removeItem('cart')
}




export {
    addCartDB,
    clearDB
}