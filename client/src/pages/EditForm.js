import {Form, Input, Select} from "antd";
import {useState} from "react";

const FormEdit = ({user}) => {
    const [login, setLogin] = useState(user.name)
    const [password, setPassword] = useState(user.password)
    const [role, setRole] = useState(user.role)

    return(
        <Form>
            <Form.Item label="Login">
                <Input value={login} onChange={e => setLogin(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Password">
                <Input type={"password"} value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Role">
                <Select value={role} onSelect={e => setRole(e)}>
                    <Select.Option value="admin">admin</Select.Option>
                    <Select.Option value="user">user</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    )
}

export default FormEdit