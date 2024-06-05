import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listCoaches } from "../../../api/CoachAPI";
import { UploadOutlined } from "@ant-design/icons";
import { addTeam } from "../../../api/TeamAPI";

export const AddFormTeamComponent = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(true);
  const [coaches, setCoaches] = useState([]);

  const onFinish = async (values) => {
    handleAddTeam(values);
    form.resetFields(); // Đặt lại các trường trong form
  };
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

  const handleAddTeam = async (values) => {
    // Function to handle adding a new nation
    try {
      const result = await addTeam(values); // Add the new nation
      if (result) {
        navigate("/admin/teams");
        message.success("Thêm đội bóng thành công!");
      }
    } catch (error) {
      console.error("Error adding team:", error);
    }
  };

  // FetchDATA
  const fetchDataCoaches = async () => {
    try {
      const result = await listCoaches();
      setCoaches(result);
    } catch (error) {
      console.log(error);
    }
  };

  // Effect
  useEffect(() => {
    fetchDataCoaches();
  }, []);

  return (
    <>
      <>
        <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
          Thêm Mới Đội Bóng
        </Divider>
        <Link to={"/admin/teams"}>
          <Button type="primary" style={{ marginBottom: 20 }}>
            Quay lại
          </Button>
        </Link>

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Không được tróng tên đội bóng!",
              },
            ]}
            label="Tên:"
            name="teamName"
          >
            <Input placeholder="tên" />
          </Form.Item>
          <Form.Item
            label="Năm Thành Lập:"
            name="foundation"
            rules={[
              {
                required: true,
                message: "Không được để trống năm thành lập!",
              },
            ]}
          >
            <DatePicker picker="year" />
          </Form.Item>
          <Form.Item
            label="Tên Chủ Tịch:"
            name="president"
            rules={[
              {
                required: true,
                message: "Không được để trống tên chủ tịch!",
              },
            ]}
          >
            <Input placeholder="tên chủ tịch" />
          </Form.Item>
          <Form.Item label="Huấn luyện viên:" name="idCoach">
            <Select
              options={coaches && coaches?.map((coach) => ({
                label: coach?.name,
                value: coach?.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Logo Đội Bóng"
            name="imageFile"
            rules={[
              {
                required: true,
                message: "Hãy Chọn Logo!",
              },
            ]}
          >
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
    </>
  );
};
