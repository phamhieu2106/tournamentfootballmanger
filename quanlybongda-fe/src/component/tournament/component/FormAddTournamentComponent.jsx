import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { listTeams } from "../../../api/TeamAPI";
import { addTournament } from "../../../api/TournamentAPI";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

// eslint-disable-next-line arrow-body-style
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

export const FormAddTournamentComponent = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [form] = Form.useForm();
  // Props
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
  // Function
  const onFinish = async (values) => {
    handleAddTournament(values);
    form.resetFields(); // Đặt lại các trường trong form
  };

  // API
  const fetchDataTeams = async () => {
    try {
      const result = await listTeams();
      setTeams(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTournament = async (values) => {
    // Function to handle adding a new nation
    try {
      const result = await addTournament(values); // Add the new nation
      if (result) {
        navigate("/admin/tournaments");
        message.success("Thêm giải đấu thành công!");
      }
    } catch (error) {
      console.error("Error adding tournament:", error);
    }
  };

  // UseEffect
  useEffect(() => {
    fetchDataTeams();
  }, []);
  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Thên Mới Giải Đấu
      </Divider>

      <Link to={"/admin/tournaments"}>
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
          name="nameTournament"
        >
          <Input placeholder="tên" />
        </Form.Item>
        <Form.Item
          label="Thời Gian:"
          name="timeTournament"
          rules={[
            {
              required: true,
              message: "Không được để trống năm thành lập!",
            },
          ]}
        >
          <RangePicker disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item
          label="Tổng Số Vòng:"
          name="totalRound"
          initialValue={0}
          rules={[
            {
              min: 0,
              required: true,
              message: "Số vòng phải lớn hơn '10'!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Logo Giải Đấu"
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
        <Form.Item
          label="Đội Bóng Tham Dự"
          name="idTeams"
          rules={[
            {
              required: true,
              message: "Hãy chọn đội bóng!",
            },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            options={teams?.map((team) => ({
              label: (
                <span style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={team.image.pictureURL}
                    alt={team.teamName}
                    style={{ width: 20, height: 20, marginRight: 8 }}
                  />
                  {team.teamName}
                </span>
              ),
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
