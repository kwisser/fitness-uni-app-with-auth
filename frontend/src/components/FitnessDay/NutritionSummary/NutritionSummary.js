import React from 'react';
import { Typography, Box, styled, useTheme } from '@mui/material';
import CaloriesPieChart from '../FitnessDayActivities/CaloriesPieChart';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    flex-direction: row;
  }
`;

const NutritionSummary = ({
    caloriesNeeded, caloriesReached,
    proteinNeeded, proteinReached,
    fatNeeded, fatReached,
    carbsNeeded, carbsReached
}) => {
    const theme = useTheme();

    const caloriesBalance = caloriesReached - caloriesNeeded;
    const proteinBalance = proteinReached - proteinNeeded;
    const fatBalance = fatReached - fatNeeded;
    const carbsBalance = carbsReached - carbsNeeded;

    const balanceText = balance => {
        if (balance > 0) return `Überschuss: ${balance.toFixed(2)}`;
        if (balance < 0) return `Defizit: ${Math.abs(balance).toFixed(2)}`;
        return `Gleichgewicht`;
    };

    return (
        <Container theme={theme}>
            <Box>
                <Typography variant="body1">Sie benötigen heute {caloriesNeeded} Kalorien.</Typography>
                <Typography variant="body1">Bisher gegessene {caloriesReached} Kalorien.</Typography>
                <Typography variant="body1">Kalorien {balanceText(caloriesBalance)} kcal</Typography>
                <div style={{ width: '200px', height: '200px' }}>
                    <CaloriesPieChart key={caloriesReached} consumed={caloriesReached} total={caloriesNeeded} />
                </div>
            </Box>
            <Box>
                <Typography variant="body1">Protein benötigt: {proteinNeeded.toFixed(2)}g</Typography>
                <Typography variant="body1">Protein heute bisher gegessen: {proteinReached.toFixed(2)}g</Typography>
                <Typography variant="body1">Protein {balanceText(proteinBalance)} g</Typography>
                <div style={{ width: '200px', height: '200px' }}>
                    <CaloriesPieChart key={proteinReached} consumed={proteinReached} total={proteinNeeded} />
                </div>
            </Box>
            <Box>
                <Typography variant="body1">Fett benötigt: {fatNeeded.toFixed(2)}g</Typography>
                <Typography variant="body1">Fett heute bisher gegessen: {fatReached.toFixed(2)}g</Typography>
                <Typography variant="body1">Fett {balanceText(fatBalance)} g</Typography>
                <div style={{ width: '200px', height: '200px' }}>
                    <CaloriesPieChart key={fatReached} consumed={fatReached} total={fatNeeded} />
                </div>
            </Box>
            <Box>
                <Typography variant="body1">Kohlenhydrate benötigt: {carbsNeeded.toFixed(2)}g</Typography>
                <Typography variant="body1">Kohlenhydrate heute bisher gegessen: {carbsReached.toFixed(2)}g</Typography>
                <Typography variant="body1">Kohlenhydrate {balanceText(carbsBalance)} g</Typography>
                <div style={{ width: '200px', height: '200px' }}>
                    <CaloriesPieChart key={carbsReached} consumed={carbsReached} total={carbsNeeded} />
                </div>
            </Box>
        </Container>
    );
};

export default NutritionSummary;