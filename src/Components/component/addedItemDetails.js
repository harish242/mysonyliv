import { Card, Image, Text } from "@mantine/core";
// import { useSelector } from "react-redux";

export default function AddedItems() {
   
  // const addItem = useSelector((state) => state);
  // const result = addItem.AddItems.cartItems;


  const data=JSON.parse(localStorage.getItem('show'))||[]
  console.log('addItems/17',data)
  const master=data.map(item=>item)
  console.log('addI/161',master)
  const uniqData =data.reduce((acc,obj) => {
    const found = acc.find(item => item._id === obj._id)    
    if(!found){    
    acc.push(obj)    
    }    
    return acc    
    },[])
    const removeItem=(index)=>{
      const updatedRemovedItems=data.filter(item=>item._id===data[index]._id)
      // console.log('addI/rI',updatedRemovedItems)
      if(updatedRemovedItems!==-1){
        data.splice(updatedRemovedItems,1)
      }
      localStorage.setItem('show',JSON.stringify(updatedRemovedItems))
    }
  console.log('addItem/26',uniqData)

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginTop: "30px",
      }}
    >
      {uniqData&&uniqData.map((item,index) => (
        <Card
          shadow="sm"
          padding="xl"
          component="a"
          
          // href={item.video_url}
          target="_self"
          onClick={()=>removeItem(index)}
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
            {item.title.slice(0, 25)}
          </Text>
          <button>
            remove
          </button>

          <Text mt="xs" color="dimmed" size="sm">
            {/* Please click anywhere on this card to claim your reward, this is not a fraud, trust us */}
            {/* {item.description} */}
          </Text>
        </Card>
      ))}
       

    </div>
  );
}
