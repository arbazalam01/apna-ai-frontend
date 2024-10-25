import {useState} from 'react'
import { FormGroup,FormControl,FormLabel,FormControlLabel,Checkbox,  Grid } from '@mui/material'
import { Typography,Select } from 'antd';

const checkboxTheme={
    fontSize: "0.8rem",
    color: "grey",
}

const CheckBoxes = () => {
    const [state, setState] = useState({
        Products: true,
        jason: false,
        antoine: false,
      });
    
      const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };
    
      const { gilad, jason, antoine } = state;

      const options3 = [
        { label: "Custom Selection", value: "a1" },
        { label: "Product Awareness", value: "a2" },
        { label: "Event Invitations", value: "a3" },
        { label: "Newsletter", value: "a4" },
        { label: "New Launch Alert", value: "a5" },
        { label: "Case Study", value: "a6" },
        // add more options as needed
      ];

  return (
<>
<Grid xs={12} pl={3}>
<Typography variant="h6" style={{fontSize:"1.5rem",color:"#000"}}>Email Content</Typography>
    <Typography variant="h6" style={{color:"#000"}}>Select items that you want the AI to include or use in crafting the emails.</Typography>

    <Select
              size={"middle"}
              defaultValue="a1"
              onChange={handleChange}
              style={{
                width: 300,
                height: 35,
                marginTop:"0.5rem",
              }}
              options={options3}
            />
</Grid>
<FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend" sx={checkboxTheme}>YOUR PROFILE</FormLabel>
        <FormGroup>
          
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
      </FormControl>

      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend" sx={checkboxTheme}>RECIPIENT PROFILE</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
      </FormControl>
    
      
      </>  )
}

export default CheckBoxes