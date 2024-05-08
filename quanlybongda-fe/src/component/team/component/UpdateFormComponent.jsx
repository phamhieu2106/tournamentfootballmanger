import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listCoaches } from "../../../api/CoachAPI";
import { UploadOutlined } from "@ant-design/icons";
import { getTeam, updateTeam } from "../../../api/TeamAPI";
export const UpdateTeamFormComponent = () => {
  let { id } = useParams(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(true);
  const [team, setTeam] = useState(null);
  const [coaches, setCoaches] = useState([]);

  const onFinish = async (values) => {
    console.log(values);
    handleUpdateTeam(id, values);
    form.resetFields(); // Đặt lại các trường trong form
  };
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

  const handleUpdateTeam = async (id, values) => {
    // Function to handle adding a new nation
    try {
      const result = await updateTeam(id, values); // Add the new nation
      if (result) {
        navigate("/teams");
        message.success("Cập nhật đội bóng thành công!");
      }
    } catch (error) {
      console.error("Error updating team:", error);
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
  // FetchDATA
  const fetchDataTeam = async (id) => {
    try {
      const result = await getTeam(id);
      setTeam(result);
    } catch (error) {
      console.log(error);
    }
  };

  // Effect
  useEffect(() => {
    if (id) {
      fetchDataCoaches();
      fetchDataTeam(id);
    }
  }, [id]);

  useEffect(() => {
    if (team) {
      form.setFieldsValue({
        teamName: team.teamName,
        president: team.president,
        foundation: team.foundation,
        idCoach: team.coach.id,
      });
    }
  }, [team]);

  return (
    <>
      <>
        <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
          Cập nhật Mới Đội Bóng
        </Divider>
        <Link to={"/teams"}>
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
          <Form.Item label="Năm Thành Lập:" name="foundation">
            <Input disabled />
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
              options={coaches?.map((coach) => ({
                label: coach.name,
                value: coach.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Logo Đội Bóng">
            <Image width={100} src={team?.image?.pictureURL} />
          </Form.Item>
          <Form.Item label="Logo Đội Bóng" name="imageFile">
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
