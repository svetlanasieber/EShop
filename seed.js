const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Product = require('./models/productModel');
const Category = require('./models/prodcategoryModel');
const User = require('./models/userModel');
const BlogCategories = require('./models/blogCatModel');
const Blog = require('./models/blogModel');
const Brand = require('./models/brandModel');
const Color = require('./models/colorModel');
const Coupon = require('./models/couponModel');
const Cart = require('./models/cartModel');
const Enquiry = require('./models/enqModel');
const Order = require('./models/orderModel');

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    seedData();
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Data to be seeded
const categories = [
    {
        title: "Electronics",
    },
    {
        title: "Audio",
    },
    {
        title: "Computers",
    },
    {
        title: "Home Entertainment",
    },
    {
        title: "Wearables",
    },
    {
        title: "Transport",
    },
    {
        title: "Photography",
    },
    {
        title: "Home Appliances",
    },
    {
        title: "Sports & Outdoors",
    },
    {
        title: "Beauty & Health",
    }
];

const users = [
    { firstname: "John", lastname: "Doe", email: "john.doe@example.com", mobile: "9234567890", password: "password123", role: "user", address: "123 Main St, Anytown, USA", wishlist: [] },
    { firstname: "Jane", lastname: "Smith", email: "jane.smith@example.com", mobile: "2345678901", password: "password123", role: "user", address: "456 Elm St, Anytown, USA", wishlist: [] },
    { firstname: "Alice", lastname: "Johnson", email: "alice.johnson@example.com", mobile: "3456789012", password: "password123", role: "user", address: "789 Oak St, Anytown, USA", wishlist: [] },
    { firstname: "Bob", lastname: "Brown", email: "bob.brown@example.com", mobile: "4567890123", password: "password123", role: "user", address: "101 Pine St, Anytown, USA", wishlist: [] },
    { firstname: "Charlie", lastname: "Davis", email: "charlie.davis@example.com", mobile: "5678901234", password: "password123", role: "user", address: "202 Maple St, Anytown, USA", wishlist: [] },
    { firstname: "Diana", lastname: "Miller", email: "diana.miller@example.com", mobile: "6789012345", password: "password123", role: "user", address: "303 Birch St, Anytown, USA", wishlist: [] },
    { firstname: "Ethan", lastname: "Wilson", email: "ethan.wilson@example.com", mobile: "7890123456", password: "password123", role: "user", address: "404 Cedar St, Anytown, USA", wishlist: [] },
    { firstname: "Fiona", lastname: "Moore", email: "fiona.moore@example.com", mobile: "8901234567", password: "password123", role: "user", address: "505 Walnut St, Anytown, USA", wishlist: [] },
    { firstname: "George", lastname: "Taylor", email: "george.taylor@example.com", mobile: "9012345678", password: "password123", role: "user", address: "606 Cherry St, Anytown, USA", wishlist: [] },
    { firstname: "Hannah", lastname: "Anderson", email: "hannah.anderson@example.com", mobile: "0123456789", password: "password123", role: "user", address: "707 Spruce St, Anytown, USA", wishlist: [] },
    { firstname: "Admin", lastname: "User", email: "admin@gmail.com", mobile: "1111111111", password: "admin@gmail.com", role: "admin", address: "999 Admin St, Anytown, USA", wishlist: [] }
];

const blogCategories = [
    {
        title: "Technology",
    },
    {
        title: "Health & Wellness",
    },
    {
        title: "Travel",
    },
    {
        title: "Food & Recipes",
    },
    {
        title: "Lifestyle",
    },
    {
        title: "Finance",
    },
    {
        title: "Education",
    },
    {
        title: "Fashion & Beauty",
    },
    {
        title: "Sports",
    },
    {
        title: "Entertainment",
    }
];

const brands = [
    {
        title: "TechCorp",
    },
    {
        title: "SoundWave",
    },
    {
        title: "GameMaster",
    },
    {
        title: "ViewTech",
    },
    {
        title: "WristTech",
    },
    {
        title: "EcoRide",
    },
    {
        title: "SoundBlast",
    },
    {
        title: "CapturePro",
    },
    {
        title: "FitLife",
    },
    {
        title: "CleanBot",
    }
];

const colors = [
    {
        title: "Black",
    },
    {
        title: "Silver",
    },
    {
        title: "Red",
    },
    {
        title: "Blue",
    },
    {
        title: "Green",
    },
    {
        title: "Yellow",
    },
    {
        title: "Gray",
    },
    {
        title: "White",
    },
    {
        title: "Gold",
    },
    {
        title: "Pink",
    }
];

const coupons = [
    {
        name: "SUMMER21",
        expiry: new Date(new Date().setMonth(new Date().getMonth() + Math.floor(Math.random() * 3) + 3)),
        discount: 20,
    },
    {
        name: "WINTER21",
        expiry: new Date(new Date().setMonth(new Date().getMonth() + Math.floor(Math.random() * 3) + 3)),
        discount: 25,
    },
    {
        name: "SPRING21",
        expiry: new Date(new Date().setMonth(new Date().getMonth() + Math.floor(Math.random() * 3) + 3)),
        discount: 15,
    },
    {
        name: "FALL21",
        expiry: new Date(new Date().setMonth(new Date().getMonth() + Math.floor(Math.random() * 3) + 3)),
        discount: 10,
    },
    {
        name: "NEWYEAR24",
        expiry: new Date(new Date().setMonth(new Date().getMonth() + Math.floor(Math.random() * 3) + 3)),
        discount: 30,
    },
    {
        name: "BLACKFRIDAY",
        expiry: new Date(new Date().setMonth(new Date().getMonth() + Math.floor(Math.random() * 3) + 3)),
        discount: 50,
    },
    {
        name: "CYBERMONDAY",
        expiry: new Date(new Date().setMonth(new Date().getMonth() + Math.floor(Math.random() * 3) + 3)),
        discount: 40,
    },
    {
        name: "BACKTOSCHOOL",
        expiry: new Date(new Date().setMonth(new Date().getMonth() + Math.floor(Math.random() * 3) + 3)),
        discount: 15,
    },
    {
        name: "HOLIDAYSALE",
        expiry: new Date(new Date().setMonth(new Date().getMonth() + Math.floor(Math.random() * 3) + 3)),
        discount: 35,
    },
    {
        name: "FLASHSALE",
        expiry: new Date(new Date().setMonth(new Date().getMonth() + Math.floor(Math.random() * 3) + 3)),
        discount: 10,
    }
];

const enquiries = [
    {
        name: "John Doe",
        email: "john.doe@example.com",
        mobile: "1234567890",
        comment: "I have a question about my recent order.",
        status: "Submitted",
    },
    {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        mobile: "2345678901",
        comment: "Can you provide more information about product X?",
        status: "Contacted",
    },
    {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        mobile: "3456789012",
        comment: "I am facing an issue with my account.",
        status: "In Progress",
    },
    {
        name: "Bob Brown",
        email: "bob.brown@example.com",
        mobile: "4567890123",
        comment: "My order arrived damaged. What should I do?",
        status: "Resolved",
    },
    {
        name: "Charlie Davis",
        email: "charlie.davis@example.com",
        mobile: "5678901234",
        comment: "How can I track my shipment?",
        status: "Submitted",
    },
    {
        name: "Diana Miller",
        email: "diana.miller@example.com",
        mobile: "6789012345",
        comment: "I want to change my shipping address.",
        status: "Contacted",
    },
    {
        name: "Ethan Wilson",
        email: "ethan.wilson@example.com",
        mobile: "7890123456",
        comment: "Can I return a product after 30 days?",
        status: "In Progress",
    },
    {
        name: "Fiona Moore",
        email: "fiona.moore@example.com",
        mobile: "8901234567",
        comment: "Is there a warranty on product Y?",
        status: "Resolved",
    },
    {
        name: "George Taylor",
        email: "george.taylor@example.com",
        mobile: "9012345678",
        comment: "I received the wrong item in my order.",
        status: "Submitted",
    },
    {
        name: "Hannah Anderson",
        email: "hannah.anderson@example.com",
        mobile: "0123456789",
        comment: "How can I cancel my subscription?",
        status: "Contacted",
    },
    {
        name: "Ivy Lewis",
        email: "ivy.lewis@example.com",
        mobile: "1023456789",
        comment: "Can you help me with the payment process?",
        status: "In Progress",
    },
    {
        name: "Jack White",
        email: "jack.white@example.com",
        mobile: "1123456789",
        comment: "What is the refund policy?",
        status: "Resolved",
    },
    {
        name: "Kara Black",
        email: "kara.black@example.com",
        mobile: "1223456789",
        comment: "I have not received my order confirmation email.",
        status: "Submitted",
    },
    {
        name: "Liam Gray",
        email: "liam.gray@example.com",
        mobile: "1323456789",
        comment: "Can I update my email address?",
        status: "Contacted",
    },
    {
        name: "Mia Blue",
        email: "mia.blue@example.com",
        mobile: "1423456789",
        comment: "How do I apply a discount code?",
        status: "In Progress",
    },
    {
        name: "Noah Green",
        email: "noah.green@example.com",
        mobile: "1523456789",
        comment: "I need help with my account settings.",
        status: "Resolved",
    },
    {
        name: "Olivia Brown",
        email: "olivia.brown@example.com",
        mobile: "1623456789",
        comment: "I want to know about bulk purchase discounts.",
        status: "Submitted",
    },
    {
        name: "Paul White",
        email: "paul.white@example.com",
        mobile: "1723456789",
        comment: "My payment is not going through.",
        status: "Contacted",
    },
    {
        name: "Quincy Black",
        email: "quincy.black@example.com",
        mobile: "1823456789",
        comment: "How can I reset my password?",
        status: "In Progress",
    },
    {
        name: "Rachel Blue",
        email: "rachel.blue@example.com",
        mobile: "1923456789",
        comment: "What are the shipping options available?",
        status: "Resolved",
    }
];

// Seed data function
const seedData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany({});
        await Category.deleteMany({});
        await User.deleteMany({});
        await BlogCategories.deleteMany({});
        await Blog.deleteMany({});
        await Brand.deleteMany({});
        await Color.deleteMany({});
        await Coupon.deleteMany({});
        await Cart.deleteMany({});
        await Enquiry.deleteMany({});
        await Order.deleteMany({});
        console.log('Collections cleared');

        for (let user of users) {
            user.password = await hashPassword(user.password);
        }

        // Insert seed data
        const insertedUsers = await User.insertMany(users);

        const userMap = insertedUsers.reduce((map, User) => {
            map[User.email] = User._id;
            return map;
        }, {});

        const products = [
            {
                title: "Smartphone Alpha",
                slug: "smartphone-alpha",
                description: "A high-end smartphone with an impressive display and camera.",
                price: 999,
                category: "Electronics",
                brand: "TechCorp",
                quantity: 100,
                sold: 30,
                images: ["smartphone-alpha1.jpg", "smartphone-alpha2.jpg"],
                color: ["Black", "Silver"],
                tags: "smartphone,high-end,tech",
                ratings: [
                    {
                        star: 5,
                        comment: "Amazing performance and display!",
                        postedby: userMap['hannah.anderson@example.com']
                    },
                    {
                        star: 4,
                        comment: "Great value for the price.",
                        postedby: userMap['john.doe@example.com']
                    }
                ],
                totalrating: "4.5",
            },
            {
                title: "Wireless Headphones",
                slug: "wireless-headphones",
                description: "Noise-cancelling wireless headphones with long battery life.",
                price: 199,
                category: "Audio",
                brand: "SoundWave",
                quantity: 200,
                sold: 150,
                images: ["wireless-headphones1.jpg", "wireless-headphones2.jpg"],
                color: ["Red", "Black"],
                tags: "headphones,wireless,audio",
                ratings: [
                    {
                        star: 4,
                        comment: "Excellent sound quality and comfort.",
                        postedby: userMap['hannah.anderson@example.com']
                    },
                    {
                        star: 5,
                        comment: "Best headphones I've ever owned!",
                        postedby: userMap['john.doe@example.com']
                    }
                ],
                totalrating: "4.7",
            },
            {
                title: "Gaming Laptop",
                slug: "gaming-laptop",
                description: "A powerful gaming laptop with the latest graphics card.",
                price: 1499,
                category: "Computers",
                brand: "GameMaster",
                quantity: 50,
                sold: 20,
                images: ["gaming-laptop1.jpg", "gaming-laptop2.jpg"],
                color: ["Gray", "Black"],
                tags: "laptop,gaming,high-performance",
                ratings: [
                    {
                        star: 5,
                        comment: "Handles all my games smoothly!",
                        postedby: userMap['jane.smith@example.com']
                    },
                    {
                        star: 4,
                        comment: "Great laptop but a bit heavy.",
                        postedby: userMap['alice.johnson@example.com']
                    }
                ],
                totalrating: "4.6",
            },
            {
                title: "4K Ultra HD TV",
                slug: "4k-ultra-hd-tv",
                description: "A stunning 4K Ultra HD TV with vibrant colors and clarity.",
                price: 899,
                category: "Home Entertainment",
                brand: "ViewTech",
                quantity: 80,
                sold: 40,
                images: ["4k-tv1.jpg", "4k-tv2.jpg"],
                color: ["Black"],
                tags: "tv,4k,home-entertainment",
                ratings: [
                    {
                        star: 5,
                        comment: "Incredible picture quality!",
                        postedby: userMap['jane.smith@example.com']
                    },
                    {
                        star: 4,
                        comment: "Great TV but the remote could be better.",
                        postedby: userMap['alice.johnson@example.com']
                    }
                ],
                totalrating: "4.5",
            },
            {
                title: "Smartwatch Pro",
                slug: "smartwatch-pro",
                description: "A stylish smartwatch with fitness tracking and notifications.",
                price: 299,
                category: "Wearables",
                brand: "WristTech",
                quantity: 150,
                sold: 60,
                images: ["smartwatch-pro1.jpg", "smartwatch-pro2.jpg"],
                color: ["Silver", "Gold"],
                tags: "smartwatch,fitness,wearable",
                ratings: [
                    {
                        star: 4,
                        comment: "Very useful for tracking my workouts.",
                        postedby: userMap['bob.brown@example.com']
                    },
                    {
                        star: 5,
                        comment: "Love the design and features.",
                        postedby: userMap['charlie.davis@example.com']
                    }
                ],
                totalrating: "4.7",
            },
            {
                title: "Electric Scooter",
                slug: "electric-scooter",
                description: "A convenient electric scooter with long battery life.",
                price: 499,
                category: "Transport",
                brand: "EcoRide",
                quantity: 70,
                sold: 25,
                images: ["electric-scooter1.jpg", "electric-scooter2.jpg"],
                color: ["Black", "White"],
                tags: "scooter,electric,transport",
                ratings: [
                    {
                        star: 5,
                        comment: "Perfect for my daily commute!",
                        postedby: userMap['bob.brown@example.com']
                    },
                    {
                        star: 4,
                        comment: "Good speed and battery life.",
                        postedby: userMap['charlie.davis@example.com']
                    }
                ],
                totalrating: "4.6",
            },
            {
                title: "Bluetooth Speaker",
                slug: "bluetooth-speaker",
                description: "A portable Bluetooth speaker with powerful sound.",
                price: 129,
                category: "Audio",
                brand: "SoundBlast",
                quantity: 120,
                sold: 90,
                images: ["bluetooth-speaker1.jpg", "bluetooth-speaker2.jpg"],
                color: ["Blue", "Black"],
                tags: "speaker,bluetooth,audio",
                ratings: [
                    {
                        star: 5,
                        comment: "Amazing sound quality for its size.",
                        postedby: userMap['diana.miller@example.com']
                    },
                    {
                        star: 4,
                        comment: "Easy to carry around.",
                        postedby: userMap['ethan.wilson@example.com']
                    }
                ],
                totalrating: "4.7",
            },
            {
                title: "Digital Camera",
                slug: "digital-camera",
                description: "A high-resolution digital camera with advanced features.",
                price: 799,
                category: "Photography",
                brand: "CapturePro",
                quantity: 60,
                sold: 20,
                images: ["digital-camera1.jpg", "digital-camera2.jpg"],
                color: ["Black"],
                tags: "camera,digital,photography",
                ratings: [
                    {
                        star: 4,
                        comment: "Great camera for both beginners and professionals.",
                        postedby: userMap['diana.miller@example.com']
                    },
                    {
                        star: 5,
                        comment: "Amazing picture quality!",
                        postedby: userMap['ethan.wilson@example.com']
                    }
                ],
                totalrating: "4.8",
            },
            {
                title: "Fitness Tracker",
                slug: "fitness-tracker",
                description: "A fitness tracker with heart rate monitoring and GPS.",
                price: 99,
                category: "Wearables",
                brand: "FitLife",
                quantity: 180,
                sold: 100,
                images: ["fitness-tracker1.jpg", "fitness-tracker2.jpg"],
                color: ["Black", "Pink"],
                tags: "fitness,tracker,wearable",
                ratings: [
                    {
                        star: 4,
                        comment: "Accurate and easy to use.",
                        postedby: userMap['fiona.moore@example.com']
                    },
                    {
                        star: 5,
                        comment: "Keeps me motivated to stay active.",
                        postedby: userMap['george.taylor@example.com']
                    }
                ],
                totalrating: "4.7",
            },
            {
                title: "Robot Vacuum Cleaner",
                slug: "robot-vacuum-cleaner",
                description: "A smart robot vacuum cleaner with powerful suction.",
                price: 399,
                category: "Home Appliances",
                brand: "CleanBot",
                quantity: 90,
                sold: 40,
                images: ["robot-vacuum1.jpg", "robot-vacuum2.jpg"],
                color: ["White", "Black"],
                tags: "vacuum,robot,cleaning",
                ratings: [
                    {
                        star: 5,
                        comment: "Cleans my house effortlessly!",
                        postedby: userMap['fiona.moore@example.com']
                    },
                    {
                        star: 4,
                        comment: "Very efficient and quiet.",
                        postedby: userMap['george.taylor@example.com']
                    }
                ],
                totalrating: "4.6",
            },
            {
                title: "Smart Home Hub",
                slug: "smart-home-hub",
                description: "Central hub for all your smart home devices.",
                price: 129,
                category: "Home Automation",
                brand: "SmartLiving",
                quantity: 150,
                sold: 50,
                images: ["smart-home-hub1.jpg", "smart-home-hub2.jpg"],
                color: ["White", "Gray"],
                tags: "smart home,hub,automation",
                ratings: [
                    {
                        star: 5,
                        comment: "Makes managing smart devices so easy!",
                        postedby: userMap['george.taylor@example.com']
                    },
                    {
                        star: 4,
                        comment: "Great product but a bit pricey.",
                        postedby: userMap['hannah.anderson@example.com']
                    }
                ],
                totalrating: "4.7",
            },
            {
                title: "Portable Projector",
                slug: "portable-projector",
                description: "Compact projector for movies on the go.",
                price: 299,
                category: "Electronics",
                brand: "MovieTime",
                quantity: 80,
                sold: 30,
                images: ["portable-projector1.jpg", "portable-projector2.jpg"],
                color: ["Black"],
                tags: "projector,portable,home theater",
                ratings: [
                    {
                        star: 4,
                        comment: "Perfect for outdoor movie nights!",
                        postedby: userMap['hannah.anderson@example.com']
                    },
                    {
                        star: 3,
                        comment: "Good quality but could be brighter.",
                        postedby: userMap['bob.brown@example.com']
                    }
                ],
                totalrating: "3.8",
            },
            {
                title: "Electric Kettle",
                slug: "electric-kettle",
                description: "Fast boiling electric kettle with temperature control.",
                price: 49,
                category: "Kitchen Appliances",
                brand: "HeatWave",
                quantity: 100,
                sold: 60,
                images: ["electric-kettle1.jpg", "electric-kettle2.jpg"],
                color: ["Silver", "Black"],
                tags: "kettle,electric,boiling",
                ratings: [
                    {
                        star: 5,
                        comment: "Boils water in no time!",
                        postedby: userMap['bob.brown@example.com']
                    },
                    {
                        star: 4,
                        comment: "Very efficient and stylish.",
                        postedby: userMap['diana.miller@example.com']
                    }
                ],
                totalrating: "4.6",
            },
            {
                title: "Wireless Charger",
                slug: "wireless-charger",
                description: "Fast wireless charger compatible with all devices.",
                price: 29,
                category: "Accessories",
                brand: "ChargeTech",
                quantity: 200,
                sold: 100,
                images: ["wireless-charger1.jpg", "wireless-charger2.jpg"],
                color: ["Black", "White"],
                tags: "charger,wireless,fast charging",
                ratings: [
                    {
                        star: 5,
                        comment: "Charges my phone super fast!",
                        postedby: userMap['diana.miller@example.com']
                    },
                    {
                        star: 4,
                        comment: "Very convenient and sleek.",
                        postedby: userMap['alice.johnson@example.com']
                    }
                ],
                totalrating: "4.7",
            },
            {
                title: "Fitness Dumbbells",
                slug: "fitness-dumbbells",
                description: "Adjustable weight dumbbells for home workouts.",
                price: 99,
                category: "Fitness",
                brand: "FitGear",
                quantity: 120,
                sold: 70,
                images: ["fitness-dumbbells1.jpg", "fitness-dumbbells2.jpg"],
                color: ["Black"],
                tags: "dumbbells,fitness,home workout",
                ratings: [
                    {
                        star: 4,
                        comment: "Great for my home gym!",
                        postedby: userMap['diana.miller@example.com']
                    },
                    {
                        star: 5,
                        comment: "Very versatile and well-made.",
                        postedby: userMap['alice.johnson@example.com']
                    }
                ],
                totalrating: "4.8",
            },
            {
                title: "Smart Thermostat",
                slug: "smart-thermostat",
                description: "Energy-saving thermostat with remote control.",
                price: 199,
                category: "Home Automation",
                brand: "EcoHome",
                quantity: 50,
                sold: 30,
                images: ["smart-thermostat1.jpg", "smart-thermostat2.jpg"],
                color: ["White"],
                tags: "thermostat,smart,energy saving",
                ratings: [
                    {
                        star: 5,
                        comment: "Helps me save on my energy bills!",
                        postedby: userMap['diana.miller@example.com']
                    },
                    {
                        star: 4,
                        comment: "Easy to install and use.",
                        postedby: userMap['jane.smith@example.com']
                    }
                ],
                totalrating: "4.7",
            },
            {
                title: "Noise Cancelling Earbuds",
                slug: "noise-cancelling-earbuds",
                description: "Compact earbuds with active noise cancellation.",
                price: 149,
                category: "Audio",
                brand: "SoundPeace",
                quantity: 100,
                sold: 60,
                images: ["noise-cancelling-earbuds1.jpg", "noise-cancelling-earbuds2.jpg"],
                color: ["Black", "White"],
                tags: "earbuds,noise cancelling,audio",
                ratings: [
                    {
                        star: 5,
                        comment: "Blocks out all the background noise!",
                        postedby: userMap['diana.miller@example.com']
                    },
                    {
                        star: 4,
                        comment: "Great sound quality.",
                        postedby: userMap['jane.smith@example.com']
                    }
                ],
                totalrating: "4.6",
            },
            {
                title: "Electric Toothbrush",
                slug: "electric-toothbrush",
                description: "Rechargeable toothbrush with multiple modes.",
                price: 79,
                category: "Personal Care",
                brand: "CleanSmile",
                quantity: 150,
                sold: 80,
                images: ["electric-toothbrush1.jpg", "electric-toothbrush2.jpg"],
                color: ["White", "Blue"],
                tags: "toothbrush,electric,personal care",
                ratings: [
                    {
                        star: 5,
                        comment: "My teeth feel so much cleaner!",
                        postedby: userMap['john.doe@example.com']
                    },
                    {
                        star: 4,
                        comment: "Battery lasts a long time.",
                        postedby: userMap['jane.smith@example.com']
                    }
                ],
                totalrating: "4.8",
            },
            {
                title: "Smartwatch Kids",
                slug: "smartwatch-kids",
                description: "Durable smartwatch for kids with GPS tracking.",
                price: 99,
                category: "Wearables",
                brand: "KidSafe",
                quantity: 100,
                sold: 50,
                images: ["smartwatch-kids1.jpg", "smartwatch-kids2.jpg"],
                color: ["Blue", "Pink"],
                tags: "smartwatch,kids,wearable",
                ratings: [
                    {
                        star: 5,
                        comment: "Great for keeping track of my kids!",
                        postedby: userMap['bob.brown@example.com']
                    },
                    {
                        star: 4,
                        comment: "Durable and easy to use.",
                        postedby: userMap['john.doe@example.com']
                    }
                ],
                totalrating: "4.7",
            },
            {
                title: "Electric Bike",
                slug: "electric-bike",
                description: "Eco-friendly electric bike with long battery life.",
                price: 999,
                category: "Transport",
                brand: "EcoRide",
                quantity: 40,
                sold: 20,
                images: ["electric-bike1.jpg", "electric-bike2.jpg"],
                color: ["Black", "Red"],
                tags: "bike,electric,transport",
                ratings: [
                    {
                        star: 5,
                        comment: "Perfect for my daily commute!",
                        postedby: userMap['bob.brown@example.com']
                    },
                    {
                        star: 4,
                        comment: "Great speed and battery life.",
                        postedby: userMap['john.doe@example.com']
                    }
                ],
                totalrating: "4.6",
            },
            {
                title: "Home Security Camera",
                slug: "home-security-camera",
                description: "Wireless security camera with night vision.",
                price: 129,
                category: "Home Security",
                brand: "SafeHome",
                quantity: 100,
                sold: 60,
                images: ["home-security-camera1.jpg", "home-security-camera2.jpg"],
                color: ["White", "Black"],
                tags: "camera,security,home",
                ratings: [
                    {
                        star: 5,
                        comment: "Provides great peace of mind!",
                        postedby: userMap['john.doe@example.com']
                    },
                    {
                        star: 4,
                        comment: "Clear video quality.",
                        postedby: userMap['bob.brown@example.com']
                    }
                ],
                totalrating: "4.7",
            },
            {
                title: "Smart Light Bulb",
                slug: "smart-light-bulb",
                description: "Energy-efficient smart light bulb with app control.",
                price: 19,
                category: "Home Automation",
                brand: "BrightHome",
                quantity: 200,
                sold: 100,
                images: ["smart-light-bulb1.jpg", "smart-light-bulb2.jpg"],
                color: ["White"],
                tags: "light bulb,smart,energy efficient",
                ratings: [
                    {
                        star: 5,
                        comment: "Love controlling my lights from my phone!",
                        postedby: userMap['jane.smith@example.com']
                    },
                    {
                        star: 4,
                        comment: "Easy to set up and use.",
                        postedby: userMap['fiona.moore@example.com']
                    }
                ],
                totalrating: "4.8",
            },
            {
                title: "Gaming Console",
                slug: "gaming-console",
                description: "Next-gen gaming console with stunning graphics.",
                price: 499,
                category: "Gaming",
                brand: "PlayMaster",
                quantity: 70,
                sold: 40,
                images: ["gaming-console1.jpg", "gaming-console2.jpg"],
                color: ["Black"],
                tags: "console,gaming,next-gen",
                ratings: [
                    {
                        star: 5,
                        comment: "Amazing graphics and performance!",
                        postedby: userMap['jane.smith@example.com']
                    },
                    {
                        star: 4,
                        comment: "A bit pricey but worth it.",
                        postedby: userMap['fiona.moore@example.com']
                    }
                ],
                totalrating: "4.7",
            },
            {
                title: "Wireless Mouse",
                slug: "wireless-mouse",
                description: "Ergonomic wireless mouse with long battery life.",
                price: 39,
                category: "Computers",
                brand: "TechTouch",
                quantity: 150,
                sold: 90,
                images: ["wireless-mouse1.jpg", "wireless-mouse2.jpg"],
                color: ["Black", "Gray"],
                tags: "mouse,wireless,ergonomic",
                ratings: [
                    {
                        star: 5,
                        comment: "Very comfortable and responsive.",
                        postedby: userMap['fiona.moore@example.com']
                    },
                    {
                        star: 4,
                        comment: "Great battery life.",
                        postedby: userMap['jane.smith@example.com']
                    }
                ],
                totalrating: "4.6",
            }
        ];
        const insertedProducts = await Product.insertMany(products);

        const productMap = insertedProducts.reduce((map, Product) => {
            map[Product.slug] = Product._id;
            return map;
        }, {});

        const blogs = [
            {
                title: "The Future of Technology",
                description: "An in-depth look at upcoming technological advancements.",
                category: "Technology",
                numViews: 100,
                isLiked: true,
                likes: [userMap['hannah.anderson@example.com'], userMap['bob.brown@example.com']],
                dislikes: [],
                author: "John Doe",
                images: ["tech-future.jpg"],
            },
            {
                title: "10 Tips for a Healthier Lifestyle",
                description: "Simple and effective tips to improve your health and wellness.",
                category: "Health & Wellness",
                numViews: 200,
                isLiked: true,
                likes: [userMap['diana.miller@example.com'], userMap['hannah.anderson@example.com']],
                dislikes: [],
                author: "Jane Smith",
                images: ["health-tips.jpg"],
            },
            {
                title: "Top Travel Destinations for 2024",
                description: "Explore the best travel destinations for the upcoming year.",
                category: "Travel",
                numViews: 150,
                isLiked: false,
                likes: [],
                dislikes: [userMap['fiona.moore@example.com']],
                author: "Alice Johnson",
                images: ["travel-2024.jpg"],
            },
            {
                title: "Delicious and Easy Recipes for Beginners",
                description: "A collection of easy-to-follow recipes for new cooks.",
                category: "Food & Recipes",
                numViews: 300,
                isLiked: true,
                likes: [userMap['diana.miller@example.com']],
                dislikes: [],
                author: "Bob Brown",
                images: ["easy-recipes.jpg"],
            },
            {
                title: "How to Stay Productive at Home",
                description: "Tips and tricks to maintain productivity while working from home.",
                category: "Lifestyle",
                numViews: 250,
                isLiked: true,
                likes: [userMap['fiona.moore@example.com'], userMap['diana.miller@example.com']],
                dislikes: [],
                author: "Charlie Davis",
                images: ["productive-home.jpg"],
            },
            {
                title: "Managing Your Finances in 2024",
                description: "Strategies to effectively manage your finances and save money.",
                category: "Finance",
                numViews: 180,
                isLiked: false,
                likes: [],
                dislikes: [userMap['ethan.wilson@example.com']],
                author: "Diana Miller",
                images: ["finance-management.jpg"],
            },
            {
                title: "The Best Educational Apps for Kids",
                description: "A review of the top educational apps available for children.",
                category: "Education",
                numViews: 220,
                isLiked: true,
                likes: [userMap['ethan.wilson@example.com']],
                dislikes: [],
                author: "Ethan Wilson",
                images: ["educational-apps.jpg"],
            },
            {
                title: "Fashion Trends to Watch in 2024",
                description: "An overview of the latest fashion trends for the upcoming year.",
                category: "Fashion & Beauty",
                numViews: 170,
                isLiked: true,
                likes: [userMap['fiona.moore@example.com']],
                dislikes: [],
                author: "Fiona Moore",
                images: ["fashion-trends.jpg"],
            },
            {
                title: "The Impact of Sports on Mental Health",
                description: "Exploring the positive effects of sports on mental well-being.",
                category: "Sports",
                numViews: 190,
                isLiked: false,
                likes: [],
                dislikes: [userMap['george.taylor@example.com']],
                author: "George Taylor",
                images: ["sports-mental-health.jpg"],
            },
            {
                title: "The Evolution of Entertainment in the Digital Age",
                description: "How digital technologies are transforming the entertainment industry.",
                category: "Entertainment",
                numViews: 210,
                isLiked: true,
                likes: [userMap['george.taylor@example.com']],
                dislikes: [],
                author: "Hannah Anderson",
                images: ["digital-entertainment.jpg"],
            }
        ];

        const carts = [
            {
                products: [
                    {
                        product: productMap['electric-scooter'],
                        count: 2,
                        color: "Red",
                        price: 100,
                    },
                    {
                        product: productMap['bluetooth-speaker'],
                        count: 1,
                        color: "Blue",
                        price: 200,
                    }
                ],
                cartTotal: 400,
                totalAfterDiscount: 350,
                orderby: userMap['john.doe@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['electric-scooter'],
                        count: 1,
                        color: "Black",
                        price: 150,
                    },
                    {
                        product: productMap['digital-camera'],
                        count: 3,
                        color: "Green",
                        price: 50,
                    }
                ],
                cartTotal: 300,
                totalAfterDiscount: 270,
                orderby: userMap['jane.smith@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['bluetooth-speaker'],
                        count: 4,
                        color: "Gray",
                        price: 75,
                    },
                    {
                        product: productMap['digital-camera'],
                        count: 2,
                        color: "Yellow",
                        price: 120,
                    }
                ],
                cartTotal: 570,
                totalAfterDiscount: 500,
                orderby: userMap['jane.smith@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['fitness-tracker'],
                        count: 2,
                        color: "White",
                        price: 180,
                    }
                ],
                cartTotal: 360,
                totalAfterDiscount: 320,
                orderby: userMap['alice.johnson@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['robot-vacuum-cleaner'],
                        count: 1,
                        color: "Blue",
                        price: 220,
                    }
                ],
                cartTotal: 220,
                totalAfterDiscount: 200,
                orderby: userMap['alice.johnson@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['fitness-tracker'],
                        count: 5,
                        color: "Black",
                        price: 90,
                    }
                ],
                cartTotal: 450,
                totalAfterDiscount: 400,
                orderby: userMap['alice.johnson@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['robot-vacuum-cleaner'],
                        count: 3,
                        color: "Green",
                        price: 130,
                    }
                ],
                cartTotal: 390,
                totalAfterDiscount: 340,
                orderby: userMap['bob.brown@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['smart-home-hub'],
                        count: 2,
                        color: "Red",
                        price: 140,
                    },
                    {
                        product: productMap['portable-projector'],
                        count: 1,
                        color: "Blue",
                        price: 120,
                    }
                ],
                cartTotal: 400,
                totalAfterDiscount: 350,
                orderby: userMap['bob.brown@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['smart-home-hub'],
                        count: 1,
                        color: "Gray",
                        price: 160,
                    }
                ],
                cartTotal: 160,
                totalAfterDiscount: 150,
                orderby: userMap['charlie.davis@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['wireless-charger'],
                        count: 4,
                        color: "Yellow",
                        price: 110,
                    }
                ],
                cartTotal: 440,
                totalAfterDiscount: 390,
                orderby: userMap['charlie.davis@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['portable-projector'],
                        count: 2,
                        color: "Black",
                        price: 170,
                    }
                ],
                cartTotal: 340,
                totalAfterDiscount: 300,
                orderby: userMap['diana.miller@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['electric-kettle'],
                        count: 3,
                        color: "White",
                        price: 150,
                    }
                ],
                cartTotal: 450,
                totalAfterDiscount: 400,
                orderby: userMap['diana.miller@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['fitness-dumbbells'],
                        count: 2,
                        color: "Green",
                        price: 200,
                    }
                ],
                cartTotal: 400,
                totalAfterDiscount: 350,
                orderby: userMap['ethan.wilson@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['smart-thermostat'],
                        count: 1,
                        color: "Red",
                        price: 190,
                    },
                    {
                        product: productMap['noise-cancelling-earbuds'],
                        count: 2,
                        color: "Blue",
                        price: 80,
                    }
                ],
                cartTotal: 350,
                totalAfterDiscount: 300,
                orderby: userMap['ethan.wilson@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['smart-thermostat'],
                        count: 4,
                        color: "Black",
                        price: 60,
                    }
                ],
                cartTotal: 240,
                totalAfterDiscount: 220,
                orderby: userMap['fiona.moore@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['noise-cancelling-earbuds'],
                        count: 1,
                        color: "Gray",
                        price: 200,
                    },
                    {
                        product: productMap['electric-toothbrush'],
                        count: 3,
                        color: "Yellow",
                        price: 100,
                    }
                ],
                cartTotal: 500,
                totalAfterDiscount: 450,
                orderby: userMap['fiona.moore@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['electric-toothbrush'],
                        count: 2,
                        color: "White",
                        price: 210,
                    }
                ],
                cartTotal: 420,
                totalAfterDiscount: 380,
                orderby: userMap['hannah.anderson@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['smartwatch-kids'],
                        count: 1,
                        color: "Black",
                        price: 180,
                    }
                ],
                cartTotal: 180,
                totalAfterDiscount: 160,
                orderby: userMap['hannah.anderson@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['smartwatch-kids'],
                        count: 3,
                        color: "Green",
                        price: 140,
                    }
                ],
                cartTotal: 420,
                totalAfterDiscount: 380,
                orderby: userMap['george.taylor@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['electric-bike'],
                        count: 2,
                        color: "Red",
                        price: 100,
                    }
                ],
                cartTotal: 200,
                totalAfterDiscount: 180,
                orderby: userMap['george.taylor@example.com'],
            }
        ];

        const orders = [
            {
                products: [
                    {
                        product: productMap['electric-bike'],
                        count: 2,
                        color: "Red",
                    },
                    {
                        product: productMap['smartwatch-kids'],
                        count: 1,
                        color: "Blue",
                    }
                ],
                paymentIntent: {
                    id: "pi_1GqIC8HYgolSBA35r0nprnHw",
                    amount: 5000,
                    currency: "usd",
                    status: "succeeded",
                },
                orderStatus: "Processing",
                orderby: userMap['hannah.anderson@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['electric-toothbrush'],
                        count: 1,
                        color: "Black",
                    },
                    {
                        product: productMap['smart-thermostat'],
                        count: 3,
                        color: "Green",
                    }
                ],
                paymentIntent: {
                    id: "pi_1GqIC9HYgolSBA35r0nprnHy",
                    amount: 3000,
                    currency: "usd",
                    status: "succeeded",
                },
                orderStatus: "Dispatched",
                orderby: userMap['fiona.moore@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['smart-thermostat'],
                        count: 4,
                        color: "Gray",
                    },
                    {
                        product: productMap['fitness-dumbbells'],
                        count: 2,
                        color: "Yellow",
                    }
                ],
                paymentIntent: {
                    id: "pi_1GqICAHYgolSBA35r0nprnHz",
                    amount: 5700,
                    currency: "usd",
                    status: "succeeded",
                },
                orderStatus: "Delivered",
                orderby: userMap['fiona.moore@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['fitness-dumbbells'],
                        count: 2,
                        color: "White",
                    }
                ],
                paymentIntent: {
                    id: "pi_1GqICBHYgolSBA35r0nprnI0",
                    amount: 3600,
                    currency: "usd",
                    status: "succeeded",
                },
                orderStatus: "Cancelled",
                orderby: userMap['ethan.wilson@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['wireless-charger'],
                        count: 1,
                        color: "Blue",
                    }
                ],
                paymentIntent: {
                    id: "pi_1GqICCHYgolSBA35r0nprnI1",
                    amount: 2200,
                    currency: "usd",
                    status: "succeeded",
                },
                orderStatus: "Cash on Delivery",
                orderby: userMap['ethan.wilson@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['electric-kettle'],
                        count: 5,
                        color: "Black",
                    }
                ],
                paymentIntent: {
                    id: "pi_1GqICDHYgolSBA35r0nprnI2",
                    amount: 4500,
                    currency: "usd",
                    status: "succeeded",
                },
                orderStatus: "Not Processed",
                orderby: userMap['john.doe@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['portable-projector'],
                        count: 3,
                        color: "Green",
                    }
                ],
                paymentIntent: {
                    id: "pi_1GqICEHYgolSBA35r0nprnI3",
                    amount: 3900,
                    currency: "usd",
                    status: "succeeded",
                },
                orderStatus: "Processing",
                orderby: userMap['john.doe@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['smart-home-hub'],
                        count: 2,
                        color: "Red",
                    },
                    {
                        product: productMap['robot-vacuum-cleaner'],
                        count: 1,
                        color: "Blue",
                    }
                ],
                paymentIntent: {
                    id: "pi_1GqICFHYgolSBA35r0nprnI4",
                    amount: 4000,
                    currency: "usd",
                    status: "succeeded",
                },
                orderStatus: "Dispatched",
                orderby: userMap['jane.smith@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['fitness-tracker'],
                        count: 1,
                        color: "Gray",
                    }
                ],
                paymentIntent: {
                    id: "pi_1GqICGHYgolSBA35r0nprnI5",
                    amount: 1600,
                    currency: "usd",
                    status: "succeeded",
                },
                orderStatus: "Delivered",
                orderby: userMap['jane.smith@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['digital-camera'],
                        count: 4,
                        color: "Yellow",
                    }
                ],
                paymentIntent: {
                    id: "pi_1GqICHYgolSBA35r0nprnI6",
                    amount: 4400,
                    currency: "usd",
                    status: "succeeded",
                },
                orderStatus: "Cancelled",
                orderby: userMap['alice.johnson@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['digital-camera'],
                        count: 2,
                        color: "Black",
                    }
                ],
                paymentIntent: {
                    id: "pi_1GqICIHYgolSBA35r0nprnI7",
                    amount: 3400,
                    currency: "usd",
                    status: "succeeded",
                },
                orderStatus: "Cash on Delivery",
                orderby: userMap['hannah.anderson@example.com'],
            },
            {
                products: [
                    {
                        product: productMap['bluetooth-speaker'],
                        count: 3,
                        color: "White",
                    }
                ],
                paymentIntent: {
                    id: "pi_1GqICJHYgolSBA35r0nprnI8",
                    amount: 4500,
                    currency: "usd",
                    status: "succeeded",
                },
                orderStatus: "Not Processed",
                orderby: userMap['george.taylor@example.com'],
            }
        ];

        await Category.insertMany(categories);
        await BlogCategories.insertMany(blogCategories);
        await Blog.insertMany(blogs);
        await Brand.insertMany(brands);
        await Color.insertMany(colors);
        await Coupon.insertMany(coupons);
        await Cart.insertMany(carts);
        await Enquiry.insertMany(enquiries);
        await Order.insertMany(orders);
        console.log('Data seeded successfully');

        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
        process.exit(1);
    }
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports = seedData;