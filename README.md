<p align="center">
  <img src="https://license.rocks/wp-content/uploads/2020/10/MegaFlow.jpg" width="250">
</p>

<h1 align="center">MegaFlow</h1>

<div align="center">

React component to build workflows based on JSON schemas powered by React Hook Forms.

</div>

JSON.parse()

```js
const json = '{"result":true, "count":42}';
const obj = JSON.parse(json);

console.log(obj.count);
// expected output: 42

console.log(obj.result);
// expected output: true
```

Connect Form

When we are building forms, there are times when our input lives inside of deeply nested component trees, and that's when FormContext comes in handy. However, we can further improve the Developer Experience by creating a ConnectForm component and leveraging React's renderProps. The benefit is you can connect your input with React Hook Form from much easier.
