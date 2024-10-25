import { Divider, Grid, Typography } from '@mui/material'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import Component from '../Component'
import { useState } from 'react'
const Positioning = ({companyData}) => {

      const [open,setHandleOpen]=useState({
            corepurpose:false,
            positioning:false,
            keydifferentiators:false,
            brandpersonality:false
      })
         
      const handleOpen =(section)=>{
            setHandleOpen({ ...open, [section]: !open[section] });
                
      }
      
      
      
      const testStyle = {
      
            cursor: "pointer",
            fontSize: "1.2rem",
            fontWeight: "400",
          }
      
        return (
      <>
      
      
      
      <Grid container spacing={2} mb={2} >
      {/* toggle */}
      <Grid container alignItems="center" p="0rem 3rem" mt={2}>
            {open.corepurpose ? (
              <IconChevronDown onClick={() => handleOpen('corepurpose')} />
            ) : (
              <IconChevronRight onClick={() => handleOpen('corepurpose')} />
            )}
            &nbsp;&nbsp;&nbsp;
            <Typography sx={testStyle} onClick={() => handleOpen('corepurpose')}>
              Corepurpose
            </Typography>
          </Grid>
      
      
        <Grid item xs={4}>
          
          <Grid item xs={12}>
            {open.corepurpose &&
              companyData?.company?.marketposition?.corepurpose.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>
      
        {/* Company 2 corepurpose */}
        <Grid item xs={4}>
          
          <Grid item xs={12}>
            {open.corepurpose &&
              companyData?.competitors[0]?.marketposition?.corepurpose.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>
      
        {/* Company 3 corepurpose */}
        <Grid item xs={4}>
          
          <Grid item xs={12}>
            {open.corepurpose &&
              companyData?.competitors[1]?.marketposition?.corepurpose.map((value, index) => (<>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>
              ))}
          </Grid>
        </Grid>
      
      
        {/* Weaknesss */}
      
        <Grid container alignItems="center" p="0rem 3rem">
            {open.positioning ? (
              <IconChevronDown onClick={() => handleOpen('positioning')} />
            ) : (
              <IconChevronRight onClick={() => handleOpen('positioning')} />
            )}
            &nbsp;&nbsp;&nbsp;
            <Typography sx={testStyle} onClick={() => handleOpen('positioning')}>
              Positioning
            </Typography>
          </Grid>
      
      
        <Grid item xs={4}>
          
          <Grid item xs={12}>
            {open.positioning &&
              companyData?.company?.marketposition?.positioning.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>
      
        {/* Company 2 corepurpose */}
        <Grid item xs={4}>
          
          <Grid item xs={12}>
            {open.positioning &&
              companyData?.competitors[0]?.marketposition?.positioning.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>
      
        {/* Company 3 corepurpose */}
        <Grid item xs={4}>
          
          <Grid item xs={12}>
            {open.positioning &&
              companyData?.competitors[1]?.marketposition?.positioning.map((value, index) => (<>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>
              ))}
          </Grid>
        </Grid>
      
      {/* Opportunity  */}
      
      <Grid container alignItems="center" p="0rem 3rem">
            {open.keydifferentiators ? (
              <IconChevronDown onClick={() => handleOpen('keydifferentiators')} />
            ) : (
              <IconChevronRight onClick={() => handleOpen('keydifferentiators')} />
            )}
            &nbsp;&nbsp;&nbsp;
            <Typography sx={testStyle} onClick={() => handleOpen('keydifferentiators')}>
            Key Differentiators
            </Typography>
          </Grid>
      
      
        <Grid item xs={4}>
          
          <Grid item xs={12}>
            {open.keydifferentiators &&
              companyData?.company?.marketposition?.keydifferentiators.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>
      
        {/* Company 2 corepurpose */}
        <Grid item xs={4}>
          
          <Grid item xs={12}>
            {open.keydifferentiators &&
              companyData?.competitors[0]?.marketposition?.keydifferentiators.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>
      
        {/* Company 3 corepurpose */}
        <Grid item xs={4}>
          
          <Grid item xs={12}>
            {open.keydifferentiators &&
              companyData?.competitors[1]?.marketposition?.keydifferentiators.map((value, index) => (<>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>
              ))}
          </Grid>
        </Grid>
      
      
      {/* brandpersonality */}
      
      <Grid container alignItems="center" p="0rem 3rem">
            {open.brandpersonality ? (
              <IconChevronDown onClick={() => handleOpen('brandpersonality')} />
            ) : (
              <IconChevronRight onClick={() => handleOpen('brandpersonality')} />
            )}
            &nbsp;&nbsp;&nbsp;
            <Typography sx={testStyle} onClick={() => handleOpen('brandpersonality')}>
            Brand Personality
            </Typography>
          </Grid>
      
      
        <Grid item xs={4}>
          
          <Grid item xs={12}>
            {open.brandpersonality &&
              companyData?.company?.marketposition?.brandpersonality.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>
      
        {/* Company 2 corepurpose */}
        <Grid item xs={4}>
          
          <Grid item xs={12}>
            {open.brandpersonality &&
              companyData?.competitors[0]?.marketposition?.brandpersonality.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>
      
        {/* Company 3 corepurpose */}
        <Grid item xs={4}>
          
          <Grid item xs={12}>
            {open.brandpersonality &&
              companyData?.competitors[1]?.marketposition?.brandpersonality.map((value, index) => (<>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>
              ))}
          </Grid>
        </Grid>
      
      
      
      
      
      
      
      
      
      </Grid>
      
      

      </>
)
}

export default Positioning;