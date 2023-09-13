import { AspectRatio } from "@mantine/core";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
export function VideoDetails() {
    const details=useLocation()
    const fullData=useSelector(state=>state.others.mainDataReducer.showdata)
    const {id}=useParams()
    console.log('vd/9',details)
    const url=details.state.video_url

    // const urlt=details?.state?.videoURL
    // console.log('video/10',fullData) 
    // const movie = useSelector((state) => state.persisted.AddItems.movie);
    // // selectedShow = movie.find(item => item._id === id);
  
    // const tvshow = useSelector((state) => state.persisted.AddItems.tvshow);
    // // const selectedShow = movie.find(item => item._id === id);
  
    // const webseries = useSelector((state) => state.persisted.AddItems.webseries);
    // // const selectedShow = movie.find(item => item._id === id);
  
    // const documentary = useSelector(
    //   (state) => state.persisted.AddItems.documentary
    // );
    // // const selectedShow = movie.find(item => item._id === id);
  
    // const trailer = useSelector((state) => state.persisted.AddItems.trailer);
    // // const selectedShow = movie.find(item => item._id === id);
  
    // const videosong = useSelector((state) => state.persisted.AddItems.videosong);
    // // const selectedShow = movie.find(item => item._id === id);
  
    // const shortfilm = useSelector((state) => state.persisted.AddItems.shortfilm);
    // // const selectedShow = movie.find(item => item._id === id);
    // const manStore = useSelector(
    //   (state) => state.others.mainDataReducer.showdata
    // );
  
    // const showDetails = [
    //   ...movie,
    //   ...videosong,
    //   ...shortfilm,
    //   ...trailer,
    //   ...webseries,
    //   ...documentary,
    //   ...tvshow,
    //   ...manStore,
    // ];
    // const filFullData=showDetails.find(item=>item._id===id)
    // console.log('video/12',filFullData)   
    // const url=filFullData?.video_url
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

