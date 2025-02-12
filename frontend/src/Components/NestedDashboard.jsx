import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material"
import { useEffect ,useState} from "react"
// import refreshToken from "./refreshTokenLogic"

const NestedDashboard = () => {

  const [eventData, setEventData] = useState([])
  console.log(eventData)

  const getEventData = async()=>{
    const token = localStorage.getItem("token")
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/event-data`, {
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if(data.success === 'ok') return setEventData(data.eventDetails) 
    // if(data.message === 'unauthorized' && !retry){
    //   await refreshToken()
    //   return getEventData(true)
    // }
  }

  useEffect(()=>{
    getEventData()
  },[])

  return (
    <>
      <Container maxWidth='md' sx={{mt:10,display:'flex',justifyContent:'center',alignItems:'center'}} >
            <TableContainer sx={{maxWidth:700,border:'2px solid lightgray',borderRadius:3}} >
              <Table sx={{width:'100%'}} >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{borderRight:'1px solid lightgray',fontWeight:'bolder'}} >EventName</TableCell>
                    <TableCell sx={{borderRight:'1px solid lightgray',fontWeight:'bolder'}} >Description</TableCell>
                    <TableCell sx={{borderRight:'1px solid lightgray',fontWeight:'bolder'}} >Date</TableCell>
                    <TableCell sx={{borderRight:'1px solid lightgray',fontWeight:'bolder'}} >Location</TableCell>
                    <TableCell sx={{fontWeight:'bolder'}} >Attendes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    eventData.map((item,ind)=>(
                      <TableRow key={ind} >
                        <TableCell sx={{borderRight:'1px solid lightgray',}} >{item.name}</TableCell>
                        <TableCell sx={{borderRight:'1px solid lightgray',}} >{item.description}</TableCell>
                        <TableCell sx={{borderRight:'1px solid lightgray',}} >{item.date}</TableCell>
                        <TableCell sx={{borderRight:'1px solid lightgray',}} >{item.location}</TableCell>
                        <TableCell sx={{}} >{item.attendes}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>          
      </Container>
    </>
  )
}

export default NestedDashboard