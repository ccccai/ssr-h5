
/* mock配置文件
  ps：mock模块会影响原生的ajax请求，使得服务器返回的blob类型变成乱码，
  所以如果在代码中有使用blob时，需要在mainjs中把mock注释掉，才能正常使用
*/
// 引入mockjs
import Mock from 'mockjs'
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const loginData = () => {
  const data = {
    token: Random.string(10)
  };
  return {
    data: data,
    code: 0,
    msg: '成功'
  }
}

const userInfo = () => {
  const data = {
    id: '3',
    name: '超级管理员',
    path: '/static/img/avatar.jpg'
  };
  return {
    data: data,
    code: 0,
    msg: '成功'
  }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/api/login', 'post', loginData)
Mock.mock('/api/getLoginInfo', 'post', userInfo)