import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  Divider,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import api from "@utils/api";


const RoleManagementTable = ({companyId, isEditable}) => {
  const [roles, setRoles] = useState([]);
  const [rolePermissions, setRolePermissions] = useState({});
  const togglePermission = (roleId,categoryId,typeId) => {
    // Toggle permission logic here
    // Update tempRolePermissions to reflect the change
  };


  const permissionsCategories = [
    {
      id: "userManagement",
      label: "User Management",
      types: [
        { id: "view", label: "View Users" },
        { id: "create", label: "Create New Users" },
        { id: "edit", label: "Edit User Details" },
        { id: "approve", label: "Delete Users" },
        { id: "delete", label: "Approve New Users" },
      ],
    },
    {
      id: "roleManagement",
      label: "Role Management",
      types: [
        { id: "view", label: "View Roles" },
        { id: "create", label: "Create New Roles" },
        { id: "edit", label: "Edit Role Permissions" },
        { id: "approve", label: "Delete Roles" },
        { id: "delete", label: "Approve New Roles" },
      ],
    },
    {
      id: "analysisReport",
      label: "Analysis Report",
      types: [
        { id: "view", label: "View Analysis Reports" },
        { id: "create", label: "Add to Sections of Report" },
        { id: "edit", label: "Edit Reports" },
        { id: "approve", label: "Delete Sections of Report" },
        { id: "delete", label: "Approve Changes" },
      ],
    },
    {
      id: "userPersonas",
      label: "User Personas",
      types: [
        { id: "view", label: "View User Personas" },
        { id: "create", label: "Add to Personas" },
        { id: "edit", label: "Edit Personas" },
        { id: "approve", label: "Delete Personas" },
        { id: "delete", label: "Approve Personas" },
      ],
    },
    {
      id: "contentCalendar",
      label: "Content Calendar",
      types: [
        { id: "view", label: "View Content Calendar" },
        { id: "create", label: "Add to Calendar" },
        { id: "edit", label: "Edit Content Calendar" },
        { id: "approve", label: "Delete Content Calendar" },
        { id: "delete", label: "Approve Content Calendar" },
      ],
    },
  ];

  const fetchData = async () => {
    const apiUrl = `roles/getAllrole/${companyId}`;

    const response = await api.get(apiUrl);

    
     // Fetch roles and permissions from the API
    if (response.status === 200) {
      const fetchedRoles = response.data.map((role) => ({
        id: role._id,
        name: role.roleName.toUpperCase(), // Convert role name to uppercase
      }));
      const fetchedRolePermissions = response.data.reduce((acc, role) => {
        // Use the role name (uppercased) as key and permissions as value
        acc[role.roleName.toUpperCase()] = role;
        return acc;
      }, {});
      setRoles(fetchedRoles);
      setRolePermissions(fetchedRolePermissions);
    } else {
      console.error("Failed to create user");
    }

   

   
   
  };


    useEffect(() => {
      console.log(companyId);
      if (companyId) {
        fetchData();
      }
    }, [companyId]);


  // Check if the role has the permission
  const hasPermission = (roleName, permissionCategory, permissionType) => {
    // The rolePermissions object has roleName as keys and permissions as values
    const permissions = rolePermissions[roleName];
    return permissions?.[permissionCategory]?.[permissionType];
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: "700px", overflow: "auto" }}
    >
      <Divider />
      <Table
        stickyHeader
        aria-label="role management table"
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
            borderRight: "1px solid rgba(224, 224, 224, 1)", // Add vertical divider
            "&:last-child": {
              borderRight: "none", // Remove vertical divider for the last cell
            },
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {roles.map((role) => (
              <TableCell key={role.id} align="center">
                {role.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {permissionsCategories.map((category, categoryIndex) => (
            <React.Fragment key={category.id}>
              <TableRow sx={{ backgroundColor: "#E6E6E6" }}>
                <TableCell scope="row" colSpan={roles.length + 1}>
                  <Typography component="h6" variant="h6">
                    {category.label}
                  </Typography>
                </TableCell>
              </TableRow>

              {category.types.map((type) => (
                <TableRow key={type.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: "14px", fontWeight: "700" }}
                  >
                    {type.label}
                  </TableCell>
                  {roles.map((role) => (
                    <TableCell key={`${role.id}-${type.id}`} align="center">
                      <Checkbox
                        checked={hasPermission(role.name, category.id, type.id)}
                        onChange={() => togglePermission(role.id, category.id, type.id )}
                        disabled={!isEditable}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoleManagementTable;
