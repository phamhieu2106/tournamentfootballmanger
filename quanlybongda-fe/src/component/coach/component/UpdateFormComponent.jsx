import {
  Button,
  Divider,
  Form,
  Input,
  Radio,
  Select,
  Space,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { listNations } from "../../../api/NationAPI";
import { getCoach, updateCoach } from "../../../api/CoachAPI";
import { useNavigate, useParams } from "react-router-dom";
export const UpdateFormComponent = () => {
  let { id } = useParams(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [coach, setCoach] = useState(null);
  const [nations, setNations] = useState([]);

  //   FetchDATA
  const fetchDataNations = async () => {
    try {
      const result = await listNations();
      setNations(result);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const fetchDataCoach = async () => {
    try {
      const result = await getCoach(id);
      setCoach(result);
    } catch (error) {
      console.log(error.error.message);
    } finally {
    }
  };

  const onFinish = async (values) => {
    handleUpdateCoach(id, values);
    form.resetFields(); // Đặt lại các trường trong form
  };
  const onReset = () => {
    form.setFieldsValue({
      fullName: coach.name,
      sex: coach.sex,
      status: coach.status,
      dob: coach.dob,
      idNation: coach.national.id,
    });
  };
  const handleUpdateCoach = async (id, values) => {
    try {
      const result = await updateCoach(id, values); // Add the new nation
      if (result) {
        navigate("/coaches");
        message.success("Cập nhật huấn luyện viên thành công!");
      }
    } catch (error) {
      console.error("Error adding nation:", error);
    }
  };

  // UseEffect
  useEffect(() => {
    if (id) {
      fetchDataNations();
      fetchDataCoach();
    }
  }, [id]);

  useEffect(() => {
    if (coach) {
      form.setFieldsValue({
        fullName: coach.name,
        sex: coach.sex,
        status: coach.status,
        dob: coach.dob,
        idNation: coach.national.id,
      });
    }
  }, [coach]);

  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Cập Nhật Huấn Luyện Viên
      </Divider>
      <Form layout="vertical" form={form} onFinish={onFinish}>
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
          <Radio.Group>
            <Radio value="MALE">Nam</Radio>
            <Radio value="FEMALE"> Nữ </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Trạng Thái:"
          name="status"
          rules={[
            {
              required: true,
              message: "Không được để trống trạng th!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="COACHING">Còn huấn luyện</Radio>
            <Radio value="RETIREMENT">Nghỉ hưu</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Ngày Sinh" name="dob">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Quốc Gia:"
          name="idNation"
          rules={[
            {
              required: true,
              message: "Không được để trống quốc gia!",
            },
          ]}
        >
          <Select
            options={nations?.map((nation) => ({
              label: nation.nationName,
              value: nation.id,
            }))}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={onReset}>reset</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
