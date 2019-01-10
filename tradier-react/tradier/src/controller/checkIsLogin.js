export const isLoginOrNot = () =>{
    if( localStorage.getItem('code')){
        return true;
    }else{
        return false;
    }
}