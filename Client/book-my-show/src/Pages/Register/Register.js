import { Input, Form, Button, message } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../calls/users";
const Register = () => {
  const onRegistration = async (values) => {
    console.log(values);
    const response = await RegisterUser(values);
    console.log(response);
    if (response.data.success) {
      message.success("You are registred successfully, Please login");
    } else {
      message.error("You are already a user, Please Login");
    }
  };
  return (
    <div>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Register to BookMyShow</h1>
          </section>

          <section className="right-section">
            <Form onFinish={onRegistration} layout="vertical">
              <Form.Item
                label="Name"
                htmlFor="name"
                name="name"
                className="d-block"
                rules={[{ required: true, message: "name is required" }]}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your Name"
                ></Input>
              </Form.Item>

              {/* <Form.Item
                label="UserId"
                htmlFor="id"
                name="id"
                className="d-block"
                rules={[{ required: true, message: "UserId is required" }]}
              >
                <Input
                  id="id"
                  type="text"
                  placeholder="Enter your Name"
                ></Input>
              </Form.Item> */}

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
                  Register
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                Already a User? <Link to="/login">Login now</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </div>
  );
};
export default Register;
