import React from 'react';
import { Typography, Grid, styled, useTheme } from '@mui/material';
import CaloriesPieChart from '../FitnessDayActivities/CaloriesPieChart';

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Sie benötigen heute {caloriesNeeded} Kalorien.</Typography>
                    <Typography variant="body2">Bisher gegessene {caloriesReached} Kalorien.</Typography>
                    <Typography variant="body2">Kalorien {balanceText(caloriesBalance)} kcal</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div style={{ width: '200px', height: '200px' }}>
                        <CaloriesPieChart key={caloriesReached} consumed={caloriesReached} total={caloriesNeeded} />
                    </div>
                </Grid>

                {/* Protein section */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="body2">Protein benötigt: {proteinNeeded.toFixed(2)}g</Typography>
                    <Typography variant="body2">Protein heute bisher gegessen: {proteinReached.toFixed(2)}g</Typography>
                    <Typography variant="body2">Protein {balanceText(proteinBalance)} g</Typography>
                    <div style={{ width: '200px', height: '200px' }}>
                        <CaloriesPieChart key={proteinReached} consumed={proteinReached} total={proteinNeeded} />
                    </div>
                </Grid>

                {/* Fat section */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="body2">Fett benötigt: {fatNeeded.toFixed(2)}g</Typography>
                    <Typography variant="body2">Fett heute bisher gegessen: {fatReached.toFixed(2)}g</Typography>
                    <Typography variant="body2">Fett {balanceText(fatBalance)} g</Typography>
                    <div style={{ width: '200px', height: '200px' }}>
                        <CaloriesPieChart key={fatReached} consumed={fatReached} total={fatNeeded} />
                    </div>
                </Grid>

                {/* Carbs section */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="body2">Kohlenhydrate benötigt: {carbsNeeded.toFixed(2)}g</Typography>
                    <Typography variant="body2">Kohlenhydrate heute bisher gegessen: {carbsReached.toFixed(2)}g</Typography>
                    <Typography variant="body2">Kohlenhydrate {balanceText(carbsBalance)} g</Typography>
                    <div style={{ width: '200px', height: '200px' }}>
                        <CaloriesPieChart key={carbsReached} consumed={carbsReached} total={carbsNeeded} />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default NutritionSummary;