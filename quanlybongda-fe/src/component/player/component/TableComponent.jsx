import { EditFilled } from "@ant-design/icons";
import { Button, Image, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { listPlayers } from "../../../api/PlayerAPI";

const TableComponent = () => {
  const [data, setData] = useState([]);
  // const [id, setId] = useState(null);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      key: "image",
      render: (_, record) => <Image width={100} src={record.imageURL} />,
    },
    {
      title: "Tên Cầu Thủ",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => <p>{record.fullName}</p>,
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
      render: (_, record) => <p>{record.sex === "MALE" ? "Nam" : "Nữ"}</p>,
    },
    {
      title: "Vị Trí",
      dataIndex: "position",
      key: "position",
      render: (_, record) => <p>{record.position}</p>,
    },
    {
      title: "Quốc Gia",
      dataIndex: "national",
      key: "national",
      render: (_, record) => (
        <Image width={100} src={record.national.imageURL} />
      ),
    },
    {
      title: "Đội Bóng",
      dataIndex: "team",
      key: "team",
      render: (_, record) => <Image width={100} src={record.team.imageURL} />,
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="cập nhật">
            <Button type="primary" shape="circle" icon={<EditFilled />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const records = await listPlayers();
      const row = records.map((item, index) => ({
        key: index,
        no: index + 1,
        image: item.image?.imageURL,
        fullName: item.fullName,
        sex: item.sex,
        position: item.position,
        national: item.national?.image?.imateURL,
        team: item.team?.image?.imageURL,
      }));
      setData(row);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default TableComponent;
