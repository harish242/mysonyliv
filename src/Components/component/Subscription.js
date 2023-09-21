import { Table } from "@mantine/core";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import Demo from "./pate";

export function Subscription() {
  const one = useSelector((state) => state);
  console.log(one);

  const [selectedColumn, setSelectedColumn] = useState(-1);
  const [rate, setRate] = useState("select subscription"); // Default value
  console.log("subscription/13", rate);

  // Function to toggle selection of a column
  const toggleColumnSelection = (index) => {
    setSelectedColumn(index === selectedColumn ? -1 : index);
  };

  useEffect(() => {
    switch (selectedColumn) {
      case 1:
        setRate("Pay $599");
        return;
      case 2:
        setRate("Pay $999");
        return;
      case 3:
        setRate("Pay $699");
        return;
      case 4:
        setRate("Pay $299");
        return;
      default:
        setRate("select subscription");
    }
  }, [selectedColumn]);

  // Helper function to check if a column is selected
  const isColumnSelected = (index) => index === selectedColumn;
  console.log("selectedColumn/19", selectedColumn);

  return (
    <div
      style={{
        backgroundColor: "#141414",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          textAlign: "center",
          margin: "auto",
          overflow: "scroll",
          height: "90%",
        }}
      >
        <Table
          withBorder
          withColumnBorders
          verticalSpacing="sm"
          horizontalSpacing="lg"
          centered
          style={{
            color: "white",
            margin: "auto",
            width: "70%",
            marginTop: "65px",
            height: "auto",
          }}
        >
          <caption>
            <h2>Subscribe to watch all content on Sony LIV</h2>
          </caption>
          <thead>
             <tr>
              <th style={{ textAlign: "center", color: "white",zIndex:'3000'}}>
                <div>Access All Content</div>
                <span>Movies, Orginals And Live Sports</span>
              </th>
              <th
                style={{
                  textAlign: "center",
                  color: "white",
                  backgroundColor: isColumnSelected(1) ? "#0066FF" : "",
                }}
                onClick={() => toggleColumnSelection(1)}
              >
                <input type="radio" name="subs" 
                checked={isColumnSelected(1)}
                />
                <div>Mobile Only</div>
                <span>$599 Yearly</span>
              </th>
              <th
                style={{
                  textAlign: "center",
                  color: "white",
                  backgroundColor: isColumnSelected(2) ? "#0066FF" : "",
                }}
                onClick={() => toggleColumnSelection(2)}
              >
                <input type="radio" name="subs"
                checked={isColumnSelected(2)}
                />
                <div>LIV Premium</div>
                <span>$999 Yearly</span>
              </th>
              <th
                style={{
                  textAlign: "center",
                  color: "white",
                  backgroundColor: isColumnSelected(3) ? "#0066FF" : "",
                }}
                onClick={() => toggleColumnSelection(3)}
              >
                <input type="radio" name="subs"
                checked={isColumnSelected(3)}
                />
                <div>LIV Premium</div>
                <span>$699 6Months</span>
              </th>
              <th
                style={{
                  textAlign: "center",
                  color: "white",
                  backgroundColor: isColumnSelected(4) ? "#0066FF" : "",
                }}
                onClick={() => toggleColumnSelection(4)}
              >
                <input type="radio" name="subs"
                checked={isColumnSelected(4)}
                />
                <div>LIV Premium</div>
                <span>$299 6Monthly</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>
                  <span>No of logged devices</span>
                  <span>
                    {/* <IoMdInformationCircleOutline /> */}
                  </span>
                </div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(1) ? "#0066FF" : "",
                  opacity:isColumnSelected(1)?0.5:1
                }}
                onClick={() => toggleColumnSelection(1)}
              >
                <div style={{ width: "100%", height: "100%",color:'whitesmoke',opacity:1 }}>1</div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(2) ? "#0066FF" : "",
                  opacity:isColumnSelected(2)?0.5:1
                }}
                onClick={() => toggleColumnSelection(2)}
              >
                <div style={{ width: "100%", height: "100%" }}>5</div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(3) ? "#0066FF" : "",
                  opacity:isColumnSelected(3)?0.5:1
                }}
                onClick={() => toggleColumnSelection(3)}
              >
                <div style={{ width: "100%", height: "100%" }}>5</div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(4) ? "#0066FF" : "",
                  opacity:isColumnSelected(4)?0.5:1
                }}
                onClick={() => toggleColumnSelection(4)}
              >
                <div style={{ width: "100%", height: "100%" }}>1</div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>Watch on devices at same time</span>
                  <span>
                    {/* <IoMdInformationCircleOutline /> */}
                  </span>
                </div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(1) ? "#0066FF" : "",
                  opacity:isColumnSelected(1)?0.5:1
                }}
                onClick={() => toggleColumnSelection(1)}
              >
                <div style={{ width: "100%", height: "100%" }}>1</div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(2) ? "#0066FF" : "",
                  opacity:isColumnSelected(2)?0.5:1
                }}
                onClick={() => toggleColumnSelection(2)}
              >
                <div style={{ width: "100%", height: "100%" }}>2</div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(3) ? "#0066FF" : "",
                  opacity:isColumnSelected(3)?0.5:1
                }}
                onClick={() => toggleColumnSelection(3)}
              >
                <div style={{ width: "100%", height: "100%" }}>2</div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(4) ? "#0066FF" : "",
                  opacity:isColumnSelected(4)?0.5:1
                }}
                onClick={() => toggleColumnSelection(4)}
              >
                <div style={{ width: "100%", height: "100%" }}>1</div>
              </td>
            </tr>
            <tr>
              <td>
                <span>Max Video Quality</span>
                <span>
                  {/* <IoMdInformationCircleOutline /> */}
                </span>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(1) ? "#0066FF" : "",
                  opacity:isColumnSelected(1)?0.5:1
                }}
                onClick={() => toggleColumnSelection(1)}
              >
                <div style={{ width: "100%", height: "100%" }}>HD(720p)</div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(2) ? "#0066FF" : "",
                  opacity:isColumnSelected(2)?0.5:1
                }}
                onClick={() => toggleColumnSelection(2)}
              >
                <div style={{ width: "100%", height: "100%" }}>
                  FULL HD(1080p)
                </div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(3) ? "#0066FF" : "",
                  opacity:isColumnSelected(3)?0.5:1
                }}
                onClick={() => toggleColumnSelection(3)}
              >
                <div style={{ width: "100%", height: "100%" }}>
                  FULL HD(1080p)
                </div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(4) ? "#0066FF" : "",
                  opacity:isColumnSelected(4)?0.5:1
                }}
                onClick={() => toggleColumnSelection(4)}
              >
                <div style={{ width: "100%", height: "100%" }}>
                  FULL HD(1080p)
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span>Max Audio Quality</span>
                <span>
                  {/* <IoMdInformationCircleOutline /> */}
                </span>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(1) ? "#0066FF" : "",
                  opacity:isColumnSelected(1)?0.5:1
                }}
                onClick={() => toggleColumnSelection(1)}
              >
                <div style={{ width: "100%", height: "100%" }}>Stereo 2.1</div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(2) ? "#0066FF" : "",
                  opacity:isColumnSelected(2)?0.5:1
                }}
                onClick={() => toggleColumnSelection(2)}
              >
                <div style={{ width: "100%", height: "100%" }}>Stereo 2.1</div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(3) ? "#0066FF" : "",
                  opacity:isColumnSelected(3)?0.5:1
                }}
                onClick={() => toggleColumnSelection(3)}
              >
                <div style={{ width: "100%", height: "100%" }}>Stereo 2.1</div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(4) ? "#0066FF" : "",
                  opacity:isColumnSelected(4)?0.5:1
                }}
                onClick={() => toggleColumnSelection(4)}
              >
                <div style={{ width: "100%", height: "100%" }}>Stereo 2.1</div>
              </td>
            </tr>
            <tr>
              <td>
                <span>Advertisement</span>
                <span>
                  {/* <IoMdInformationCircleOutline /> */}
                </span>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(1) ? "#0066FF" : "",
                  opacity:isColumnSelected(1)?0.5:1
                }}
                onClick={() => toggleColumnSelection(1)}
              >
                <div style={{ width: "100%", height: "100%" }}>
                  On Live Sports, Channels & Reality TV Shows
                </div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(2) ? "#0066FF" : "",
                  opacity:isColumnSelected(2)?0.5:1
                }}
                onClick={() => toggleColumnSelection(2)}
              >
                <div style={{ width: "100%", height: "100%" }}>
                  On Live Sports, Channels & Reality TV Shows
                </div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(3) ? "#0066FF" : "",
                  opacity:isColumnSelected(3)?0.5:1
                }}
                onClick={() => toggleColumnSelection(3)}
              >
                <div style={{ width: "100%", height: "100%" }}>
                  On Live Sports, Channels & Reality TV Shows
                </div>
              </td>
              <td
                style={{
                  backgroundColor: isColumnSelected(4) ? "#0066FF" : "",
                  opacity:isColumnSelected(4)?0.5:1
                }}
                onClick={() => toggleColumnSelection(4)}
              >
                <div style={{ width: "100%", height: "100%" }}>
                  On Live Sports, Channels & Reality TV Shows
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="responsive-modals" style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Conditionally render the button based on the rate value */}
        {rate === 'select subscription' ? (
          <Button variant="filled" color="cyan" style={{ backgroundColor: 'white', color: 'black' }} disabled>{rate}</Button>
        ) : (
          <Demo rat={rate} />
        )}
      </div>
    </div>
  );
}
