import { Button, Divider, Form, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addStadium, listStadium } from "../../../api/StadiumAPI";
import { listTeams } from "../../../api/TeamAPI";

export const FormAddStadiumComponent = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [teams, setTeams] = useState([]);

  //   FetchDATA
  const fetchDataTeams = async () => {
    try {
      const result = await listTeams();
      setTeams(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    handleAddStadium(values);
    form.resetFields(); // Đặt lại các trường trong form
  };

  const handleAddStadium = async (values) => {
    // Function to handle adding a new nation
    try {
      const result = await addStadium(values); // Add the new nation
      if (result) {
        navigate("/stadiums");
        message.success("Thêm sân vận động thành công!");
      }
    } catch (error) {
      console.error("Error adding stadium:", error);
    }
  };
  // UseEffect
  useEffect(() => {
    fetchDataTeams();
  }, []);

  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Thêm Mới Sân Vận Động
      </Divider>
      <Link to={"/stadiums"}>
        <Button type="primary" style={{ marginBottom: 20 }}>
          Quay lại
        </Button>
      </Link>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Không được tróng tên sân vận động!",
            },
          ]}
          label="Tên Sân Vận Động:"
          name="nameStadium"
        >
          <Input placeholder="tên sân" />
        </Form.Item>
        <Form.Item
          label="Sức chứa:"
          name="capacity"
          rules={[
            {
              required: true,
              message: "Không được để trống sức chứa sân vận động!",
            },
          ]}
        >
          <Input type="number" placeholder="sức chứa" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Không được trống vị trí!",
            },
          ]}
          label="Vị Trí Sân Vận Động:"
          name="location"
        >
          <Input placeholder="vị trí" />
        </Form.Item>
        <Form.Item label="Đội bóng:" name="idTeam">
          <Select
            options={teams.map((team) => ({
              label: team.teamName,
              value: team.id,
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
