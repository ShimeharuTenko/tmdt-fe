import { Button, Form, Input, Tooltip, message } from "antd";
import { CheckCircleFilled, InfoCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

interface RegisterFormValues {
  name: string;
  phone: string;
  email: string;
  password: string;
  "password-confirm": string;
}

export const RegisterForm: React.FC = () => {
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);

  const [isUpperLowerValid, setIsUpperLowerValid] = useState(false);
  const [isSpecialValid, setIsSpecialValid] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm<RegisterFormValues>();
  const password = Form.useWatch("password", form);

  useEffect(() => {
    setIsUpperLowerValid(/[a-z]/.test(password) && /[A-Z]/.test(password));
    setIsSpecialValid(/[!@#$%^&*]/.test(password));
    setIsNumberValid(/[0-9]/.test(password));
    setIsLengthValid((password || "").length >= 6);
  }, [password]);

  const handleOnclick = () => {
    if (
      !isUpperLowerValid ||
      !isSpecialValid ||
      !isNumberValid ||
      !isLengthValid
    ) {
      setIsTooltipOpened(true);
    }
  };

  const tooltipContent = (
    <>
      <div>
        <CheckCircleFilled
          style={{
            color: isUpperLowerValid ? "#47CD89" : "#A4A7AE",
            paddingRight: "8px",
          }}
        />
        <span>
          Must include both uppercase and lowercase letters (A-Z, a-z)
        </span>
      </div>
      <div>
        <CheckCircleFilled
          style={{
            color: isSpecialValid ? "#47CD89" : "#A4A7AE",
            paddingRight: "8px",
          }}
        />
        <span>Must include at least one special character (!@#$%^&*)</span>
      </div>
      <div>
        <CheckCircleFilled
          style={{
            color: isNumberValid ? "#47CD89" : "#A4A7AE",
            paddingRight: "8px",
          }}
        />
        <span>Must include at least one number (0-9)</span>
      </div>
      <div>
        <CheckCircleFilled
          style={{
            color: isLengthValid ? "#47CD89" : "#A4A7AE",
            paddingRight: "8px",
          }}
        />
        <span>Must be at least 6 characters</span>
      </div>
    </>
  );

  // ✅ submit form -> call backend
  const handleFinish = async (values: RegisterFormValues) => {
    try {
      setLoading(true);
      setIsTooltipOpened(false);

      const payload = {
        fullName: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text || "Register failed");
      }

      message.success(text || "User registered successfully!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 800);
      form.resetFields();
    } catch (err: any) {
      console.error(err);
      message.error(err?.message || "Register failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinishFailed = () => {
    setIsTooltipOpened(true);
  };

  return (
    <>
      <Form<RegisterFormValues>
        form={form}
        name="form"
        layout="vertical"
        size="large"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
            {
              min: 3,
              message: "Name too short",
            },
          ]}
        >
          <Input allowClear placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            {
              pattern: /^[0-9]{8,15}$/,
              message: "Invalid phone number",
            },
          ]}
        >
          <Input allowClear placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid e-mail!",
            },
            {
              required: true,
              message: "Please input your e-mail!",
            },
          ]}
        >
          <Input allowClear placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            () => ({
              validator(_, value) {
                if (
                  /[a-z]/.test(value) &&
                  /[A-Z]/.test(value) &&
                  /[!@#$%^&*]/.test(value) &&
                  /[0-9]/.test(value) &&
                  (value || "").length >= 6
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Password does not meet requirements")
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Enter your password"
            allowClear
            addonAfter={
              <Tooltip
                title={tooltipContent}
                classNames={{ root: "tailwind-tooltip" }}
                styles={{
                  body: { width: "440px", backgroundColor: "#535862" },
                }}
                open={isTooltipOpened}
                fresh
              >
                <InfoCircleOutlined
                  onMouseOver={() => {
                    setIsTooltipOpened(true);
                  }}
                  onMouseLeave={() => {
                    setIsTooltipOpened(false);
                  }}
                />
              </Tooltip>
            }
            onInput={() => {
              setIsTooltipOpened(true);
            }}
            onMouseLeave={() => {
              setIsTooltipOpened(false);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="password-confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "The new password that you entered do not match!"
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password allowClear placeholder="Confirm your password" />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full mt-4 bg-[#5046E4] font-semibold"
            onClick={handleOnclick}
            loading={loading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
