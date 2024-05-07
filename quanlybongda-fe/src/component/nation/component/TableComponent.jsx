import React, { useEffect, useState } from "react";
import { Button, Divider, Image, Space, Table, Tooltip, message } from "antd";
import { addNation, listNations, updateNation } from "../../../api/NationAPI";
import ModalComponent from "./ModalComponent";
import { EditFilled } from "@ant-design/icons";
import ModalUpdateComponent from "./ModalUpdateComponent";
const TableComponent = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

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
      title: "Mã Quốc Gia",
      dataIndex: "nationCode",
      key: "nationCode",
      render: (_, record) => <p>{record.nationCode}</p>,
    },
    {
      title: "Tên Quốc Gia",
      dataIndex: "nationName",
      key: "nationName",
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="cập nhật">
            <Button
              type="primary"
              shape="circle"
              icon={<EditFilled />}
              onClick={() => handleClickNation(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const result = await listNations();
      const row = result.map((item, index) => ({
        key: index,
        no: index + 1,
        id: item.id,
        nationName: item.nationName,
        nationCode: item.nationCode,
        imageURL: item.image?.pictureURL,
      }));
      setData(row);
    } catch (e) {
      console.log(e);
    }
  };

  // Function to handle adding a new nation
  const handleAddNation = async (values) => {
    try {
      const result = await addNation(values); // Add the new nation
      fetchData(); // Reload data after adding
      if (result) {
        message.success("Thêm quốc gia thành công!");
      }
    } catch (error) {
      console.error("Error adding nation:", error);
    }
  };

  const handleClickNation = async (id) => {
    try {
      setId(id);
      showUpdateModal();
    } catch (error) {
      console.error("Error handling nation click:", error);
    }
  };

  const handleUpdateNation = async (id, values) => {
    try {
      const result = await updateNation(id, values); // Add the new nation
      fetchData(); // Reload data after adding
      if (result) {
        message.success("Cập nhật quốc gia thành công!");
      }
    } catch (error) {
      console.error("Error update nation:", error);
    }
  };

  //  MODAL UPDATE
  const showUpdateModal = () => {
    setIsModalUpdateOpen(true);
  };
  const handleCancel = () => {
    setIsModalUpdateOpen(false);
    // Đặt lại các trường trong form
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Quản Lý Quốc Gia
      </Divider>
      {/* Add Modal */}
      <ModalComponent
        text={"Thêm mới"}
        title={"Thêm Mới Quốc Gia"}
        onAddNation={handleAddNation}
      />
      {/* Update Modal */}
      <ModalUpdateComponent
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        onUpdateNational={handleUpdateNation}
        handleCancelUpdate={handleCancel}
        id={id}
        text={"Cập nhật"}
        title={"Cập Nhật Quốc Gia"}
      />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default TableComponent;
