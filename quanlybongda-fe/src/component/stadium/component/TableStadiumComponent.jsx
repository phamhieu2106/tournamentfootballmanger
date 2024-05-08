import { EditFilled } from "@ant-design/icons";
import { Button, Image, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listStadium } from "../../../api/StadiumAPI";

export const TableStadiumComponent = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Tên Sân Vận Động",
      dataIndex: "nameStadium",
      key: "nameStadium",
      render: (_, record) => <p>{record.nameStadium}</p>,
    },
    {
      title: "Sức chứa",
      dataIndex: "capacity",
      key: "capacity",
      render: (_, record) => <p>{record.capacity} Người</p>,
    },
    {
      title: "Ví Trí",
      dataIndex: "location",
      key: "location",
      render: (_, record) => <p>{record.location}</p>,
    },
    {
      title: "Đội Bóng",
      dataIndex: "team",
      key: "team",
      render: (_, record) =>
        record.team ? (
          <Image width={100} src={record.team}></Image>
        ) : (
          <p>Không có</p>
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

  const fetchDataStadium = async () => {
    try {
      const result = await listStadium();
      const row = result.map((item, index) => ({
        key: index,
        no: index + 1,
        id: item.id,
        nameStadium: item.nameStadium,
        capacity: item.capacity,
        team: item.team?.image?.pictureURL,
        location: item.location,
      }));
      setData(row);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // UseEffect
  useEffect(() => {
    fetchDataStadium();
  }, []);

  return <Table columns={columns} dataSource={data} />;
};
