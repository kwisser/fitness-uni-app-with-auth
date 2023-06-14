import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faDumbbell, faBullseye, faUtensils, faTint, faLeaf, faEdit, faTrash, faAd } from '@fortawesome/free-solid-svg-icons';
import { Card, CardActions, CardContent, Button, Typography, Box } from '@mui/material';
import './FoodItem.css';

const FoodItemActivity = ({ food, onDelete, onEdit }) => {

    const availableFood = useSelector(state => state.availableFood);
    const [fullFoodData, setFullFoodData] = useState(food);

    useEffect(() => {
        const foodData = availableFood.find(item => item._id === food.foodId);
        if (foodData) {
            setFullFoodData({ ...food, ...foodData });
        }
    }, [availableFood, food]);
    const handleEdit = () => {
        onEdit(food._id);
    };

    const handleDelete = async () => {
        onDelete(fullFoodData._id);
    };

    const displayAmount = (value) => {
        return value * fullFoodData.amount;
    };

    console.log("fullFoodData: ", fullFoodData);
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
                        {fullFoodData.amount}
                    </Box>
                </Typography>
            </CardContent>
            <CardActions>
                {fullFoodData.amount && (
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