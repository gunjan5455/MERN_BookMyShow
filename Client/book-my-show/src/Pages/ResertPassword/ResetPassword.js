import { Input, Form, Button, message } from "antd";
import { resetPasswordAPI } from "../../calls/resetpassword";

const ResetPassword = () => {
  const onReset = async (values) => {
    const response = await resetPasswordAPI({
      otp: values.otp,
      password: values.password,
    });
    if (response.data.success) {
      message.success(response.data.message);
      window.location.href = "/login";
    } else {
      message.error(response.data.message);
    }
    console.log(response);
  };
  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Reset Password</h1>
          </section>

          <section className="right-section">
            <Form onFinish={onReset} layout="vertical">
              <Form.Item
                label="OTP"
                htmlFor="otp"
                name="otp"
                className="d-block"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input
                  id="otp"
                  type="number"
                  placeholder="Enter your OTP"
                ></Input>
              </Form.Item>

              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                ></Input>
              </Form.Item>

              <Form.Item className="d-block">
                <Button
                  color="danger"
                  variant="solid"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </section>
        </main>
      </header>
    </>
  );
};
export default ResetPassword;
