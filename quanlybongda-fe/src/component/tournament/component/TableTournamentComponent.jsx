import { EditFilled } from "@ant-design/icons";
import { Button, Image, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listTournaments } from "../../../api/TournamentAPI";

export const TableTournamentComponent = () => {
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
      title: "Tên Giải Đấu",
      dataIndex: "nameTournament",
      key: "nameTournament",
      render: (_, record) => <p>{record.nameTournament}</p>,
    },
    {
      title: "Thời Gian Bắt Đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (_, record) => <p>{record.startDate}</p>,
    },
    {
      title: "Thời Gian Kết Thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (_, record) => <p>{record.endDate}</p>,
    },
    {
      title: "Tổng Số Vòng",
      dataIndex: "totalRound",
      key: "totalRound",
      render: (_, record) => <p>{record.totalRound}</p>,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => <strong>{record.status}</strong>,
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

  const fetchDataTournaments = async () => {
    try {
      const result = await listTournaments();
      const row = result.map((item, index) => ({
        key: index,
        no: index + 1,
        id: item.id,
        nameTournament: item.nameTournament,
        startDate: item.startDate,
        endDate: item.endDate,
        totalRound: item.totalRound,
        status: item.status,
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
    fetchDataTournaments();
  }, []);

  return <Table columns={columns} dataSource={data} />;
};
