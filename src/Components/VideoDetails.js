import { AspectRatio } from "@mantine/core";
import { useLocation } from "react-router";
export function VideoDetails() {
    const details=useLocation()
    const urlt=details?.state?.videoURL
    console.log(urlt)    
  return (
    <AspectRatio ratio={16 / 8}>
  <video controls>
    <source
      src={urlt}
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
    </AspectRatio>
  );
}

