import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination
} from '@mui/material';
import { useCurrencyContext } from '../context/CurrencyContext';

const ExchangeRateTable = () => {
  const { baseCurrency } = useCurrencyContext();
  const [rates, setRates] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(`https://api.exchangerate.host/latest?base=${baseCurrency}`);
        const data = await res.json();
        setRates(data.rates);
      } catch (err) {
        console.error('Failed to fetch exchange rates', err);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  const rateEntries = Object.entries(rates);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Currency</strong></TableCell>
              <TableCell><strong>Rate</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rateEntries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(([currency, rate]) => (
                <TableRow key={currency}>
                  <TableCell>{currency}</TableCell>
                  <TableCell>{rate.toFixed(4)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rateEntries.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Paper>
  );
};

export default ExchangeRateTable;
