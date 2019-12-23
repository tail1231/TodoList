import Mock from "mockjs";

Mock.mock("/list", {
  "data|5": [
    {
      name: "@name",
      color: "@color",
    }
  ]
});
