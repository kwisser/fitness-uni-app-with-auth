import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const ADD_FOOD_URL = '/fitness/food/';

const FoodFormComponent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        baseAmount: 0,
        energy: 0,
        fat: 0,
        carbohydrates: 0,
        protein: 0,
        salt: 0,
        fiber: 0,
        drink: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                ADD_FOOD_URL, JSON.stringify(formData),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    maxBodyLength: Infinity
                }
            );

            console.log(JSON.stringify(response.data));
            navigate('/food');
            navigate(0)
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Base Amount:</label>
                <input
                    type="number"
                    name="baseAmount"
                    value={formData.baseAmount}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Energy:</label>
                <input
                    type="number"
                    name="energy"
                    value={formData.energy}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Fat:</label>
                <input
                    type="number"
                    name="fat"
                    value={formData.fat}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Carbohydrates:</label>
                <input
                    type="number"
                    name="carbohydrates"
                    value={formData.carbohydrates}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Protein:</label>
                <input
                    type="number"
                    name="protein"
                    value={formData.protein}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Salt:</label>
                <input
                    type="number"
                    name="salt"
                    value={formData.salt}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Fiber:</label>
                <input
                    type="number"
                    name="fiber"
                    value={formData.fiber}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Drink:</label>
                <input
                    type="checkbox"
                    name="drink"
                    checked={formData.drink}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FoodFormComponent;
