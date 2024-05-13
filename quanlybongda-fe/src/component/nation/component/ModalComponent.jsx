import { Button, Form, Input, Modal, Space, Upload, message } from "antd";
import React, { useRef, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

const ModalComponent = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(true);
  const formRefAdd = useRef(null); // Thêm useRef để truy cập form
  // Confirm

  //  MODAL
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    formRefAdd.current.resetFields(); // Đặt lại form sau khi submit
    formRefAdd.current.setFieldsValue({}); // Đặt lại các trường trong form
  };

  // FORM
  const onFinish = (values) => {
    setIsModalOpen(false);
    formRefAdd.current.resetFields(); // Đặt lại form sau khi submit
    formRefAdd.current.setFieldsValue({}); // Đặt lại các trường trong form
    console.log("Success:", values);
    setUploading(true);
    props.onAddNation(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // POP CONFIRM
  // UPLOAD
  const prop = {
    name: "file",
    action: "https://run.mocky.io/v3/447d74e7-361c-441e-9830-7b5a6df4e444",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} tải ảnh lên thành công`);
        setUploading(false);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} có lỗi khi cố gắng tải ảnh lên.`);
      }
    },
  };

  //
  return (
    <>
      <Button type="primary" onClick={showModal} style={{ margin: 10 }}>
        {props.text}
      </Button>
      <Modal
        title={props.title}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          ref={formRefAdd}
          name="addForm"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tên Quốc Gia"
            name="nationName"
            rules={[
              {
                required: true,
                message: "Không Được Để Trống Tên Quốc Gia!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mã Quốc Gia"
            name="nationCode"
            rules={[
              {
                required: true,
                message: "Không Được Để Trống Mã Quốc Gia!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hình Ảnh Cờ Quốc Gia"
            name="imageFile"
            rules={[
              {
                required: true,
                message: "Hãy Chọn Hình Ảnh Cờ Quốc Gia!",
              },
            ]}
          >
            <Upload {...prop} fileList={prop.value} disabled={!uploading}>
              <Button icon={<UploadOutlined />}>Bấm Để Tải Ảnh Lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="reset">reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalComponent;
