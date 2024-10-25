import { Space, Table, Tag } from "antd";


const columns = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
    
  },
  {
    title: "EMAIL",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "ROLE",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "CREATED ON",
    dataIndex: "createdOn",
    key: "createdOn",
  },
  {
    title: "MODIFIED ON",
    dataIndex: "updatedOn",
    key: "updatedOn",
  },
  {
    title: "SETTINGS",
    dataIndex: "settings",
    key: "settings",
  },
];
const UsersTable = ({ data }) => {
  return (

      <Table columns={columns} dataSource={data} />
      
  )}

export default UsersTable;
