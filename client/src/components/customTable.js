import {Button, Modal} from "antd"
import React, { useEffect, useState } from "react";
import { Row, Col, Input } from 'antd';
import "./tb.scss";
import {
    Form,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';

const CustomTable = (props) => {
    const [users, setUsers] = useState( () => props.users )
    const [filteredUsers, setFUsers] = useState(() => props.users )
    const [search, setSearch] = useState('')
    const [currentUser, setCurrentUser] = useState(null)
    const [show, setShow] = useState(false)
    useEffect(() => {
        setFUsers(() => users)
    },[users])

    useEffect(()=>{
        if(show) {
            Modal.confirm({
                title: 'Добовление/редактирование пользователя',
                content: <FormEdit currentUser/>,
                okText: 'save',
                cancelText: 'close',
                icon: ''
            })
        }
        setShow(false)
    },[show])

    useEffect(()=>{
        if(!users){
            return
        }
        if(search){
            setFUsers(()=>{
                return users.filter((data)=>{
                    return data.name.toLowerCase().trim().includes(search.toLowerCase().trim())
                })
            })
        }else{
            setFUsers( ()=>users )
        }
    },[search])

    const FormEdit = (user) => {
        return(
            <Form>
                <Form.Item label="Input">
                    <Input />
                </Form.Item>
                <Form.Item label="Password">
                    <Input />
                </Form.Item>
                <Form.Item label="Select">
                    <Select>
                        <Select.Option value="admin">admin</Select.Option>
                        <Select.Option value="user">user</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        )
    }

    const deleteUser = (id) => {
        let isDel = window.confirm('Вы уверены?')
        if(isDel){
            setUsers(() => users.filter((el) => el.id !== id))
        }
    }

    const RowClick = (user) => {
        setCurrentUser(user)
        setShow(true)
    }


    return (
        <div>
             <Input.Group size="large">
                <Row gutter={24}>
                    <Col span={16}>
                    <Button type="primary" size={"large"} className={'btn_table'}>
                        Добавить
                    </Button>
                    </Col>
                    <Col span={8}>
                        <Input placeholder="поиск" value={search || ''} onChange={ (e)=> setSearch(e.target.value) }/>
                    </Col>
                </Row>
            </Input.Group>
            <table className={'tbl'}>
                <thead>
                       <tr className={'row'}>
                            <td className={'cell'}>
                                ID
                            </td>
                            <td className={'cell'}>
                                Name
                            </td>
                            <td  className={'cell'}>
                                Password
                            </td>
                            <td  className={'cell'}>
                                Role
                            </td>
                            <td  className={'cell'}>
                                Action
                            </td>
                        </tr>
                    </thead>

            <tbody>
                {filteredUsers && filteredUsers.map((el)=>(
                        <tr className={'row'} key={el.id} onClick={() => RowClick(el)}>
                            <td  className={'cell'}>
                                {el.id}
                            </td>
                            <td  className={'cell'}>
                                {el.name}
                            </td>
                            <td  className={'cell'}>
                                {el.password}
                            </td>
                            <td  className={'cell'}>
                                {el.role}
                            </td>
                            <td  className={'cell'}>
                                <Button type="primary" size={"large"} onClick={(e)=> deleteUser(el.id)}>
                                    удалить
                                </Button>
                            </td>
                        </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default CustomTable;
