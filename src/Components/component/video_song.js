import { useSelector } from "react-redux"
export const VideoSong=()=>{
    const videoDetails=useSelector(state=>state.mainDataReducer.showdata)
    console.log('vs/4',videoDetails)
    const movieData=videoDetails?.filter(item=>item.type==='video song')
    console.log(movieData)
    return(
        <>
        <div>Harish is great</div>
        </>
    )
}