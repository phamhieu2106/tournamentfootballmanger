import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Upload,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { getNation } from "../../../api/NationAPI";

const ModalUpdateComponent = (props) => {
  const [nation, setNation] = useState(null);
  const formRefUpdate = useRef(null); // Thêm useRef để truy cập form
  // FORM
  const onFinish = (values) => {
    props.setIsModalUpdateOpen(false);
    props.onUpdateNational(props.id, values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} có lỗi khi cố gắng tải ảnh lên.`);
      }
    },
  };

  // FetchData
  const fetchData = async (id) => {
    try {
      const result = await getNation(id);
      setNation(result);
    } catch (error) {
      console.log(error.message);
    }
  };
  // Effect
  useEffect(() => {
    if (props.id) {
      fetchData(props.id);
    }
  }, [props.id]);

  useEffect(() => {
    formRefUpdate?.current?.resetFields();
  }, [nation]);

  return (
    <>
      <Modal
        title={props.title}
        open={props.isModalUpdateOpen}
        onCancel={props.handleCancelUpdate}
        footer={null}
      >
        <Form
          ref={formRefUpdate}
          name="updateForm"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={nation}
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
          <Form.Item label="Hình Ảnh Cờ Quốc Gia">
            <Image width={100} src={nation?.image?.pictureURL} />
          </Form.Item>
          <Form.Item label="Hình Ảnh Cờ Quốc Gia" name="imageFile">
            <Upload {...prop} fileList={prop.value}>
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

export default ModalUpdateComponent;
