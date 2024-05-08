import { Button, Image, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listTeams } from "../../../api/TeamAPI";
import { EditFilled } from "@ant-design/icons";

export const TableTeamComponent = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Logo",
      dataIndex: "image",
      key: "image",
      render: (_, record) => <Image width={100} src={record.image}></Image>,
    },
    {
      title: "Tên Đội Bóng",
      dataIndex: "teamName",
      key: "teamName",
      render: (_, record) => <p>{record.teamName}</p>,
    },
    {
      title: "Chủ Tịch",
      dataIndex: "president",
      key: "president",
      render: (_, record) => <p>{record.president}</p>,
    },
    {
      title: "Huấn Luyện Viên Trưởng",
      dataIndex: "coach",
      key: "coach",
      render: (_, record) => <p>{record.coach}</p>,
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

  const fetchDataTeams = async () => {
    try {
      const result = await listTeams();
      const row = result.map((item, index) => ({
        key: index,
        no: index + 1,
        id: item.id,
        teamName: item.teamName,
        president: item.president,
        coach: item.coach?.name,
        image: item.image?.pictureURL,
      }));
      setData(row);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // UseEffect
  useEffect(() => {
    fetchDataTeams();
  }, []);

  return <Table columns={columns} dataSource={data} />;
};
