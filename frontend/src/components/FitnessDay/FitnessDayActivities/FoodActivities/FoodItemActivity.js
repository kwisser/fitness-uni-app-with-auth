import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faSave, faDumbbell, faBullseye, faUtensils, faTint, faLeaf, faEdit, faTrash, faAd } from '@fortawesome/free-solid-svg-icons';
import { Card, CardActions, CardContent, Button, Typography, Box } from '@mui/material';
import '../../../FitnessFood/FoodItem/FoodItem.css';

const FoodItemActivity = ({ food, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedFood, setEditedFood] = useState({ ...food });

    const availableFood = useSelector(state => state.availableFood);
    const [fullFoodData, setFullFoodData] = useState(food);

    useEffect(() => {
        const foodData = availableFood.find(item => item._id === food.foodId);
        if (foodData) {
            setFullFoodData({ ...food, ...foodData });
            setEditedFood({ ...food, ...foodData }); // set editedFood when fullFoodData is set
        }
    }, [availableFood, food]);

    const handleInputChange = (e) => {
        const { value } = e.target;
        setEditedFood((prevFood) => ({
            ...prevFood,
            amount: value
        }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(editedFood._id, editedFood); // Aufruf der onEdit-Funktion in der übergeordneten Komponente
        setIsEditing(false);
    };

    const handleDelete = async () => {
        onDelete(fullFoodData._id);
    };

    const displayAmount = (value) => {
        return value * editedFood.amount;
    };


    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {fullFoodData.name}
                </Typography>
                <Typography variant="body2">
                    <FontAwesomeIcon icon={faFire} className="fire-icon" />
                    <Box component="span" sx={{ marginLeft: '0.5rem' }}>
                        {displayAmount(fullFoodData.carbohydrates)} Calories
                    </Box>
                </Typography>
                <Typography variant="body2">
                    <FontAwesomeIcon icon={faDumbbell} className="dumbbell-icon" /> 'Protein:
                    <Box component="span" sx={{ marginLeft: '0.5rem' }}>
                        {displayAmount(fullFoodData.protein)}
                    </Box>
                </Typography>
                <Typography variant="body2">
                    <FontAwesomeIcon icon={faBullseye} className="bullseye-icon" /> Carbs:
                    <Box component="span" sx={{ marginLeft: '0.5rem' }}>
                        {displayAmount(fullFoodData.carbohydrates)}
                    </Box>
                </Typography>
                <Typography variant="body2">
                    <FontAwesomeIcon icon={faUtensils} className="utensils-icon" /> Fat
                    <Box component="span" sx={{ marginLeft: '0.5rem' }}>
                        {displayAmount(fullFoodData.fat)}
                    </Box>
                </Typography>
                <Typography variant="body2">
                    <FontAwesomeIcon icon={faTint} className="tint-icon" /> Energy
                    <Box component="span" sx={{ marginLeft: '0.5rem' }}>
                        {displayAmount(fullFoodData.energy)}
                    </Box>
                </Typography>
                <Typography variant="body2">
                    <FontAwesomeIcon icon={faLeaf} className="leaf-icon" /> Salt
                    <Box component="span" sx={{ marginLeft: '0.5rem' }}>
                        {displayAmount(fullFoodData.salt)}
                    </Box>
                </Typography>

                <Typography variant="body2">
                    <FontAwesomeIcon icon={faAd} className="faAd" /> Amount
                    <Box component="span" sx={{ marginLeft: '0.5rem' }}>
                        {isEditing ? (
                            <input
                                type="number"
                                name="amount"
                                value={editedFood.amount}
                                onChange={handleInputChange}
                                className="food-input"
                            />
                        ) : (
                            editedFood.amount
                        )}
                    </Box>
                </Typography>
            </CardContent>
            <CardActions>
                {isEditing ? (
                    <Button size="small" onClick={handleSave}>
                        <FontAwesomeIcon icon={faSave} />
                    </Button>
                ) : (
                    <>
                        <Button size="small" onClick={handleEdit}>
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button size="small" onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
};

export default FoodItemActivity;