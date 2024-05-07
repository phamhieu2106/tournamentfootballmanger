import { Button, Divider, Form, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateStadium, getStadium } from "../../../api/StadiumAPI";
import { listTeams } from "../../../api/TeamAPI";
export const FormUpdateStadiumComponent = () => {
  let { id } = useParams(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [teams, setTeams] = useState([]);
  const [stadium, setStadium] = useState(null);

  //   FetchDATA
  const fetchDataTeams = async () => {
    try {
      const result = await listTeams(id);
      setTeams(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataStadium = async () => {
    try {
      const result = await getStadium(id);
      setStadium(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    handleUpdateStadium(id, values);
    form.resetFields(); // Đặt lại các trường trong form
  };

  const handleUpdateStadium = async (id, values) => {
    // Function to handle adding a new nation
    try {
      const result = await updateStadium(id, values); // Add the new nation
      if (result) {
        navigate("/stadiums");
        message.success("Cập nhật sân vận động thành công!");
      }
    } catch (error) {
      console.error("Error updating stadium:", error);
    }
  };

  // UseEffect
  useEffect(() => {
    if (id) {
      fetchDataStadium();
      fetchDataTeams();
    }
  }, [id]);

  useEffect(() => {
    if (stadium) {
      form.setFieldsValue({
        nameStadium: stadium.name,
        capacity: stadium.capacity,
        location: stadium.location,
        idTeam: stadium.team.idTeam,
      });
    }
  }, [stadium]);

  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Cập Nhật Sân Vận Động
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
              type: "integer",
              message: "Không được để trống sức chứa sân vận động!",
            },
          ]}
        >
          <Input placeholder="sức chứa" />
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
        <Form.Item label="Quốc Gia:" name="idNation">
          <Select
            options={teams?.map((team) => ({
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
