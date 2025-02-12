import { Box, Container, TextField, Typography,Button } from "@mui/material";
import { useState } from "react";
// import refreshToken from "./refreshTokenLogic";

const NewEvent = () => {

  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [attendes, setAttendes] = useState('')

  const eventDetails = {
    "name":eventName,
    "description":description,
    "date":date,
    "location":location,
    "attendes":attendes
    
  }

  const submitEvent = async()=>{
    const token = sessionStorage.getItem("token")
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/submit-event`,{
      method:'POST',
      headers:{
        "Content-Type":'application/json',
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify({eventDetails})
    })
    const data = await res.json()
    // if(data.message === 'unauthorized' && !retry){
    //   await refreshToken();
    //   return submitEvent(true)
    // }
    console.log({"data":data})
  }

  const continueHandler = ()=>{
    if(eventName !== '' && description !== '' && date !== '' && location !== '' && !attendes !== ''){
      submitEvent()
      console.log(eventDetails)
      setEventName('')
      setDescription('')
      setDate('')
      setLocation('')
      setAttendes('')
    }
  }

  return (
    <>
      <Container maxWidth="sm"  sx={{ mt: 5 }}>
        <Box elevation={4} sx={{py:10,px:2, maxHeight:500,width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',border:'1px solid lightgray',borderRadius:5,backgroundColor:'lightgray' }} >

          <Typography variant="h5" fontWeight={'bold'} >New Event</Typography>
          <TextField placeholder="Event Name" type="text" variant="outlined" fullWidth size="medium"
            value={eventName} onChange={(e)=>setEventName(e.target.value)}
            sx={{ mt: 2, width: "60%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 8, backgroundColor: "white", border: "none",height:45,
                '& fieldset':{
                  border:'none'
                }
                },
            }}
          />
          <TextField placeholder="Description" type="text" variant="outlined" fullWidth size="medium"
            value={description} onChange={(e)=>setDescription(e.target.value)}
            sx={{ mt: 2, width: "60%",height:'100%',
              "& .MuiOutlinedInput-root": {
                borderRadius: 8, backgroundColor: "white", border: "none",height:45,
                '& fieldset':{
                  border:'none'
                }
                },
            }}
          />
          <TextField placeholder="Date" type="date" variant="outlined" fullWidth size="medium"
            value={date} onChange={(e)=>setDate(e.target.value)}
            sx={{ mt: 2, width: "60%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 8, backgroundColor: "white", border: "none",height:45,
                '& fieldset':{
                  border:'none'
                }
                },
            }}
          />
          <TextField placeholder="Location" type="text" variant="outlined" fullWidth size="medium"
            value={location} onChange={(e)=>setLocation(e.target.value)}
            sx={{ mt: 2, width: "60%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 8, backgroundColor: "white", border: "none",height:45,
                '& fieldset':{
                  border:'none'
                }
                },
            }}
          />
          <TextField placeholder="Number of Attendes" type="number" variant="outlined" fullWidth size="medium"
            value={attendes} onChange={(e)=>setAttendes(e.target.value)}
            sx={{ mt: 2, width: "60%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 8, backgroundColor: "white", border: "none",height:45,
                '& fieldset':{
                  border:'none'
                }
                },
            }}
          />
          <Button
          variant="contained"
          color="warning"
          sx={{
            width: "60%",
            mt: 4,
            color: "white",
            borderRadius: 8,
          }}
          size="large"
          onClick={continueHandler}
        >
          Continue
        </Button>

        </Box>
      </Container>
    </>
  );
};

export default NewEvent;
