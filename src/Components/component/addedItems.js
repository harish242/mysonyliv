import { Card, Image, Text } from "@mantine/core";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { SimpleGrid } from '@mantine/core'
import { Button } from '@mantine/core';
import { useNavigate } from "react-router";
export default function AddedItems() {
  const navigate=useNavigate()
   
  const addItem = useSelector((state) => state.persisted.AddItems);
console.log('aD/11',addItem)
  const token=useSelector(state=>state.persisted.localJwtReducer.tokens)
  console.log('at/13',token)
  const dispatch=useDispatch()
  const result = addItem.cartItems;
  const [state,setState]=useState(true)

  useEffect(()=>{
    try{
          (async()=>{
            const response=await fetch('https://academics.newtonschool.co/api/v1/ott/watchlist/like',
            {method:"GET",headers:{'Authorization':`Bearer ${token}`,"projectID":"xybcw190kyb8"}})
            const datat=await response.json()
            console.log('addI/23',datat)
            if(datat.status==='success'){
            dispatch({type:'ADD_ITEM',payload:datat.data.shows})
            }
            else{
              setState(false)
            }
            // console.log('addedItem/28',datat.data.shows)
            
          })()
    }catch(err){
      console.log('runnningerr',err)


    }
  },[])
  if(!state){
    return <div style={{height:'500px',width:'500px',backgroundColor:'red',margin:'auto'}}>Plz login</div>
  }
 
  if(result.length===0){
    return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}><span>Your whishlist Is Empty</span></div>
  }
   
  return (
    <div style={{marginTop:'21px'}}>
      <SimpleGrid cols={5}   breakpoints={[
        { maxWidth: 'md', cols: 3, spacing: 'md' },
        { maxWidth: 'sm', cols: 2, spacing: 'sm' },
        { maxWidth: 'xs', cols: 1, spacing: 'sm' },
      ]}>

      {result&&result.map((item,index)=>{
         if (!item) {
          return null; // Skip rendering if the item is null
        }
        return(
          <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginTop: "29px",
            
          }}
          onClick={()=>navigate(`/showdetails/${item._id}`)}
        >
            <Card
              shadow="sm"
              padding="xl"
              component="a"
              
              // href={item.video_url}
              // target="_self"
              key={item._id}
            >
              <Card.Section>
                <Image
                  src={item.thumbnail}
                  height={260}
                  alt="No way!"
                  width={220}
                />
              </Card.Section>
    
              {/* <Text weight={500} size="sm" mt="md">
                {item.title?.slice(0, 25)}
              </Text>           */}
            </Card>
          
                     
    
        </div>
        )
      })}
    </SimpleGrid>
    </div>  
  );
}
