import axios from "axios";

interface IKhaltiData{
    return_url : string, 
    website_url : string, 
    totalAmount : number, 
    purchase_order_id : string, 
    purchase_order_name : string
}

const khaltiPayment=async(data:IKhaltiData)=>{
       const response =  await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",{
          return_url : data.return_url, 
          website_url : data.website_url, 
          amount : data.totalAmount * 100, 
          purchase_order_id : data.purchase_order_id, 
          purchase_order_name : "order_" + data.purchase_order_name
       },
       {
          headers : {
            Authorization : "Key d6b8b250e2024fb5b258a9beee2fa6c6"
          }
        })
      const khaltiResponse = response.data 
    console.log(khaltiResponse)
    return response
      
}

export {khaltiPayment}