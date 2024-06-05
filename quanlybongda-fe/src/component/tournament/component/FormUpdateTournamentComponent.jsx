import { EditFilled, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  Select,
  Space,
  Table,
  Tooltip,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { addTournament, getTournament } from "../../../api/TournamentAPI";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { listTeams } from "../../../api/TeamAPI";
import { listStanding } from "../../../api/StandingAPI";

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
  const [standings, setStandings] = useState([]);
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
  const columns = [
    {
      title: "Câu Lạc Bộ",
      dataIndex: "club",
      width: "30%",
    },
    {
      title: "Số Trận",
      dataIndex: "matchPlayed",
      sorter: (a, b) => a.matchPlayed - b.matchPlayed,
    },
    {
      title: "Thắng",
      dataIndex: "win",
      sorter: (a, b) => a.win - b.win,
    },
    {
      title: "Hòa",
      dataIndex: "draw",
      sorter: (a, b) => a.draw - b.draw,
    },
    {
      title: "Thua",
      dataIndex: "loss",
      sorter: (a, b) => a.loss - b.loss,
    },
    {
      title: "Điểm",
      dataIndex: "points",
      sorter: (a, b) => a.points - b.points,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="cập nhật">
            <Button type="primary" shape="circle" icon={<EditFilled />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
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

  const fetchDataStandings = async () => {
    try {
      const result = await listStanding(id);
      setStandings(mapStandingJsonToRow(result));
      mapIdTeams(result);
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

  const mapIdTeams = (data) => {
    form.setFieldValue(
      "idTeams",
      data.map((item) => item.id)
    );
  };

  // Map Standings
  const mapStandingJsonToRow = (data) => {
    return data.map((item, index) => ({
      key: index,
      club: (
        <div>
          {index + 1}{" "}
          <Image width={20} src={item.team.image.pictureURL}></Image>{" "}
          <>{item.team.teamName}</>
        </div>
      ),
      matchPlayed: item.matchPlayed,
      win: item.win,
      loss: item.loss,
      draw: item.draw,
      points: <strong>{item.points}</strong>,
    }));
  };
  // UseEffect
  useEffect(() => {
    fetchDataTeams();
    fetchDataTournament();
    fetchDataStandings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [form, tournament]);

  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Cập Nhật Giải Đấu
      </Divider>

      <Flex justify="space-between" align="center">
        <Card
          title="Thông tin giải đấu"
          style={{ width: 400 }}
          extra={
            tournament?.status === "STARTED"
              ? "Giải đấu đã bắt đầu"
              : tournament?.status === "ENDED"
              ? "Giải đấu đã kết thúc"
              : ""
          }
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            disabled={
              tournament?.status === "STARTED" || tournament?.status === "ENDED"
            }
          >
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
        <Card title="Bảng xếp hạng" style={{ width: 800 }}>
          <Table columns={columns} dataSource={standings} onChange={onChange} />
        </Card>
      </Flex>
    </>
  );
};
