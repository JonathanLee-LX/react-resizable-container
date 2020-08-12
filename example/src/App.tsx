import ProLayout from '@ant-design/pro-layout'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import React from 'react'
import ResizableContainer from 'react-resizable'
import 'react-resizable/dist/index.css'

const users = new Array(100)

for (let i = 0; i < users.length; i++) {
  users[i] = {
    name: 'kk',
    age: i,
    sex: Math.random() > 0.5 ? 'man' : 'woman'
  }
}

const App = () => {
  const columns = [
    { title: 'name', dataIndex: 'name' },
    { title: 'age', dataIndex: 'age' },
    { title: 'sex', dataIndex: 'sex' }
  ]

  return (
    <ProLayout
      style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
      contentStyle={{ padding: 20 }}
    >
      <ResizableContainer
        flex={<Table dataSource={users} columns={columns} rowKey='age' />}
        fixed={
          <>
            <Table dataSource={users} columns={columns} rowKey='age' />
            <div>
              <button style={{ marginLeft: '5px' }}>button 1</button>
              <button style={{ marginLeft: '5px' }}>button 2</button>
              <button style={{ marginLeft: '5px' }}>button 3</button>
            </div>
          </>
        }
      ></ResizableContainer>
    </ProLayout>
  )
}

export default App
