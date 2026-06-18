import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const SingleSelect = ({
  name,
  label,
  value,
  onChange,
  options = [],
  error = false,
  helperText = "",
  disabled,
  customHeight,

  
  showAdd = false,
  onAddClick,
  addLabel = "Add New",
}) => {
  return (
    <FormControl fullWidth error={error}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>

      <Select
        size="small"
        labelId={`${name}-label`}
        value={value}
        onChange={onChange}
        label={label}
        name={name}
        disabled={disabled}
        sx={{ height: customHeight || "" }}
      >
        {options.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.value}
          </MenuItem>
        ))}

        
        {showAdd && (
          <MenuItem disableRipple>
            <Box
              onClick={(e) => {
                e.stopPropagation();
                onAddClick?.();
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "primary.main",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <AddIcon fontSize="small" />
              {addLabel}
            </Box>
          </MenuItem>
        )}
      </Select>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
