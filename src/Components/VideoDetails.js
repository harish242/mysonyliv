import { AspectRatio } from "@mantine/core";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
export function VideoDetails() {
    const details=useLocation()
    const fullData=useSelector(state=>state.mainDataReducer.showdata)
    const {id}=useParams()
    // const urlt=details?.state?.videoURL
    console.log(fullData) 
    const filFullData=fullData.find(item=>item._id===id)
    console.log(filFullData)   
    const url=filFullData.video_url
  return (
    <AspectRatio ratio={16 / 8}>
  <video controls>
    <source
      src={url}
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
    </AspectRatio>
  );
}

