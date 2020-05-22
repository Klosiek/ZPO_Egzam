const { day } = require('./index');

const doc = [
    {
        "_id": "5ec7f5306dcc0737000ed1de",
        "time": 17,
        "price": 54,
        "pizzas": [
            {
                "_id": "5ec7f52c6dcc0737000ed1d7",
                "name": "Deep Dish Tandoori",
                "ingredients": " Parmesan, Roasted Red Peppers, Salmon, Smoked Salmon",
                "price": 27
            },
            {
                "_id": "5ec7f52d6dcc0737000ed1da",
                "name": "Deep Dish Tandoori",
                "ingredients": " Parmesan, Roasted Red Peppers, Salmon, Smoked Salmon",
                "price": 27
            }
        ],
        "__v": 0
    },
    {
        "_id": "5ec7fb6d282ff841a883c918",
        "time": 18,
        "price": 76,
        "pizzas": [
            {
                "_id": "5ec7fb68282ff841a883c90c",
                "name": "Gluten Free",
                "ingredients": "Mozzarella Cheese, Spinach, Crab",
                "price": 25
            },
            {
                "_id": "5ec7fb69282ff841a883c90f",
                "name": "Deep Dish Tandoori",
                "ingredients": " Parmesan, Roasted Red Peppers, Salmon, Smoked Salmon",
                "price": 27
            },
            {
                "_id": "5ec7fb6a282ff841a883c913",
                "name": "Wood-fired Pesto",
                "ingredients": "Goat Cheese, Fresh Jalapenos, Chicken",
                "price": 24
            }
        ],
        "__v": 0
    },
    {
        "_id": "5ec7fb75282ff841a883c928",
        "time": 18,
        "price": 93,
        "pizzas": [
            {
                "_id": "5ec7fb70282ff841a883c91c",
                "name": "Thin & Crispy Alfredo",
                "ingredients": "Parmesan, Provolone, Roasted Mushrooms, Green Onions, Roasted Eggplant, Cashews, Lobster",
                "price": 31
            },
            {
                "_id": "5ec7fb71282ff841a883c91f",
                "name": "Thin & Crispy Alfredo",
                "ingredients": "Parmesan, Provolone, Roasted Mushrooms, Green Onions, Roasted Eggplant, Cashews, Lobster",
                "price": 31
            },
            {
                "_id": "5ec7fb72282ff841a883c923",
                "name": "Thin & Crispy Alfredo",
                "ingredients": "Parmesan, Provolone, Roasted Mushrooms, Green Onions, Roasted Eggplant, Cashews, Lobster",
                "price": 31
            }
        ],
        "__v": 0
    }
]

const array = day(doc);
const outcome = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 54, 169, 0, 0, 0, 0, 0]

test('Should output array od days with earned money for each day', () => {
    expect(array).toMatchObject(outcome);
});