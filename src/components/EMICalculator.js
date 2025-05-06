import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEMIData } from "../context/EMIDataContext";

const EMICalculator = () => {
  const { setEmiData } = useEMIData(); 
  const navigate = useNavigate();

  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");

  const [emi, setEmi] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {

    if (!principal || !interestRate || !tenure) {
      setError("Please fill in all fields.");
      return;
    }

    if (isNaN(principal) || isNaN(interestRate) || isNaN(tenure)) {
      setError("Please enter valid numeric values.");
      return;
    }

    const P = parseFloat(principal);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseInt(tenure);

    if (P <= 0 || R <= 0 || N <= 0) {
      setError("All values must be greater than zero.");
      return;
    }

    const emiVal = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiVal.toFixed(2));
    setError("");

    setEmiData({
      principal: P,
      interestRate: parseFloat(interestRate),
      tenure: N,
      monthlyEmi: emiVal.toFixed(2),
    });
  };

  const goToAmortization = () => {
    if (emi) {
      navigate("/amortization");
    } else {
      setError("Please calculate EMI before proceeding.");
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Loan EMI Calculator
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Loan Amount (₹)"
            fullWidth
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            type="number"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Interest Rate (% per annum)"
            fullWidth
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            type="number"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Tenure (months)"
            fullWidth
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            type="number"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button variant="contained" onClick={handleCalculate} fullWidth>
            Calculate EMI
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            onClick={goToAmortization}
            disabled={!emi}
            fullWidth
          >
            View Amortization
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {emi && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6">
            Your Monthly EMI: ₹{emi}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default EMICalculator;
