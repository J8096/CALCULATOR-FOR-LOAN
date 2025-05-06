import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TablePagination,
} from "@mui/material";
import { useEMIData } from "../context/EMIDataContext";
import { useNavigate } from "react-router-dom";

const AmortizationTable = () => {
  const { emiData } = useEMIData();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    if (!emiData) {
      navigate("/error");
      return;
    }

    const { principal, interestRate, tenure } = emiData;
    const monthlyRate = interestRate / 12 / 100;
    let balance = principal;
    const data = [];

    for (let i = 1; i <= tenure; i++) {
      const interest = balance * monthlyRate;
      const emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1);
      const principalComponent = emi - interest;
      balance -= principalComponent;

      data.push({
        month: i,
        emi: emi.toFixed(2),
        principal: principalComponent.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : "0.00",
      });
    }

    setSchedule(data);
  }, [emiData, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (!emiData) return null;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Amortization Schedule
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>EMI (₹)</TableCell>
              <TableCell>Principal (₹)</TableCell>
              <TableCell>Interest (₹)</TableCell>
              <TableCell>Balance (₹)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{row.emi}</TableCell>
                  <TableCell>{row.principal}</TableCell>
                  <TableCell>{row.interest}</TableCell>
                  <TableCell>{row.balance}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={schedule.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </TableContainer>
    </div>
  );
};

export default AmortizationTable;
