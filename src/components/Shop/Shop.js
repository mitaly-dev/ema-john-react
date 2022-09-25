import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Product from '../Product/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight, faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import { addCartDB, clearDB } from '../Utilities/localStorage';

const Shop = () => {
    let [productData,setproductData]=useState([])
    useEffect(()=>{
        fetch('products.json')
        .then(res=>res.json())
        .then(data=>setproductData(data))
    },[])

    let [cartProduct,setCartProduct]=useState([])
    let [shipping,setShipping]=useState(0)
    let [total,setTotal]=useState(0)
    let [tax,setTax]=useState(0)
    let [grandTotal,setGrandTotal]=useState(0)


    const handleAddToCart=(product)=>{
        let newCart=[...cartProduct,product]
        setShipping(6)
        setCartProduct(newCart)
        addCartDB(product.name)
    }
    useEffect(()=>{
        let totals=cartProduct.reduce((prev,current)=>{
            return prev+current.price
        },0)
        setTotal(totals)
    },[cartProduct])

    // useEffect(()=>{
        
    // },[total])

    useEffect(()=>{
        let res=(total+shipping)*5/100
        setTax(parseInt(res))
    },[total])

    useEffect(()=>{
        let grand=tax+total+shipping
        setGrandTotal(grand)
    },[tax])


    const clear=()=>{
        setCartProduct([])
        setTotal(0)
        setShipping(0)
        setTax(0)
        setGrandTotal(0)
        clearDB()
    }
   

    return (
        <div className='grid grid-cols-5'>
            <div className='col-span-4'>
                <div className='grid grid-cols-3 gap-8 px-20 py-20'>
                {
                    productData.map(product=><Product product={product} key={product.id} handleAddToCart={handleAddToCart}></Product>)
                }
                </div>
            </div>
            <div className='col-span-1 bg-[#FFE0B3] py-10 px-5'>
               <h2 className='text-2xl font-semibold text-center pb-10'>Order Summary</h2>
               <div className='text-left capitalize'>
                <p className='text-[#2A414F] text-lg leading-10'>selected items: {cartProduct.length}</p>
                <p className='text-[#2A414F] text-lg leading-10'>Total Price: ${total}</p>
                <p className='text-[#2A414F] text-lg leading-10'>Total Shipping Charge: ${shipping}</p>
                <p className='text-[#2A414F] text-lg leading-10'>Tax: ${tax}</p>
                <p className='text-[#2A414F] text-lg leading-10 font-semibold'>Grand Total : ${grandTotal}</p>
               </div>
               <div>
               <div className=" text-white text-center mt-14 ">
                <button onClick={clear} className=" py-3 font-medium text-lg w-full bg-[#FF3030] rounded-md capitalize">clear cart
                <span className='pl-2'><FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon></span>
                </button>
                <button className=" py-3 font-medium text-lg w-full bg-[#FF9900] rounded-md capitalize mt-3">Review Order
                <span className='pl-2'><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></span>
                </button>
                
                </div>
               </div>
            </div>
        </div>
    );
};

export default Shop;