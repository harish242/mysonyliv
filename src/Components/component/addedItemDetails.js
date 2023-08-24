import { Card, Image, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AddedItems() {
   
  const addItem = useSelector((state) => state.AddItems);
  const token=useSelector(state=>state.resetPassword.token)
  const result = addItem.AddItems;
  console.log(token)
  useEffect(()=>{
    try{
          (async()=>{
            const response=await fetch('https://academics.newtonschool.co/api/v1/ott/watchlist/like',
            {method:"GET",headers:{'Authorization':`Bearer ${token}`,"projectid":"xybcw190kyb8"}})
            const data=await response.json()
            console.log('addedItem/17',data)

          })()
    }catch(err){
      console.log(err)
    }
  })
  
   
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginTop: "30px",
      }}
    >
      {/* {map((item,index) => ( */}
        <Card
          shadow="sm"
          padding="xl"
          component="a"
          
          // href={item.video_url}
          target="_self"
          // onClick={()=>removeItem(index)}
          // key={item._id}
        >
          <Card.Section>
            <Image
              // src={item.thumbnail}
              height={260}
              alt="No way!"
              width={220}
            />
          </Card.Section>

          <Text weight={500} size="sm" mt="md">
            {/* {item.title.slice(0, 25)} */}
          </Text>
          <button>
            remove
          </button>

          <Text mt="xs" color="dimmed" size="sm">
            {/* Please click anywhere on this card to claim your reward, this is not a fraud, trust us */}
            {/* {item.description} */}
          </Text>
        </Card>
      {/* ))} */}
       

    </div>
  );
}
