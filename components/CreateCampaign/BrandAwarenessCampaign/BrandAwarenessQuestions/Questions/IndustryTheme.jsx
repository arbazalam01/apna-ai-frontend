import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  CircularProgress,
  Alert,
  Select,
  MenuItem
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const IndustryTheme = () => {
  const { companyId } = useParams();
  const [segments, setSegments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState("");

  const methods = useFormContext();
  const { control, setValue, watch } = methods;

  useEffect(() => {
    const fetchUserSegments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `http://localhost:3000/usersegments/getUserSegments/${companyId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setSegments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchUserSegments();
    }
  }, [companyId]);

  const handleSegmentChange = (event) => {
    setSelectedSegment(event.target.value);
    setValidationError(null);
    setValue("selectsegments", []); // Clear previous selections when changing segments
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">
          Please try again later
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '800px' }}>
      <Paper elevation={0}>
        <Typography variant="h6" gutterBottom>
          Select Audience Insights
        </Typography>

        {validationError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {validationError}
          </Alert>
        )}

        <Select
          value={selectedSegment}
          onChange={handleSegmentChange}
          displayEmpty
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Select a Segment
          </MenuItem>
          {segments.map((segment) => (
            <MenuItem key={segment._id} value={segment.name}>
              {segment.name}
            </MenuItem>
          ))}
        </Select>

        {selectedSegment && (
          <FormGroup>
            {segments
              .find((segment) => segment.name === selectedSegment)
              ?.segments.map((seg, index) => (
                <FormControlLabel
                  key={`${selectedSegment}-${index}`}
                  control={
                    <Controller
                      name="selectsegments"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          checked={(field.value || []).some(item => item.Title === seg.Title)}
                          onChange={(e) => {
                            const checkedValue = e.target.checked;
                            const currentValue = field.value || [];
                            let updatedValue;

                            if (checkedValue) {
                              // Add entire segment object to selections
                              updatedValue = [...currentValue, seg];
                            } else {
                              // Remove the segment object from selections
                              updatedValue = currentValue.filter(item => item.Title !== seg.Title);
                            }

                            field.onChange(updatedValue);
                          }}
                        />
                      )}
                    />
                  }
                  label={<Typography variant="body2">{seg.Title}</Typography>}
                  sx={{ mt: 1.5, py: 0.5, px: 1, mx: 0 }}
                />
              ))}
          </FormGroup>
        )}
      </Paper>
    </Box>
  );
};

export default IndustryTheme;
