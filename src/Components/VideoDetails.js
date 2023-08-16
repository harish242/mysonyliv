import { AspectRatio } from '@mantine/core';
import {useLocation} from 'react-router'
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';



// export function VideoDetails() {
//     const details=useLocation()
//     const urlt=details?.state?.videoURL
//     console.log(urlt)
//     const videoUrl=useSelector(state=>state.showDetailsReducer)
//     console.log('video/10',videoUrl)
//     console.log('videoDetails',videoUrl?.showDetails[0]?.video_url)
//     const zzz=videoUrl?.showDetails[0]?.video_url
//   return (
//     <AspectRatio ratio={16 / 9}>
//       <iframe
//         src={zzz}
//         title="YouTube video player"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       />
//     </AspectRatio>
//   );
// }
export function VideoDetails(){
    const[state,setState]=useState({})
    useEffect(() => {
        try {
          (async () => {
            const response = await fetch(
              //   "https://academics.newtonschool.co/api/v1/ott/show",
              "https://academics.newtonschool.co/api/v1/ott/show?page=2&limit=10",
              { method: "GET", headers: { projectid: "xybcw190kyb8" } }
            );
            const datas = await response.json();
            // console.log('home/24',datas.data[0].thumbnail);
            console.log('videoDetails/40',datas)
            setState(datas);
            // dispatch({type:'FETCH_SHOW_DETAILS_SUCCESS',payload:datas.data})
            // dispatch({type:'FETCH_SHOW_DETAILS_SUCCESS',payload:'MassOfmasses'})
    
    
          })();
        } catch (e) {
          console.log(e);
        }
      }, []);
    //   console.log('vd/51',state.data[0].video_url)
      const mass=state.data&&state.data[0].video_url
      console.log(mass)
      return (
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={"https://www.youtube.com/embed/Dorf8i6lCuk"}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>
      )
}