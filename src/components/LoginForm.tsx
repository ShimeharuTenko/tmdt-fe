import { Button, Form, Input } from "antd";
import { useState } from "react";

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<LoginFormValues>();

  const handleFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);

      const payload = {
        email: values.email,
        password: values.password,
      };

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // ❗ parse JSON
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      // ✅ STORE JWT TOKEN
      localStorage.setItem("token", data.token);

      // 👉 redirect
      setTimeout(() => {
        window.location.href = "/";
      }, 500);

    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Login failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinishFailed = () => {
    alert("Please fill in all fields correctly.");
  };

  return (
    <Form<LoginFormValues>
      form={form}
      name="login-form"
      layout="vertical"
      size="large"
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      className="w-full"
    >
      {/* Email */}
      <Form.Item
        label="Email Address"
        name="email"
        rules={[
          { type: "email", message: "Invalid email!" },
          { required: true, message: "Please input your email!" },
        ]}
      >
        <Input allowClear placeholder="Enter your email" />
      </Form.Item>

      {/* Password */}
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be at least 6 characters." },
        ]}
      >
        <Input.Password allowClear placeholder="Enter your password" />
      </Form.Item>

      <Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full bg-[#5046E4] font-semibold mt-4"
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
