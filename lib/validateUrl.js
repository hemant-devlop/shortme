import validator from "validator";

export default function validateUrl(url){

    return validator.isURL(url,{
        protocols:["http","https"],
        require_protocol:true
    });

}