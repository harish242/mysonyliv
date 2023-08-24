import { Table } from "@mantine/core";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";

export function Subscription() {
    const one=useSelector(state=>state)
    console.log(one)
  return (
    <div style={{backgroundColor:'#141414'}}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        maxWidth:'80%',
        textAlign:'center',
        margin:'auto',
        // color:'white'
        // backgroundColor:'#141414',
        // webkitTapHighlightColor: 'rgba(0,0,0,0)'
      }}
    >
      <Table
        highlightOnHover
        withBorder
        withColumnBorders
        verticalSpacing="sm"
        horizontalSpacing="lg"
         style={{ color: 'white' }}
       
        
        
      >
        <caption><h2>Subscribe to watch all content on Sony LIV</h2></caption>
        <thead >
          <tr>
            <th style={{textAlign:'center',color:'white'}}>
              <div>Access All Content</div>
              <span>Movies,Orginals And Live Sports</span>
            </th>
            <th style={{textAlign:'center',color:'white'}}>
              <input type="radio" />
              <div>Mobile Only</div>
              <span>$599 Yearly</span>
            </th>
            <th style={{textAlign:'center',color:'white'}}>
              <input type="radio" />
              <div>LIV Premium</div>
              <span>$999 Yearly</span>
            </th>
            <th style={{textAlign:'center',color:'white'}}>
              <input type="radio" />
              <div>LIV Premium</div>
              <span>$699 6Months</span>
            </th>
            <th style={{textAlign:'center',color:'white'}}>
              <input type="radio" />
              <div>LIV Premium</div>
              <span>$299 6Monthly</span>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td >
              <div>
              <span>No of logged devices</span>
              <span>
                <IoMdInformationCircleOutline />
              </span>
              </div>
            </td>
            <td >1</td>
            <td >5</td>
            <td >5</td>
            <td >1</td>
          </tr>
          <tr>
            <td >
              <div>
                <span>Watch on devices at same time</span>
                <span>
                  <IoMdInformationCircleOutline />
                </span>
              </div>
            </td>
            <td >1</td>
            <td >2</td>
            <td >2</td>
            <td >1</td>
          </tr>
          <tr>
            <td >
              <span>Max Video Quality</span>
              <span>
                <IoMdInformationCircleOutline />
              </span>
            </td>
            <td >HD(720p)</td>
            <td >FULL HD(1080p)</td>
            <td >FULL HD(1080p)</td>
            <td >FULL HD(1080p)</td>
          </tr>
          <tr>
            <td >
              <span>Max Audio Quality</span>
              <span>
                <IoMdInformationCircleOutline />
              </span>
            </td>
            <td>Sterio 2.1</td>
            <td>Sterio 2.1</td>
            <td>Sterio 2.1</td>
            <td>Sterio 2.1</td>
          </tr>
          <tr>
            <td >
              <span>Advertisement</span>
              <span>
                <IoMdInformationCircleOutline />
              </span>
            </td>
            <td>On Live Sports,Channels & Reality TV Shows</td>
            <td>On Live Sports,Channels & Reality TV Shows</td>
            <td>On Live Sports,Channels & Reality TV Shows</td>
            <td >On Live Sports,Channels & Reality TV Shows</td>
          </tr>
        </tbody>
      </Table>
    </div>
    </div>
  );
}
