const base = "http://localhost:8080"

//auth ✅
//register ✅
//login ✅
//get ✅
//get by id ✅
//apply ✅
//delete ✅

export const applicant_auth = async(obj)=>{
    const res = await fetch(`$(base)/api/applicant/auth`,{
        method : "POST",
        body : JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json"
        },
    });
    const output = await res.json();
    return output;
}


export const applicant_register = async(obj)=>{
    const res = await fetch(`$(base)/api/applicant/signup`,{
        method : "POST",
        body : JSON.stringify(obj),
        headers : {
            "Content-type" : "application/json",
        },
    });

    const output = await res.json();
    return output;
}

export const applicant_login = async(obj)=>{
    const res = await fetch(`$(base)/api/applicant/getapplication`,{
        method : "POST",
        body : JSON.stringify(obj),
        headers : {
            "content-type" : "application/json"
        },
    });

    const output = await res.json();
    return output;
}

export const applications_get = async(obj)=>{

    const res = await fetch(`$(base)/api/applicant/getapplication`,{
        method : 'POST',
        body : JSON.stringify(obj),
        headers : {
            "Content-type": "application/json"
        },
    });

    const output = await res.json();
    return output;
}

export const applications_get_by_id = async(obj)=>{

    const res = await fetch(`$(base)/api/applicant/getapplicationdet`,{
        method : 'POST',
        body : JSON.stringify(obj),
        headers : {
            "Content-type": "application/json"
        },
    });

    const output = await res.json();
    return output;
}

export const apply_applications = async(obj)=>{

    const res = await fetch(`$(base)/api/applicant/application`,{
        method : 'POST',
        body : JSON.stringify(obj),
        headers : {
            "Content-type": "application/json"
        },
    });

    const output = await res.json();
    return output;
}

export const applications_delete = async(obj)=>{

    const res = await fetch(`$(base)/api/applicant/getapplication`,{
        method : 'DELETE',
        body : JSON.stringify(obj),
        headers : {
            "Content-type": "application/json"
        },
    });

    const output = await res.json();
    return output;
}