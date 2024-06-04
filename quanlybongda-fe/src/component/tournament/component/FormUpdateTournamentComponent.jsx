import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { addTournament, getTournament } from "../../../api/TournamentAPI";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { listTeams } from "../../../api/TeamAPI";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

// eslint-disable-next-line arrow-body-style
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

export const FormUpdateTournamentComponent = () => {
  let { id } = useParams(null);
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [tournament, setTournament] = useState(null);
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

  const fetchDataTournament = async () => {
    try {
      const result = await getTournament(id);
      setTournament(result);
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
    fetchDataTournament();
  }, []);

  useEffect(() => {
    if (tournament) {
      form.setFieldsValue({
        nameTournament: tournament.nameTournament,
        timeTournament: [
          dayjs(tournament.startDate),
          dayjs(tournament.endDate),
        ],
      });
      console.log(tournament);
    }
  }, [tournament]);
  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Cập Nhật Giải Đấu
      </Divider>

      <Space direction="vertical" size={16}>
        <Card title="Thông tin giải đấu" style={{ width: 300 }}>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Không được tróng tên đội bóng!",
                },
              ]}
              label="Tên Giải Đấu:"
              name="nameTournament"
            >
              <Input placeholder="tên giải đấu" />
            </Form.Item>
            <Form.Item
              label="Thời Gian:"
              name="timeTournament"
              rules={[
                {
                  required: true,
                  message: "Không được để trống thời gian diễn ra và kết thúc!",
                },
              ]}
            >
              <RangePicker disabledDate={disabledDate} />
            </Form.Item>
            <Form.Item label="Logo">
              <Image width={100} src={tournament?.image?.pictureURL}></Image>
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
                options={
                  teams &&
                  teams?.map((team) => ({
                    label: (
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={team?.image.pictureURL}
                          alt={team?.teamName}
                          style={{ width: 20, height: 20, marginRight: 8 }}
                        />
                        {team?.teamName}
                      </span>
                    ),
                    value: team.id,
                  }))
                }
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </>
  );
};
