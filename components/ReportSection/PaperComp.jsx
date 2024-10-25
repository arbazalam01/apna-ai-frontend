import { styled } from "@mui/system";
import { Paper } from "@mui/material";

const PaperComp = styled(Paper)({
  cursor: "pointer",
  padding: "0.5rem 0.9rem 1rem 0.9rem",
  border: "1px solid #D9D9D9",
  borderRadius: "15px",
  minHeight: "17.6rem ",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "0px 0px 30px 1px #e6e6e6",
  },
});

export default PaperComp;
