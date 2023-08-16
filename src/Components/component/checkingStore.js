import {useSelector} from 'react-redux'
// import {showDetailsReducer} from '../react-redux/reducer'
export const CheckingCom=()=>{
    const data=useSelector(state=>state.showDetailsReducer)
    const secondData=useSelector(state=>state.mainDataReducer)
    // console.log('checkData',data)
    // console.log('checkCom',secondData)
    return (
        <div>Its working</div>
    )
}