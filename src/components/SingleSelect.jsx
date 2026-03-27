import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

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
}) => {
  return (
    <>
      <FormControl fullWidth error={error}>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
          labelId={`${name}-label`}
          value={value}
          onChange={onChange}
          label={label}
          name={name}
          disabled={disabled}
          sx={{ height: customHeight || "" }}
        >
          {options.map((option) => (
            <MenuItem key={option.name} name={option.name} value={option.name}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};
