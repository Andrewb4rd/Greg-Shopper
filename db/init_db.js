// code to build and initialize DB goes here
const {
  client,
  createUser,
  getAllUsers,
  createDuck,
  getAllDucks,
  createDuckOrder,
  createOrder,
  getOrderById,

  // other db methods
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Starting to drop tables...");
    await client.query(`
         
          DROP TABLE IF EXISTS duck_orders;
          DROP TABLE IF EXISTS orders;
          DROP TABLE IF EXISTS ducks;
          DROP TABLE IF EXISTS users;
        `);
    console.log("Finished dropping tables!");
    // build tables in correct order
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL,
      admin BOOLEAN DEFAULT false
    );

    CREATE TABLE ducks (
      id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      price varchar(255) NOT NULL,
      imgUrl varchar(255) NOT NULL
    );

    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users(id),
      checkedOut boolean DEFAULT false
    );

    CREATE TABLE duck_orders (
      "orderId" INTEGER REFERENCES orders(id),
      "duckId" INTEGER REFERENCES ducks(id),
      UNIQUE ("orderId", "duckId"),
      quantity varchar(255) NOT NULL,
      price varchar(255) NOT NULL

    );
  `);

    console.log("Finished building tables!");
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    console.log("Starting to create users...");

    await createUser({
      username: "albert",
      password: "bertie99",
    });

    await createUser({
      username: "Jason",
      password: "balls69",
    });

    await createUser({
      username: "SmellyShelly",
      password: "bingbingBONG",
    });

    console.log("Finished creating users!");

    await createDuck({
      name: "Safety Duck",
      price: "$2.99",
      imgUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71LgxJzwFKL._SL1500_.jpg",
    });

    await createDuck({
      name: "Groom Duck",
      price: "$8.99",
      imgUrl:
        "https://cdn11.bigcommerce.com/s-nf2x4/images/stencil/1280x1280/products/261/10460/Wedding-Set-Rubber-Duck-Ad-Line-3__62602.1569352998.jpg?c=2",
    });

    await createDuck({
      name: "Jumbo Duck",
      price: "$8.96",
      imgUrl:
        "https://images-na.ssl-images-amazon.com/images/I/51VXgNZFIoL._AC_SL1424_.jpg",
    });

    await createDuck({
      name: "Original Yellow",
      price: "$6.90",
      imgUrl:
        "https://lilalu-shop.com/media/image/35/9c/a5/lilalu-quietscheente-gelb-yellow-rubber-duck-HL.png",
    });

    await createDuck({
      name: "Sunny Duck",
      price: "$3.99",
      imgUrl:
        "https://cdn11.bigcommerce.com/s-jnapaiw/images/stencil/1280x1280/products/2945/4049/Sunny_duck__52036.1400093435.jpg?c=2",
    });

    await createDuck({
      name: "Muscle Duck",
      price: "$8.99",
      imgUrl:
        "https://cdn11.bigcommerce.com/s-nf2x4/images/stencil/1280x1280/products/307/9994/muscle-builder-Rubber-Duck-Adline-1__83749.1576270703.jpg?c=2",
    });

    await createDuck({
      name: "Green Duck",
      price: "$7.83",
      imgUrl:
        "https://amsterdamduckstore.com/wp-content/uploads/2019/12/Green-rubber-duck-front-Amsterdam-Duck-Store.jpg",
    });

    await createDuck({
      name: "French Duck",
      price: "$6.90",
      imgUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71zNJEsD91L._AC_SL1500_.jpg",
    });

    await createDuck({
      name: "Giraffe Duck",
      price: "$4.99",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/0115/4891/7819/products/23204_Rubber_Duck_Giraffe_b8333e8c-2a66-44a2-954e-cf8f99d6fe45_grande.jpg?v=1557902959",
    });

    await createDuck({
      name: "Statue of Liberty Duck",
      price: "$4.98",
      imgUrl:
        "https://cdn11.bigcommerce.com/s-91br/images/stencil/original/products/1742/21757/IMG_5491__31051.1589004052.jpg?c=2",
    });

    await createDuck({
      name: "Literary Duck",
      price: "$3.95",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/1184/9194/products/literary-rubber-duck-1322-p_600x.jpeg?v=1457991497",
    });

    await createDuck({
      name: "Office Duck",
      price: "$4.50",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/0604/4801/products/Office_1.jpeg?v=1568677406",
    });

    await createDuck({
      name: "Workout Towel Duck",
      price: "$8.99",
      imgUrl:
        "https://cdn11.bigcommerce.com/s-nf2x4/images/stencil/1280x1280/products/151/9155/Fittnes-Dumbell-Rubber-Duck-Schanables-1__08399.1594131587.jpg?c=2",
    });

    await createDuck({
      name: "Santa Duck",
      price: "$0.99",
      imgUrl:
        "https://partycity6.scene7.com/is/image/PartyCity/_pdp_sq_?$_1000x1000_$&$product=PartyCity/805307",
    });

    await createDuck({
      name: "Six-Story Duck",
      price: "$30,000.00",
      imgUrl:
        "https://media.npr.org/assets/img/2013/05/06/ducky062way-23e257dfd081032928ffbd73768a7ddd8615f1f3.jpg",
    });

    await createDuck({
      name: "Elvis Duck",
      price: "$4.50",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/0604/4801/products/1_squared.jpg?v=1568680762",
    });

    await createDuck({
      name: "Pride Duck",
      price: "$12.00",
      imgUrl:
        "https://shop.hrc.org/media/catalog/product/cache/b96c8ebdd70d2c86125e47f452c01479/h/r/hrc13388.jpg",
    });

    await createDuck({
      name: "Batman Duck",
      price: "$9.99",
      imgUrl:
        "https://images.squarespace-cdn.com/content/53208ff6e4b00fbb0f1c2d65/1550436941037-I7VSUCTF76DHUWNVP8X4/image-asset.jpeg?content-type=image%2Fjpeg",
    });

    await createDuck({
      name: "Octopus Duck",
      price: "$4.99",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/2117/2515/products/SouthCarolinaStateParks_ADI01881_Oct_2048x.jpg?v=1574887748",
    });

    await createDuck({
      name: "Mallard Duck",
      price: "$5.99",
      imgUrl:
        "https://www.essexduck.com/uploads/1/3/2/0/132064494/s101382617522703170_p115_i1_w500.jpeg",
    });

    await createDuck({
      name: "Ducktrix Duck",
      price: "$12.25",
      imgUrl:
        "https://amsterdamduckstore.com/wp-content/uploads/2019/08/Ducktrix-rubber-duck-front-Amsterdam-Duck-Store-1.jpg",
    });

    await createDuck({
      name: "Samurai Duck",
      price: "$12.99",
      imgUrl:
        "https://www.essexduck.com/uploads/1/3/2/0/132064494/s101382617522703170_p186_i1_w500.jpeg",
    });

    await createDuck({
      name: "Devil Duck",
      price: "$4.95",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/1365/2497/products/devil_duckie_3_800x.jpg?v=1520534081",
    });

    await createDuck({
      name: "IT Duck",
      price: "$5.99",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwJ3uBgej0kI9wlaGdA0NiehQgub6cMqcnAA&usqp=CAU&ec=45771800",
    });

    await createDuck({
      name: "Skeleton Duck",
      price: "$9.99",
      imgUrl:
        "https://i.pinimg.com/236x/07/28/5e/07285e1923c632ff99a8fdccc202af7b--rubber-duck-chocolate-bars.jpg",
    });

    await createDuck({
      name: "Crash Bandicoot Duck",
      price: "$15.99",
      imgUrl:
        "https://images-na.ssl-images-amazon.com/images/I/51vpn9sjL%2BL._AC_SX425_.jpg",
    });

    await createDuck({
      name: "Lilith Duck",
      price: "$14.99",
      imgUrl:
        "https://images-na.ssl-images-amazon.com/images/I/51fbBG5t47L._AC_SX425_.jpg",
    });

    await createDuck({
      name: "Spock Duck",
      price: "$12.99",
      imgUrl:
        "https://target.scene7.com/is/image/Target/GUEST_5200c1f9-4eb8-495f-911d-0e13f4e1cb31?wid=488&hei=488&fmt=pjpeg",
    });

    await createDuck({
      name: "Chris Redfield Duck",
      price: "$12.99",
      imgUrl:
        "https://images-na.ssl-images-amazon.com/images/I/51dgWXm-L0L._AC_SX425_.jpg",
    });

    await createDuck({
      name: "Gandalf Duck",
      price: "$12.99",
      imgUrl: "https://m.media-amazon.com/images/I/51KdEaTeLEL.jpg",
    });

    const orderSimple = await createOrder({ userId: 1 });
    console.log("ORDERSIMPLE: ", orderSimple);
    const orderId = orderSimple.id;

    await createDuckOrder({
      orderId: orderId,
      duckId: 12,
      quantity: 2,
      price: 1299,
    });

    const order = await getOrderById(orderId);
    console.log("ORDERRRRRRR: ", order);
  } catch (error) {
    throw error;
  }
}

async function testDb() {
  try {
    console.log("Starting to test database...");

    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("Result: ", users);

    console.log("Calling getAllDucks");
    const ducks = await getAllDucks();
    console.log("Result: ", ducks);

    console.log("Finished testing database.");
  } catch (error) {
    console.log("error testing database");
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .then(testDb)
  .catch(console.error)
  .finally(() => client.end());
