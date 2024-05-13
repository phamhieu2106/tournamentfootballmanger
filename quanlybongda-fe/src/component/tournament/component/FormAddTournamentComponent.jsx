import { Divider, Form } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const FormAddTournamentComponent = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Quản Lý Giải Đấu
      </Divider>
    </>
  );
};
