import { Space, Table, Tag } from "antd";
import Styles from "./UserTable.module.css";

const columns = [
  {
    title: <span className={Styles.columnHeader}>NAME</span>,
    dataIndex: "name",
    key: "name",
    width: 150, // specify a reasonable width for other columns
  },
  {
    title: <span className={Styles.columnHeader}>EMAIL</span>,
    dataIndex: "email",
    key: "email",
    width: 300, // make this column wider
  },
  {
    title: <span className={Styles.columnHeader}>ROLE</span>,
    dataIndex: "role",
    key: "role",
    width: 300, // make this column wider
  },
  {
    title: <span className={Styles.columnHeader}>CREATED ON</span>,
    dataIndex: "createdOn",
    key: "createdOn",
    width: 150, // specify a reasonable width for other columns
  },
  {
    title: <span className={Styles.columnHeader}>MODIFIED ON</span>,
    dataIndex: "updatedOn",
    key: "updatedOn",
    width: 150, // specify a reasonable width for other columns
  },
  {
    title: <span className={Styles.columnHeader}>SETTINGS</span>,
    dataIndex: "settings",
    key: "settings",
    width: 100, // specify a reasonable width for other columns
  },
];

const UsersTable = ({ data }) => {
  return <Table columns={columns} dataSource={data} />;
};

export default UsersTable;
