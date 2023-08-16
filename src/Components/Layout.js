import NavBar from './NavBar'
const LayOut =(props)=>{
    return(
        <>
        <NavBar/>
        {props.children}
        </>
    )
}
export default LayOut