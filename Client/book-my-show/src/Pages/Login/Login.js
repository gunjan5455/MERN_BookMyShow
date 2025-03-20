import { Input, Form, Button, message } from "antd";
import { Link } from "react-router-dom";
import { loggedUser } from "../../calls/login";

const Login = () => {
  const onLogged = async (values) => {
    // console.log("clicked");
    const response = await loggedUser(values);
    console.log(response);
    if (response.data.success) {
      message.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
    } else {
      message.error(response.data.message);
    }
  };
  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Login to BookMyShow</h1>
          </section>

          <section className="right-section">
            <Form onFinish={onLogged} layout="vertical">
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your Email"
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
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                New User? <Link to="/register">Register Here</Link>
              </p>
              <p>
                Forget Password ? <Link to="/forget">click here </Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
};
export default Login;
