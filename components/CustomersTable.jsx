import { useRef, useState } from "react";
import { SearchOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';

const CustomersTable = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('descend'); // Set default to 'descend'

  const searchInput = useRef(null);
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{ padding: 8 }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            width: "17rem",
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => close()}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          fontSize: "1rem",
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => {
      if (searchedColumn === dataIndex && searchText && text) {
        const index = text.toString().toLowerCase().indexOf(searchText.toLowerCase());
        if (index !== -1) {
          const beforeStr = text.toString().substr(0, index);
          const afterStr = text.toString().substr(index + searchText.length);
          return (
            <span>
              {beforeStr}
              <span style={{ backgroundColor: '#ffc069' }}>
                {text.toString().substr(index, searchText.length)}
              </span>
              {afterStr}
            </span>
          );
        }
      }
      return text;
    }
  });

  const handleSort = () => {
    const newOrder = sortOrder === 'ascend' ? 'descend' : 'ascend';
    setSortOrder(newOrder);
  };

  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.createdOn);
    const dateB = new Date(b.createdOn);

    if (sortOrder === 'ascend') {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  const columns = [
    {
      title: "NAME",
      dataIndex: "names",
      key: "names",
      ...getColumnSearchProps('name'),
      width: 200,
    },
    {
      title: (
        <div style={{ display: "flex",justifyContent: "space-between", alignItems: "center" }}>
          CREATED ON
          <Button
            type="link"
            icon={sortOrder === 'ascend' ? <ArrowUpOutlined style={{color: '#0000004a'}}/> : <ArrowDownOutlined style={{color: '#0000004a'}}/>}
            onClick={handleSort}
            style={{ marginLeft: 8 }}
          />
        </div>
      ),
      dataIndex: "createdOn",
      key: "createdOn",
      width: 150,
    },
    {
      title: "MODIFIED ON",
      dataIndex: "updatedOn",
      key: "updatedOn",
      width: 150,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: 50,
    },
    {
      title: "",
      dataIndex: "goto",
      key: "goto",
      width: 200,
    },
  ];

  return (
    <div style={{ width: "100%" ,backgroundColor:"#fff"}}>
      <Table
      style={{backgroundColor:"#fff"}}
        columns={columns}
        dataSource={sortedData}
        pagination={true}

      />
    </div>
  );
};

export default CustomersTable;
