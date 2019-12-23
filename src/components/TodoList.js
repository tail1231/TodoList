import React, { Component } from "react";
import "./TodoList.less";
import axios from "axios";
import { Input, Button, List, Popconfirm, message, Form, Row, Col } from "antd";
import "../mock/list";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      inputValue: "",
      username: "",
      color: ""
    };
  }

  request = () => {
    axios.get("/list").then(res => {
      console.log(res.data.data);
      this.setState({ list: res.data.data });
    });
  };

  componentDidMount() {
    this.request();
  }

  confirm = index => {
    this.delItemHandle(index);
    message.info({
      content: "删除成功"
    });
  };

  delItemHandle = index => {
    let list = this.state.list;
    list.splice(index, 1);
    this.setState({
      list
    });
  };

  clickAddItemHandle = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue);
      if (err) {
        return;
      } else {
        let list = this.state.list;
        let obj = {
          name: fieldsValue.username,
          color: fieldsValue.color
        };
        list.push(obj);
        this.setState({
          list
        });
      }
    });
  };

  checkColor = (rule, value, callback) => {
    console.log(value);
    const reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    try {
      if (!reg.test(value)) {
        callback("请输入正确的十六进制颜色");
      }
      callback();
    } catch (err) {
      callback(err);
    }
  };

  render() {
    const text = "是否确定要删除该条数据?";
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      colon: false
    };
    return (
      <div className="container">
        <header style={{ marginBottom: 16 }}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row type="flex">
              <Col span={5}>
                <Form.Item label="username">
                  {getFieldDecorator("username", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your name"
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入名字"
                      onChange={this.changeInputValue}
                      onKeyUp={this.addItemHandle}
                    />
                  )}
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item label="color">
                  {getFieldDecorator("color", {
                    rules: [
                      {
                        required: true,
                        // message: "please input your color",
                        validator: this.checkColor
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入十六进制颜色"
                      onChange={this.changeInputValue}
                      onKeyUp={this.addItemHandle}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button
                    type="primary"
                    style={{ marginLeft: 10 }}
                    onClick={this.clickAddItemHandle}
                    htmlType="submit"
                  >
                    添加
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </header>
        <main>
          <List
            size="small"
            dataSource={this.state.list}
            renderItem={(item, index) => {
              return (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Popconfirm
                    placement="bottomRight"
                    title={text}
                    onConfirm={this.confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <div
                      style={{
                        backgroundColor: item.color,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        marginRight: 10
                      }}
                    ></div>
                  </Popconfirm>
                  <List.Item>{item.name}</List.Item>
                </div>
              );
            }}
          />
        </main>
      </div>
    );
  }
}

export default Form.create()(TodoList);
