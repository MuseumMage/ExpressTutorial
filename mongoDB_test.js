const { MongoClient } = require('mongodb');

// MongoDB 连接 URI
const uri = "mongodb://localhost:27017";

// 创建一个新的 MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // 连接到 MongoDB
    await client.connect();
    console.log("Connected successfully to MongoDB");

    // 选择数据库
    const database = client.db('testdb');
    const collection = database.collection('testcollection');

    // 插入一个文档
    const result = await collection.insertOne({ name: "test", value: 1 });
    console.log(`New document inserted with _id: ${result.insertedId}`);

    // 查询文档
    const doc = await collection.findOne({ name: "test" });
    console.log("Found document:", doc);
  } catch (err) {
    console.error('Failed to connect to the database. Error:', err);
  } finally {
    // 关闭连接
    await client.close();
  }
}

run().catch(console.dir);