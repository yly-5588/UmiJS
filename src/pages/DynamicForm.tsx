import { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';

let data = [
  { key: 1, typeName: '文本' },
  { key: 2, typeName: '数字' },
  { key: 3, typeName: '布尔' },
  { key: 4, typeName: '时间戳' },
];
let data1=[
  { key: 1, inputName: '文本框' },
  { key: 2, inputName: '单选框' },
  { key: 3, inputName: '时间控件' },
]

const { Option } = Select;

const DynamicForm = () => {
  const [form] = Form.useForm();
  const [type, setType] = useState<{ value: string }[]>([]);
  const [input, setInput] = useState<{ value: string }[]>([]);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      const inputType = data.map((c) => {
        return {
          value: c.typeName,
        };
      });
      setType(inputType);

      const filedType = data1.map((c) => {
        return {
          value: c.inputName,
        };
      });
      setInput(filedType);
    }, 2000);
    return function clear() {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Form form={form} {...layout}>
      <Form.Item name="name" label="字段名" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="alias" label="字段别名" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="typeName" label="字段类型" rules={[{ required: true }]}>
        <Select
          placeholder="请选择字段类型"
          options={type}
          onChange={handleChange}
          allowClear
        ></Select>
      </Form.Item>

      <Form.Item name="inputName" label="录入方式" rules={[{ required: true }]}>
        <Select
          placeholder="请选择录入方式"
          options={input}
          onChange={handleChange}
          allowClear
        ></Select>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>{

          // console.log( prevValues.typeName)
          prevValues.typeName !== currentValues.typeName
          
        }
          
        }
      >
        {
        
        ({ getFieldValue}) =>
          getFieldValue('typeName') == '布尔' ? (
            <Form.Item
              name="eum"
              label="枚举值"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null
         
        }
       
        
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>{

          // console.log( prevValues.typeName)
          prevValues.typeName !== currentValues.typeName
          
        }
          
        }
      >
        {
        
        ({ getFieldValue}) =>
          getFieldValue('typeName') == '文本'||getFieldValue('typeName') == '数字'  ? (
            console.log(getFieldValue('typeName'))
            
          ) : null
         
        }
       
        
      </Form.Item>
      <Form.Item name="empyty" label="是否允许为空" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="default" label="默认值" >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
