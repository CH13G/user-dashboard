import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class UserEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = () => {
    this.setState({visible: true});
  }

  okHandler = () => {
    const { onOk } = this.props;
    const { validateFields } = this.props.form;
    validateFields((err,values) => {
      if(err) return;
      onOk(values);
      this.hideModalHandler();
    })
  }

  hideModalHandler = () => {
    this.setState({visible: false});
  }

  renderFormItem() {
    const { name, email, website } = this.props.record;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const items = [
      {name: 'name',values: name},
      {name: 'email',values: email},
      {name: 'website',values: website},
    ];
    return items.map(item => (
      <FormItem
        {...formItemLayout}
        label={item.name.toLowerCase()}
        key={item.name}
      >
      {
        getFieldDecorator(item.name, {
            initialValue: item.values,
          })(<Input />)
      }
     </FormItem>
    ))
  }

  render() {
    const { children } = this.props;

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title='Edit User'
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <Form
            layout='horizontal'
            onSubmit={this.okHandler}
          >
            { this.renderFormItem() }
          </Form>
        </Modal>
      </span>
    )
  }

}
/**
 * From.create()
 */
export default Form.create()(UserEditModal);
