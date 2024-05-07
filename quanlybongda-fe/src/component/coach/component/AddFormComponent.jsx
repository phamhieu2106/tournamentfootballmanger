import {
  Button,
  DatePicker,
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
import { addCoach } from "../../../api/CoachAPI";
import { Link, useNavigate } from "react-router-dom";

export const AddFormComponent = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
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

  //   Function
  let sortedNations = [...nations];
  const sortNationsByName = () => {
    if (Array.isArray(nations)) {
      sortedNations = [...nations];
      sortedNations.sort((a, b) => a.nationName.localeCompare(b.nationName));
    }
  };

  const onFinish = async (values) => {
    handleAddCoach(values);
    form.resetFields(); // Đặt lại các trường trong form
  };

  const handleAddCoach = async (values) => {
    // Function to handle adding a new nation
    try {
      const result = await addCoach(values); // Add the new nation
      if (result) {
        navigate("/coaches");
        message.success("Thêm huấn luyện viên thành công!");
      }
    } catch (error) {
      console.error("Error adding nation:", error);
    }
  };
  // UseEffect
  useEffect(() => {
    fetchDataNations();
  }, []);

  useEffect(() => {
    sortNationsByName();
  }, [nations]);

  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Thêm Mới Huấn Luyện Viên
      </Divider>
      <Link to={"/coaches"}>
        <Button type="primary" style={{ marginBottom: 20 }}>
          Quay lại
        </Button>
      </Link>
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
          initialValue={"MALE"}
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
          initialValue={"COACHING"}
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
        <Form.Item
          label="Ngày Sinh"
          name="dob"
          rules={[
            {
              required: true,
              message: "Không được để trống ngày sinh!",
            },
          ]}
        >
          <DatePicker format={"YYYY/MM/DD"} />
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
            options={nations.map((nation) => ({
              label: nation.nationName,
              value: nation.id,
            }))}
          />
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
