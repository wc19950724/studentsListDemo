import Mock from "mockjs";

// 模拟数据
let mockData = [];
for (let i = 0; i < 100; i++) {
  const num1 = Mock.mock('@cword("一二三四五六七")');
  const num2 = Mock.mock('@cword("一二三四五六七")');
  const firstName = Mock.mock("@cfirst");
  const lastName1 = Mock.mock("@clast");
  const lastName2 = Mock.mock("@clast");

  const info = {
    id: Mock.mock("@id"),
    name: `${firstName}${lastName1}`,
    class: `${num1}年级${num2}班`,
    parentName: `${firstName}${lastName2}`
  };
  // 将模拟数据放到数据中
  mockData.push(info);
}

// 数据删除
const list = function(options) {
  // 请求类型转换为小写
  const rtype = options.type.toLowerCase();
  switch (rtype) {
    case "get":
      break;
    case "post":
      // 获取请求的id, 将options.body转换为JSON对象
      const id = JSON.parse(options.body).id;
      // 匹配id删除掉当前项
      mockData = mockData.filter(item => item.id !== id);
      break;
    default:
      break;
  }
  return {
    data: mockData
  };
};

// 数据新增
const listAdd = function(options) {
  const obj = JSON.parse(options.body);
  // 将前台返回来的数据，拼接到数组中。
  mockData = mockData.concat(obj);
  return {
    data: mockData
  };
};

// 数据修改
const listUpdate = function(options) {
  const obj = JSON.parse(options.body);
  // 将需要替换的数据替换掉
  mockData = mockData.map(item => (item.id === obj.id ? obj : item));
  return {
    data: mockData
  };
};

// 数据条件搜索
const listSearch = function(options) {
  const obj = JSON.parse(options.body);
  const arr = [];
  mockData.forEach(item => {
    for (let k in item) {
      if (obj[k] && item[k].includes(obj[k])) {
        arr.push(item);
        break;
      }
    }
  });
  return {
    data: arr
  };
};

Mock.mock("/list", /get|post/i, list);
Mock.mock("/listAdd", /get|post/i, listAdd);
Mock.mock("/listUpdate", /get|post/i, listUpdate);
Mock.mock("/listSearch", /get|post/i, listSearch);
