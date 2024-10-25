import React, { useState , useEffect} from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import api from "@utils/api";
import EditUser from "../Users/EditUser/EditUser";
import {useQueryClient} from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ThreeDotMenu = ({ id }) => {
  // State to manage menu anchor position
  const [anchorEl, setAnchorEl] = useState(null);
  const queryClient= useQueryClient();

  const { companyId } =  useParams();
  // Function to handle click on three dots
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {


    

    try {
      const apiUrl = `customer/${id}/deleteUser`;
     
      const response = await api.get(apiUrl);

      if (response.status === 200) {
        handleClose();
        queryClient.invalidateQueries({queryKey:["companyId",companyId]})
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error occurred while deleting user:", error);
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


 

  return (
    <>
      {/* Three dots button */}
      <IconButton
        aria-label="more"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>

      {/* Menu component */}
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* Menu items */}
        <MenuItem onClick={handleOpenModal}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Reset Password</MenuItem>
        <MenuItem onClick={handleClose}>Copy Password</MenuItem>
      </Menu>

      <EditUser open={isModalOpen} onClose={handleCloseModal}   id={id} />
    </>
  );
};

export default ThreeDotMenu;
