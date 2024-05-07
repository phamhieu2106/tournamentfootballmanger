import { EditFilled } from "@ant-design/icons";
import { Button, Image, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { listCoaches } from "../../../api/CoachAPI";
import { Link } from "react-router-dom";

export const TableComponent = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Tên ",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <p>{record.name}</p>,
    },
    {
      title: "Ngày Sinh",
      dataIndex: "dob",
      key: "dob",
      render: (_, record) => <p>{record.dob}</p>,
    },
    {
      title: "Quốc Gia",
      dataIndex: "nation",
      key: "nation",
      render: (_, record) => (
        <Image width={100} src={record.nationImageURL}></Image>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <strong>
          {record.status === "RETIREMENT" ? "RETIREMENT" : "COACHING"}
        </strong>
      ),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="cập nhật">
            <Link to={`${record.id}`}>
              <Button type="primary" shape="circle" icon={<EditFilled />} />
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Fetch
  const fetchDataCoach = async () => {
    try {
      const result = await listCoaches();
      const row = result.map((item, index) => ({
        key: index,
        no: index + 1,
        id: item.id,
        name: item.name,
        dob: item.dob,
        nationImageURL: item.national?.image?.pictureURL,
        status: item.status,
      }));
      setData(row);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // UseEffect
  useEffect(() => {
    fetchDataCoach();
  }, []);

  return <Table columns={columns} dataSource={data} />;
};
