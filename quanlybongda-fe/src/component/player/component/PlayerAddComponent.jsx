import {
  Button,
  Divider,
  Form,
  Input,
  Radio,
  Select,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { listNations } from "../../../api/NationAPI";
import playerPositions from "../../../data/player-position";
import { UploadOutlined } from "@ant-design/icons";

export const PlayerAddComponent = () => {
  const [form] = Form.useForm();
  const [nations, setNations] = useState([]);
  const [uploading, setUploading] = useState(true);
  const positions = playerPositions;

  //   Nations
  const fetchDataNations = async () => {
    try {
      const result = await listNations();
      setNations(result);
    } catch (error) {
      console.log(error.error.message);
    } finally {
    }
  };

  nations?.sort((a, b) => a.nationName.localeCompare(b.nationName));
  const options = nations?.map((nation) => ({
    value: nation.nationCode,
    label: nation.nationName,
  }));
  // Teams

  // UPLOAD
  const prop = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
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

  // UseEffect
  useEffect(() => {
    fetchDataNations();
  }, []);
  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Thêm Mới Cầu Thủ
      </Divider>
      <Form layout="vertical" form={form}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Không được tróng tên cầu thủ!",
            },
          ]}
          label="Họ Tên:"
          name="fullName"
        >
          <Input placeholder="họ tên" />
        </Form.Item>
        <Form.Item
          label="Giới Tính:"
          name="sex"
          rules={[
            {
              required: true,
              message: "Không được để trống giới tính!",
            },
          ]}
        >
          <Radio.Group defaultValue={"MALE"}>
            <Radio value="MALE">Nam</Radio>
            <Radio value="FEMALE"> Nữ </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Không được để vị trí!",
            },
          ]}
          style={{ maxWidth: 200 }}
          label="Vị trí:"
        >
          <Select defaultValue={positions[0]} options={positions} />
        </Form.Item>

        <Form.Item label="Quốc Gia:">
          <Select defaultValue={options?.[0]} options={options} />
        </Form.Item>
        <Form.Item label="Đội bóng:">
          <Input placeholder="vị trí" />
        </Form.Item>
        <Form.Item label="Hình ảnh:">
          <Upload {...prop} fileList={prop.value} disabled={!uploading}>
            <Button icon={<UploadOutlined />}>Bấm Để Tải Ảnh Lên</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
