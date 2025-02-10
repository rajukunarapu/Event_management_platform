import { Container, Paper, Typography } from "@mui/material"
import { useEffect ,useState} from "react"


const NestedDashboard = () => {

  const [eventData, setEventData] = useState([])
  console.log(eventData)

  const getEventData = async()=>{
    const token = localStorage.getItem("token")
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/event-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setEventData(data)
  }

  useEffect(()=>{
    getEventData()
  },[])

  return (
    <>
      <Container maxWidth='md' sx={{mt:10}} >
        <Paper elevation={4} sx={{borderRadius:2,display:'flex',justifyContent:'center',alignItems:'flex-start',flexDirection:'column',p:2}} >
            <Typography variant="h6" fontWeight={'bold'} >EVENT DETAILS:</Typography>
            <Typography variant="body1" fontWeight={'bold'} mt={4}>Event Name:</Typography>
            <Typography variant="body1" fontWeight={'bold'} mt={2}>{}</Typography>
            <Typography variant="body1" fontWeight={'bold'} mt={2}>Event Description:</Typography>
            <Typography variant="body1" fontWeight={'bold'} mt={2}>{}</Typography>
            <Typography variant="body1" fontWeight={'bold'} mt={2}>Event Date:</Typography>
            <Typography variant="body1" fontWeight={'bold'} mt={2}>{}</Typography>
            <Typography variant="body1" fontWeight={'bold'} mt={2}>Event Location:</Typography>
            <Typography variant="body1" fontWeight={'bold'} mt={2}>{}</Typography>
            <Typography variant="body1" fontWeight={'bold'} mt={2}>Event Attendes:</Typography>
            <Typography variant="body1" fontWeight={'bold'} mt={2}>{}</Typography>
            
            
          </Paper>
      </Container>
    </>
  )
}

export default NestedDashboard