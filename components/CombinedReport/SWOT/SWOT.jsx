import { Divider, Grid, Typography } from '@mui/material'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import Component from '../Component'
import { useState } from 'react'
const SWOT = ({companyData}) => {
const [open,setHandleOpen]=useState({
      strengths:false,
      weaknesses:false,
      opportunities:false,
      threats:false
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

      <Grid container spacing={2} sx={{
        mb: 2
      }}>
      {/* toggle */}
      <Grid
        container
        sx={{
          alignItems: "center",
          p: "0rem 3rem",
          mt: 2
        }}>
            {open.strengths ? (
              <IconChevronDown onClick={() => handleOpen('strengths')} />
            ) : (
              <IconChevronRight onClick={() => handleOpen('strengths')} />
            )}
            &nbsp;&nbsp;&nbsp;
            <Typography sx={testStyle} onClick={() => handleOpen('strengths')}>
              Strengths
            </Typography>
          </Grid>


        <Grid size={4}>
          
          <Grid size={12}>
            {open.strengths &&
              companyData?.company?.swotanalysis?.strengths.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>

        {/* Company 2 Strengths */}
        <Grid size={4}>
          
          <Grid size={12}>
            {open.strengths &&
              companyData?.competitors[0]?.swotanalysis?.strengths.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>

        {/* Company 3 Strengths */}
        <Grid size={4}>
          
          <Grid size={12}>
            {open.strengths &&
              companyData?.competitors[1]?.swotanalysis?.strengths.map((value, index) => (<>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>
              ))}
          </Grid>
        </Grid>


        {/* Weaknesss */}

        <Grid
          container
          sx={{
            alignItems: "center",
            p: "0rem 3rem"
          }}>
            {open.weaknesses ? (
              <IconChevronDown onClick={() => handleOpen('weaknesses')} />
            ) : (
              <IconChevronRight onClick={() => handleOpen('weaknesses')} />
            )}
            &nbsp;&nbsp;&nbsp;
            <Typography sx={testStyle} onClick={() => handleOpen('weaknesses')}>
              Weaknesses
            </Typography>
          </Grid>


        <Grid size={4}>
          
          <Grid size={12}>
            {open.weaknesses &&
              companyData?.company?.swotanalysis?.weaknesses.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>

        {/* Company 2 Strengths */}
        <Grid size={4}>
          
          <Grid size={12}>
            {open.weaknesses &&
              companyData?.competitors[0]?.swotanalysis?.weaknesses.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>

        {/* Company 3 Strengths */}
        <Grid size={4}>
          
          <Grid size={12}>
            {open.weaknesses &&
              companyData?.competitors[1]?.swotanalysis?.weaknesses.map((value, index) => (<>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>
              ))}
          </Grid>
        </Grid>

      {/* Opportunity  */}

      <Grid
        container
        sx={{
          alignItems: "center",
          p: "0rem 3rem"
        }}>
            {open.opportunities ? (
              <IconChevronDown onClick={() => handleOpen('opportunities')} />
            ) : (
              <IconChevronRight onClick={() => handleOpen('opportunities')} />
            )}
            &nbsp;&nbsp;&nbsp;
            <Typography sx={testStyle} onClick={() => handleOpen('opportunities')}>
            Opportunities
            </Typography>
          </Grid>


        <Grid size={4}>
          
          <Grid size={12}>
            {open.opportunities &&
              companyData?.company?.swotanalysis?.opportunities.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>

        {/* Company 2 Strengths */}
        <Grid size={4}>
          
          <Grid size={12}>
            {open.opportunities &&
              companyData?.competitors[0]?.swotanalysis?.opportunities.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>

        {/* Company 3 Strengths */}
        <Grid size={4}>
          
          <Grid size={12}>
            {open.opportunities &&
              companyData?.competitors[1]?.swotanalysis?.opportunities.map((value, index) => (<>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>
              ))}
          </Grid>
        </Grid>


      {/* Threats */}

      <Grid
        container
        sx={{
          alignItems: "center",
          p: "0rem 3rem"
        }}>
            {open.threats ? (
              <IconChevronDown onClick={() => handleOpen('threats')} />
            ) : (
              <IconChevronRight onClick={() => handleOpen('threats')} />
            )}
            &nbsp;&nbsp;&nbsp;
            <Typography sx={testStyle} onClick={() => handleOpen('threats')}>
            Threats
            </Typography>
          </Grid>


        <Grid size={4}>
          
          <Grid size={12}>
            {open.threats &&
              companyData?.company?.swotanalysis?.threats.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>

        {/* Company 2 Strengths */}
        <Grid size={4}>
          
          <Grid size={12}>
            {open.threats &&
              companyData?.competitors[0]?.swotanalysis?.threats.map((value, index) => (
      <>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>        ))}
          </Grid>
        </Grid>

        {/* Company 3 Strengths */}
        <Grid size={4}>
          
          <Grid size={12}>
            {open.threats &&
              companyData?.competitors[1]?.swotanalysis?.threats.map((value, index) => (<>
                <Component key={index} title={value?.name} description={value?.description} /> <br/>
              </>
              ))}
          </Grid>
        </Grid>









      </Grid>

      {/* <Grid container sx={12} columnSpacing={2} mb={2} >
            <Grid
                  container
                  xs={12}
                  alignItems={"center"}
                  p={"1rem 0rem"}    
                        >
                  {open.strengths ? (
                    <IconChevronDown onClick={() => handleOpen('strengths')} />
                  ) : (
                    <IconChevronRight onClick={() => handleOpen('strengths')} />
                  )}
                  &nbsp;&nbsp;&nbsp;
                  <Typography sx={testStyle} onClick={() => handleOpen('strengths')}>
                  Strengths
                  </Typography> */}
      {/* </Grid>
<Grid item xs={4}  >
   
   
     <Grid item xs={12} >

   
     <Grid>{open.strengths &&     <> {companyData?.company?.swotanalysis?.strengths.map((value)=>{
           return(
                 <>
     <Component title={value?.name} description={value?.description}/><br/>
                 </>
           )
     })}</>
   }
</Grid>

</Grid>

{/* Comp1 */}
      {/* <Grid item xs={12} >

          
            <Grid>{open.strengths &&     <> {companyData?.company?.swotanalysis?.strengths.map((value)=>{
                  return(
                        <>
            <Component title={value?.name} description={value?.description}/><br/>
                        </>
                  )
            })}</>
          }
      </Grid>

      </Grid> */}

      {/* <Grid item xs={12} >

          <Grid
                  container
                  xs={12}
                  alignItems={"center"}
                  p={"1rem 0rem"}    
                        >
                  {open.weaknesses ? (
                    <IconChevronDown onClick={() => handleOpen('weaknesses')} />
                  ) : (
                    <IconChevronRight onClick={() => handleOpen('weaknesses')} />
                  )}
                  &nbsp;&nbsp;&nbsp;
                  <Typography sx={testStyle} onClick={() => handleOpen('weaknesses')}>
                  Weaknesses
                  </Typography>
                </Grid>
                <Grid>{open.weaknesses &&     <> {companyData?.company?.swotanalysis?.weaknesses.map((value)=>{
                  return(
                        <>
      <Component title={value?.name} description={value?.description}/><br/>
                        </>
                  )
            })}</>
      }
      </Grid> */}
      {/* </Grid>


      <Grid item xs={12} >

          <Grid
                  container
                  xs={12}
                  alignItems={"center"}
                  p={"1rem 0rem"}    
                        >
                  {open.opportunities ? (
                    <IconChevronDown onClick={() => handleOpen('opportunities')} />
                  ) : (
                    <IconChevronRight onClick={() => handleOpen('opportunities')} />
                  )}
                  &nbsp;&nbsp;&nbsp;
                  <Typography sx={testStyle} onClick={() => handleOpen('opportunities')}>
                  Opportunities
                  </Typography>
                </Grid>
                <Grid>{open.opportunities &&     <> {companyData?.company?.swotanalysis?.opportunities?.map((value)=>{
                  return(
                        <>
      <Component title={value?.name} description={value?.description}/><br/>
                        </>
                  )
            })}</>
      }
      </Grid>
      </Grid>



      <Grid item xs={12} > */}

      {/* <Grid
              container
              xs={12}
              alignItems={"center"}
              p={"1rem 0rem"}    
                    >
              {open.threats ? (
                <IconChevronDown onClick={() => handleOpen('threats')} />
              ) : (
                <IconChevronRight onClick={() => handleOpen('threats')} />
              )}
              &nbsp;&nbsp;&nbsp;
              <Typography sx={testStyle} onClick={() => handleOpen('threats')}>
              Threats
              </Typography>
              </Grid>
              <Grid>{open.threats &&     <> {companyData?.company?.swotanalysis?.threats?.map((value)=>{
              return(
                    <>
  <Component title={value?.name} description={value?.description}/><br/>
                    </>
              )
        })}</>
  }
  </Grid>
  </Grid>



      </Grid> */}
      {/* COMPETITOR 0 */}
      {/* <Grid item xs={4}  >
            <Component title={companyData?.competitors[0]?.swotanalysis?.strengths[0]?.name} description={companyData?.competitors[0]?.swotanalysis?.strengths[0]?.description}/>
            <br/>
            <Component title={companyData?.competitors[0]?.swotanalysis?.weaknesses[0]?.name} description={companyData?.competitors[0]?.swotanalysis?.weaknesses[0]?.description}/>
           <br/>
      <Component title={companyData?.competitors[0]?.swotanalysis?.opportunities[0]?.name} description={companyData?.competitors[0]?.swotanalysis?.opportunities[0]?.description}/>
            <br/>
            <Component title={companyData?.competitors[0]?.swotanalysis?.threats[0]?.name} description={companyData?.competitors[0]?.swotanalysis?.threats[0]?.description}/>
            <br/>
          </Grid> */}
      {/* COMPETITOR 1 */}
      {/* <Grid item xs={4}  >
            <Component title={companyData?.competitors[1]?.swotanalysis?.strengths[0]?.name} description={companyData?.competitors[1]?.swotanalysis?.strengths[0]?.description}/>
            <br/>
            <Component title={companyData?.competitors[1]?.swotanalysis?.weaknesses[0]?.name} description={companyData?.competitors[1]?.swotanalysis?.weaknesses[0]?.description}/>
            <br/>
      <Component title={companyData?.competitors[1]?.swotanalysis?.opportunities[0]?.name} description={companyData?.competitors[1]?.swotanalysis?.opportunities[0]?.description}/>
            <br/>
            <Component title={companyData?.competitors[1]?.swotanalysis?.threats[0]?.name} description={companyData?.competitors[1]?.swotanalysis?.threats[0]?.description}/>
            <br/>
          </Grid> */}

      {/* </Grid> */}
    </>
  );
}

export default SWOT;