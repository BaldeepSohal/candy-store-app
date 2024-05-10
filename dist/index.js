"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const customers = [
    { id: 1, name: 'Baldeep' },
    { id: 2, name: 'Max' },
];
app.get('/', (req, res) => {
    res.send('Candy Store App!');
});
app.get('/api/customers', (req, res) => {
    res.send('Candy Store App');
});
app.get('/api/customers/:id', (req, res) => {
    res.send(req.query);
});
app.post('/api/customers', [
    (0, express_validator_1.body)("name").notEmpty().isLength({ min: 3, max: 10 }).trim(),
], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const customer = {
        id: customers.length + 1,
        name: req.body.name
    };
    customers.push(customer);
    res.send(customer);
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
