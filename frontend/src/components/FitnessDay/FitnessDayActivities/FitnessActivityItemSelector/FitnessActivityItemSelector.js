import { Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';

const FitnessActivityItemSelector = ({ items, label, newItem, setNewItem, quantity, setQuantity, onSubmit, onAddItem, showOptions }) => {

    return (
        <>
            {showOptions ? (
                <div style={{ marginBottom: '1rem' }}>
                    <FormControl fullWidth>
                        <InputLabel id={`${label}-label`}>{label}</InputLabel>
                        <Select
                            labelId={`${label}-label`}
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            defaultValue={""}
                        >
                            {items.map(item => (
                                <MenuItem key={item._id} value={item}>
                                    {item.name} - {label === 'Übung auswählen'
                                        ? `Dauer: ${item.baseTime} Minuten, Kalorien: ${item.energyBurned}`
                                        : `Kalorien: ${item.energy}, Protein: ${item.protein}`
                                    }
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField
                            label={label === 'Übung auswählen' ? "Dauer (in Minuten)" : "Menge"}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            style={{ marginTop: '1rem' }}
                        />
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={onSubmit}>Speichern</Button>
                </div>
            ) : (
                <Button variant="contained" color="primary" onClick={onAddItem}>{`${label.split(' ')[0]} hinzufügen`}</Button>
            )}
        </>
    );
};

export default FitnessActivityItemSelector;
