import { Card, Image, Text } from "@mantine/core";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { SimpleGrid } from '@mantine/core'
import { Button } from '@mantine/core';

export default function AddedItems() {
   
  const addItem = useSelector((state) => state.AddItems);

  const token=useSelector(state=>state.resetPassword.token)
  const dispatch=useDispatch()
  const result = addItem.cartItems;
  const filteredstore=addItem.filteredItems
  console.log('store/14',addItem)
  useEffect(()=>{
    try{
          (async()=>{
            const response=await fetch('https://academics.newtonschool.co/api/v1/ott/watchlist/like',
            {method:"GET",headers:{'Authorization':`Bearer ${token}`,"projectid":"xybcw190kyb8"}})
            const datat=await response.json()
            dispatch({type:'ADD_ITEM',payload:datat.data.shows})
            console.log('addedItem/17',datat.data.shows)

          })()
    }catch(err){
      console.log(err)
    }
  },[])
  if(result){
    var favItems=result.reduce((acc,curr)=>{
      const found=acc.find(item=>item._id===curr._id)
      if(!found){
        acc.push(curr)
      }
      return acc
    },[])
    console.log('favIt/36',favItems)
  }
  useEffect(()=>{
    dispatch({type:'FILTERED_ITEMS',payload:favItems})

  },[])
  const removeFunc=(id)=>{
    const dam=[...filteredstore]
    console.log('addit/46',dam)
    const final=dam.filter(item=>item._id!==id)
    dispatch({type:'FILTERED_ITEMS',payload:final})
    //  console.log('dam/46',final)
  }
  
   
  return (
    <div style={{marginTop:'16px'}}>
      <SimpleGrid cols={5}   breakpoints={[
        { maxWidth: 'md', cols: 3, spacing: 'md' },
        { maxWidth: 'sm', cols: 2, spacing: 'sm' },
        { maxWidth: 'xs', cols: 1, spacing: 'sm' },
      ]}>
      {filteredstore&&filteredstore.map((item,index)=>{
        return(
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
    
              <Text weight={500} size="sm" mt="md">
                {item.title?.slice(0, 25)}
              </Text>
             
    
              <Text mt="xs" color="red"  size="xl" onClick={()=>removeFunc(item._id)}> 
              Remove                             
               </Text>
            </Card>
            {/* <Button  color="ocean-blue">
              remove
              </Button> */}
          {/* ))} */}
           
    
        </div>
        )
      })}
    </SimpleGrid>
    </div>  
  );
}
