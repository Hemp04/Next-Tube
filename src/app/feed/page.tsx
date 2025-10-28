"use client"
// try with remove and adding above line



const Page = ()=>{
    console.log("where it is logged");
    // to use effect here use client is must otherwise it gives error-as this is client componet then only use effect is allowed and when server component is there you can not be able to use use effect
    // learn server and client component difference
    
    return  (
        <div>
            Feed Page!!
        </div>
    );
};
export default Page;